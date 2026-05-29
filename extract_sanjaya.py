import urllib.request
import re

try:
    html = urllib.request.urlopen('https://sanjaya.framer.ai/?utm_source=framer').read().decode('utf-8')
    strings = re.findall(r'>([^<]+)<', html)
    found = False
    for s in strings:
        s = s.strip()
        if 'Clarissa' in s or 'director' in s.lower() or 'talk with' in s.lower():
            print("FOUND:", s)
            found = True
    if not found:
        print("Could not find Clarissa directly in HTML tags. Searching full raw text...")
        import textwrap
        print(textwrap.shorten(html, 1000))
except Exception as e:
    print(f"Error: {e}")
