"""Re-encode site videos for the web (H.264 High, faststart) and make small -480 autoplay variants.

Usage: python scripts/media/encode-videos.py <originals_dir> <public_dir> [relpath ...]
  originals_dir: backup tree mirroring public/ (e.g. media/real/x.mp4, work/orva/y.mp4)
  public_dir:    repo public/ folder; outputs are written there with the same relative paths.

Full version: CRF 27 -> raised in steps to 32 until <= 1.5 MB. Audio AAC 96k only if the source
has an audible track (max_volume > -50 dB), otherwise -an.
Small version (<name>-480.mp4): 480 wide (portrait) / 854 wide (landscape), CRF 30 -> up to 36
until <= 600 KB, no audio.
"""
import json, os, re, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

FULL_MAX = 1_500_000
SMALL_MAX = 600_000


def probe(path):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'stream=codec_type,width,height',
                          '-of', 'json', path], capture_output=True, text=True).stdout
    streams = json.loads(out)['streams']
    v = next(s for s in streams if s['codec_type'] == 'video')
    has_audio = any(s['codec_type'] == 'audio' for s in streams)
    return v['width'], v['height'], has_audio


def audible(path):
    r = subprocess.run(['ffmpeg', '-hide_banner', '-i', path, '-vn', '-af', 'volumedetect', '-f', 'null', '-'],
                       capture_output=True, text=True)
    m = re.search(r'max_volume:\s*(-?[\d.]+|-inf)', r.stderr)
    return bool(m) and m.group(1) != '-inf' and float(m.group(1)) > -50


def encode(src, dst, vf, crf, audio):
    cmd = ['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', src, '-map', '0:v:0',
           '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-preset', 'slow',
           '-crf', str(crf), '-vf', vf, '-threads', '3']
    if audio:
        cmd += ['-map', '0:a:0', '-c:a', 'aac', '-b:a', '96k']
    else:
        cmd += ['-an']
    cmd += ['-movflags', '+faststart', dst]
    subprocess.run(cmd, check=True)
    return os.path.getsize(dst)


def ladder(src, dst, vf, crfs, limit, audio):
    # one temp file per CRF: on Windows, re-opening a just-written file can fail (AV/indexer locks)
    tried = []
    size = None
    for crf in crfs:
        tmp = f'{dst[:-4]}.crf{crf}.tmp.mp4'
        tried.append(tmp)
        size = encode(src, tmp, vf, crf, audio)
        if size <= limit:
            break
    os.replace(tmp, dst)
    for t in tried[:-1]:
        try:
            os.remove(t)
        except OSError:
            pass
    return crf, size


def job(orig_dir, pub_dir, rel):
    src = os.path.join(orig_dir, rel)
    dst = os.path.join(pub_dir, rel)
    small = dst[:-4] + '-480.mp4'
    w, h, has_a = probe(src)
    audio = has_a and audible(src)
    portrait = h >= w
    vf_full = ("scale=-2:'min(1280,ih)'" if portrait else "scale='min(1280,iw)':-2") + ',setsar=1'
    vf_small = ("scale='min(480,iw)':-2" if portrait else "scale='min(854,iw)':-2") + ',setsar=1'
    fcrf, fsize = ladder(src, dst, vf_full, [27, 28, 29, 30, 31, 32], FULL_MAX, audio)
    scrf, ssize = ladder(src, small, vf_small, [30, 32, 34, 36], SMALL_MAX, False)
    return dict(rel=rel, before=os.path.getsize(src), after=fsize, crf=fcrf, audio=audio,
                small=ssize, small_crf=scrf)


if __name__ == '__main__':
    orig_dir, pub_dir = sys.argv[1], sys.argv[2]
    rels = sys.argv[3:]
    if not rels:
        for root, _, files in os.walk(orig_dir):
            for f in files:
                if f.endswith('.mp4'):
                    rels.append(os.path.relpath(os.path.join(root, f), orig_dir).replace('\\', '/'))
    with ThreadPoolExecutor(4) as ex:
        results = list(ex.map(lambda r: job(orig_dir, pub_dir, r), sorted(rels)))
    print(json.dumps(results, indent=1))
