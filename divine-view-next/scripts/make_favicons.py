import os
import base64
import io
from PIL import Image
import numpy as np

src_path = r'C:\Users\bijes\.gemini\antigravity-ide\brain\b747a170-3fe2-4ecb-97d2-a8007e568133\.user_uploaded\media_1790317955951.png'
im = Image.open(src_path).convert('RGBA')
arr = np.array(im)
alpha = arr[:, :, 3]

# 1. Clean background haze (alpha <= 35 -> 0, alpha > 35 smoothly scaled to 0..255)
alpha_clean = np.where(alpha <= 35, 0, np.clip((alpha.astype(float) - 35) / (250 - 35) * 255, 0, 255)).astype(np.uint8)
arr_clean = arr.copy()
arr_clean[:, :, 3] = alpha_clean
im_clean = Image.fromarray(arr_clean)

# 2. Crop to tight bbox
bbox = im_clean.getbbox()
print('Crop bbox:', bbox)
cropped = im_clean.crop(bbox)
w, h = cropped.size
print(f'Cropped size: {w}x{h}')

# 3. Create square master with 6% margin so emblem occupies ~88% of square
canvas_size = int(max(w, h) / 0.88)
master = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
offset_x = (canvas_size - w) // 2
offset_y = (canvas_size - h) // 2
master.paste(cropped, (offset_x, offset_y), cropped)

# Destinations
public_dir = r'd:\kachra\Downloads\My Projects\Divine View Tour\divine-view-next\public'
app_dir = r'd:\kachra\Downloads\My Projects\Divine View Tour\divine-view-next\src\app'
logos_dir = r'd:\kachra\Downloads\My Projects\Divine View Tour\Logos'

# Master sizes
img_512 = master.resize((512, 512), Image.Resampling.LANCZOS)
img_192 = master.resize((192, 192), Image.Resampling.LANCZOS)
img_180 = master.resize((180, 180), Image.Resampling.LANCZOS)
img_48 = master.resize((48, 48), Image.Resampling.LANCZOS)
img_32 = master.resize((32, 32), Image.Resampling.LANCZOS)
img_16 = master.resize((16, 16), Image.Resampling.LANCZOS)

# Save PNGs
img_512.save(os.path.join(public_dir, 'icon-512.png'), 'PNG')
img_192.save(os.path.join(public_dir, 'icon-192.png'), 'PNG')
img_180.save(os.path.join(public_dir, 'apple-touch-icon.png'), 'PNG')
img_180.save(os.path.join(app_dir, 'apple-icon.png'), 'PNG')
img_32.save(os.path.join(public_dir, 'favicon.png'), 'PNG')
img_32.save(os.path.join(public_dir, 'favicon-32x32.png'), 'PNG')
img_16.save(os.path.join(public_dir, 'favicon-16x16.png'), 'PNG')
img_32.save(os.path.join(app_dir, 'icon.png'), 'PNG')
img_512.save(os.path.join(logos_dir, 'emblem-gold.png'), 'PNG')
img_512.save(os.path.join(public_dir, 'logo-emblem.png'), 'PNG')

# Save multi-res ICO (16, 32, 48)
img_48.save(os.path.join(public_dir, 'favicon.ico'), format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
img_48.save(os.path.join(app_dir, 'favicon.ico'), format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])

# Create SVG embedding the crisp 512x512 PNG
buf = io.BytesIO()
img_512.save(buf, format='PNG')
b64_str = base64.b64encode(buf.getvalue()).decode('ascii')
svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image width="512" height="512" href="data:image/png;base64,{b64_str}" />
</svg>'''

with open(os.path.join(public_dir, 'favicon.svg'), 'w', encoding='utf-8') as f:
    f.write(svg_content)
with open(os.path.join(app_dir, 'icon.svg'), 'w', encoding='utf-8') as f:
    f.write(svg_content)

print('All assets created successfully!')
