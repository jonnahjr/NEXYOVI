import sys

file_path = r'c:\Users\jonas\Desktop\nexyovi\frontend\src\components\HomeContent.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if '{/* 7. OUR PROCESS */}' in line:
        skip = True
        
    if skip and '    </div>' in line and lines.index(line) > len(lines) - 10:
        skip = False
        new_lines.append(line) # append the closing div
        continue
        
    if not skip:
        new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Successfully removed OUR PROCESS section from HomeContent.tsx")
