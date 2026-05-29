from PIL import Image, ImageDraw

def process_favicon(path):
    try:
        img = Image.open(path).convert("RGBA")
        
        # 1. Crop to bounding box to make it "big" (remove empty space)
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
            
        # 2. Make it a perfect square
        width, height = img.size
        size = max(width, height)
        
        # Create a new square image with transparent background
        square_img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        
        # Paste the cropped image into the center
        offset = ((size - width) // 2, (size - height) // 2)
        square_img.paste(img, offset)
        
        # 3. Apply circular mask
        mask = Image.new('L', (size, size), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, size, size), fill=255)
        
        # Apply mask
        result = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        result.paste(square_img, (0, 0), mask=mask)
        
        # Save back
        result.save(path)
        print(f"Processed {path} successfully - made it a big circle!")
    except Exception as e:
        print(f"Error processing {path}: {e}")

process_favicon(r"c:\Users\jonas\Desktop\nexyovi\ecommerce\frontend\public\favicon.png")
