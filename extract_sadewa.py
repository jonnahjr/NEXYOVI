import urllib.request
import re
import json

try:
    html = urllib.request.urlopen('https://sadewa.framer.website/').read().decode('utf-8')
    match = re.search(r'__framer_initial_props\s*=\s*(\{.*?\});\s*</script>', html)
    if match:
        data = match.group(1)
        # Just find all string literals that might be text
        strings = re.findall(r'"([^"]*?)"', data)
        # Filter for sentences
        sentences = [s for s in set(strings) if len(s) > 15 and ' ' in s and not s.startswith('http')]
        with open('sadewa_text.txt', 'w', encoding='utf-8') as f:
            f.write('\n'.join(sentences))
        print("Successfully dumped sentences to sadewa_text.txt")
    else:
        print("Could not find framer props")
except Exception as e:
    print(f"Error: {e}")
