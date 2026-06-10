#!/usr/bin/env python3
"""Convert favicon.png to favicon.ico and favicon.png optimized formats"""

from PIL import Image
import os

# Paths
source_png = r'frontend\src\assets\favicon.png'
public_dir = r'frontend\public'
ico_path = os.path.join(public_dir, 'favicon.ico')
png_path = os.path.join(public_dir, 'favicon.png')

try:
    # Open the original image
    img = Image.open(source_png)
    print(f"✓ Original image size: {img.size}")
    
    # Convert RGBA to RGB if necessary for ICO compatibility
    if img.mode in ('RGBA', 'LA', 'P'):
        # Create white background
        background = Image.new('RGB', img.size, (255, 255, 255))
        if img.mode == 'P':
            img = img.convert('RGBA')
        background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
        img = background
        print("✓ Converted to RGB format")
    
    # Resize to 64x64 for optimal ICO format (best compatibility)
    ico_img = img.resize((64, 64), Image.Resampling.LANCZOS)
    ico_img.save(ico_path, 'ICO')
    print(f"✓ Created favicon.ico (64×64)")
    
    # Also create 32x32 PNG for favicon.png
    png_img = img.resize((64, 64), Image.Resampling.LANCZOS)  # 64x64 is better supported
    png_img.save(png_path, 'PNG', optimize=True)
    print(f"✓ Created favicon.png (64×64, optimized)")
    
    print("\n✅ Favicon setup complete!")
    print(f"   - favicon.ico: {ico_path}")
    print(f"   - favicon.png: {png_path}")
    
except FileNotFoundError as e:
    print(f"❌ Error: File not found - {e}")
except Exception as e:
    print(f"❌ Error: {e}")
