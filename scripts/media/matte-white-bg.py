"""Remove a flat white background from a rendered 3D icon and save as WebP with alpha.

Usage: python scripts/media/matte-white-bg.py <in> <out> [preview_bg_hex]
Background = near-white connected regions that touch the border, plus enclosed near-white
regions larger than 0.3% of the image (e.g. the hole in a gear). A 3px band around the
background gets GIMP-style colour-to-alpha (white) for soft, decontaminated edges.
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

src, dst = sys.argv[1], sys.argv[2]
im = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
h, w, _ = im.shape
mn = im.min(axis=2)
near_white = mn >= 238
labels, n = ndimage.label(near_white)
border = set(np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))) - {0}
sizes = ndimage.sum(near_white, labels, range(1, n + 1))
bg = np.zeros_like(near_white)
for i in range(1, n + 1):
    if i in border or sizes[i - 1] > 0.003 * h * w:
        bg |= labels == i

# colour-to-alpha in a thin band around the background
band = ndimage.binary_dilation(bg, iterations=3) & ~bg
a_c2a = np.clip((255 - mn) / 255.0, 0, 1)
a_c2a = np.clip(a_c2a * 1.6, 0, 1)  # keep object edges solid; only true AA pixels go soft
alpha = np.ones((h, w), np.float32)
alpha[bg] = 0
alpha[band] = a_c2a[band]
alpha = ndimage.gaussian_filter(alpha, 0.5) * (~bg) + 0 * bg
alpha = np.clip(alpha, 0, 1)

rgb = im.copy()
a3 = np.maximum(alpha, 1e-3)[..., None]
dec = (im - (1 - a3) * 255) / a3
soft = (alpha < 1) & (alpha > 0)
rgb[soft] = np.clip(dec[soft], 0, 255)
out = np.dstack([rgb, alpha * 255]).round().astype(np.uint8)
Image.fromarray(out, 'RGBA').save(dst, 'WEBP', quality=90, method=6, exact=False)

if len(sys.argv) > 3:
    hexc = sys.argv[3].lstrip('#')
    col = tuple(int(hexc[i:i + 2], 16) for i in (0, 2, 4))
    o = Image.open(dst).convert('RGBA')
    bgimg = Image.new('RGBA', o.size, col + (255,))
    bgimg.alpha_composite(o)
    bgimg.convert('RGB').save(dst + '.preview.png')
