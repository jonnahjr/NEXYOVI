import urllib.request
import re
import json

req = urllib.request.Request(
    'https://sanjaya.framer.ai/?utm_source=framer',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
)
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # Find image URLs
    images = re.findall(r'https://framerusercontent\.com/images/[a-zA-Z0-9]+\.(?:jpg|png|webp)', html)
    print("Found images:")
    for img in set(images):
        print(img)
except Exception as e:
    print(e)
