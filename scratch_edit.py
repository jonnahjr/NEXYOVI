import sys

file_path = r'c:\Users\jonas\Desktop\nexyovi\frontend\src\pages\Company.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if '{/* ── 6. METHODOLOGY SECTION' in line:
        skip = True
    if '{/* ── 7. HUB, STORIES, CAREERS SECTION ── */}' in line:
        skip = False
    
    if not skip:
        new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Successfully removed Methodology section from Company.tsx")
