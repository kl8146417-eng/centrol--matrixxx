"""Convert images to WebP, capping width.

Usage: python scripts/media/to-webp.py <max_width> <quality> <src> <dst> [<src> <dst> ...]
Pass max_width 0 to keep size. Alpha is kept when present.
"""
import sys
from PIL import Image

maxw, q = int(sys.argv[1]), int(sys.argv[2])
args = sys.argv[3:]
for src, dst in zip(args[::2], args[1::2]):
    im = Image.open(src)
    im = im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') and 'transparency' in im.info or im.mode in ('RGBA', 'LA') else 'RGB')
    if maxw and im.width > maxw:
        im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    im.save(dst, 'WEBP', quality=q, method=6)
    print(f'{dst}\t{im.width}x{im.height}')
