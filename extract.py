import urllib.request
import re

html = urllib.request.urlopen('https://sadewa.framer.website/?utm_source=framer').read().decode('utf-8')
strings = re.findall(r'>([^<]+)<', html)
for s in strings:
    s = s.strip()
    if len(s) > 10:
        print(s)
