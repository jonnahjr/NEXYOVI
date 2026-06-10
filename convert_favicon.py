#!/usr/bin/env python3
"""Convert favicon.png to both favicon.ico and optimized favicon.png"""

from PIL import Image
import os

# Paths
source_png = r"C:\Users\jonas\Desktop\nexyovi\frontend\src\assets\favicon.png"
output_dir = r"C:\Users\jonas\Desktop\nexyovi\frontend\public"
output_ico = os.path.join(output_dir, "favicon.ico")
output_png = os.path.join(output_dir, "favicon.png")

# Create output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Open the original image
img = Image.open(source_png)
print(f"Original image size: {img.size}")
print(f"Original image mode: {img.mode}")

# Resize to 64x64 (good compromise for ico and png)
target_size = (64, 64)
img_resized = img.resize(target_size, Image.Resampling.LANCZOS)
print(f"\nResized to: {img_resized.size}")

# Convert RGBA to RGB if necessary for ICO (ICO format may have limitations)
if img_resized.mode == 'RGBA':
    # Keep RGBA for better quality, modern browsers support it
    pass
elif img_resized.mode != 'RGB':
    img_resized = img_resized.convert('RGB')

# Save as favicon.ico
img_resized.save(output_ico, format='ICO', sizes=[target_size])
print(f"✓ Saved favicon.ico to: {output_ico}")

# Save as optimized favicon.png (64x64)
img_resized.save(output_png, format='PNG', optimize=True)
print(f"✓ Saved favicon.png (64×64) to: {output_png}")

# Also create 32x32 variant if needed
img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
output_png_32 = os.path.join(output_dir, "favicon-32x32.png")
img_32.save(output_png_32, format='PNG', optimize=True)
print(f"✓ Saved favicon-32x32.png to: {output_png_32}")

print("\n✓ Favicon conversion complete!")
