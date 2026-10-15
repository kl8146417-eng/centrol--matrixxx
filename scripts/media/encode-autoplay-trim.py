"""Rebuild <name>-480.mp4 autoplay variants as a trimmed opening clip when the full-length
480 version cannot stay under 600 KB at a clean CRF.

Usage: python scripts/media/encode-autoplay-trim.py <originals_dir> <public_dir> <relpath> [...]
Tries CRF 30 at 15s, 12s, 10s, 8s, then CRF 32 at 8s. No audio, faststart.
"""
import json, os, subprocess, sys

LIMIT = 600_000
LADDER = [(30, 15), (30, 12), (30, 10), (30, 8), (32, 8)]


def dims(path):
    out = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries',
                          'stream=width,height', '-of', 'json', path], capture_output=True, text=True).stdout
    s = json.loads(out)['streams'][0]
    return s['width'], s['height']


orig_dir, pub_dir = sys.argv[1], sys.argv[2]
for rel in sys.argv[3:]:
    src = os.path.join(orig_dir, rel)
    dst = os.path.join(pub_dir, rel)[:-4] + '-480.mp4'
    w, h = dims(src)
    vf = ("scale='min(480,iw)':-2" if h >= w else "scale='min(854,iw)':-2") + ',setsar=1'
    for crf, t in LADDER:
        tmp = f'{dst[:-4]}.c{crf}t{t}.tmp.mp4'
        subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', src, '-t', str(t),
                        '-map', '0:v:0', '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
                        '-preset', 'slow', '-crf', str(crf), '-vf', vf, '-an', '-movflags', '+faststart', tmp],
                       check=True)
        size = os.path.getsize(tmp)
        if size <= LIMIT or (crf, t) == LADDER[-1]:
            os.replace(tmp, dst)
            break
        os.remove(tmp)
    print(json.dumps(dict(rel=rel, small=size, crf=crf, seconds=t)))
