from PIL import Image
import os

def colorize(image_path, output_path, hex_color):
    try:
        img = Image.open(image_path).convert("RGBA")
        data = img.getdata()

        # Hex to RGB
        h = hex_color.lstrip('#')
        r, g, b = tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

        new_data = []
        for item in data:
            if item[3] > 0:
                new_data.append((r, g, b, item[3]))
            else:
                new_data.append(item)

        img.putdata(new_data)
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        img.save(output_path)
        print(f"Saved {output_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

colorize(r"c:\Users\jonas\Desktop\nexyovi\ecommerce\frontend\src\assets\logo.png", r"c:\Users\jonas\Desktop\nexyovi\ecommerce\frontend\public\favicon.png", "#F3A847")
colorize(r"c:\Users\jonas\Desktop\nexyovi\frontend\src\assets\logo 1.png", r"c:\Users\jonas\Desktop\nexyovi\frontend\public\favicon.png", "#F3A847")
