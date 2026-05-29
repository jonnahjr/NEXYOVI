import sys

file_path = r'c:\Users\jonas\Desktop\nexyovi\frontend\src\pages\Services.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if 'const [chatOpen, setChatOpen] = useState(false);' in line:
        continue
        
    if '{/* ── FLOATING CHATBOT UI ── */}' in line:
        skip = True
        
    if skip and '</div>' in line and lines.index(line) > len(lines) - 10:
        # We are at the final closing divs.
        # Actually, let's just stop skipping when we reach the end of the file minus 5 lines.
        pass

# A better way to find the end: the chatbot div is the last thing before the final closing div
# The file ends with:
#     </div>
#   );
# };
# export default Services;

# Let's rebuild new_lines:
new_lines = []
for i, line in enumerate(lines):
    if 'const [chatOpen, setChatOpen] = useState(false);' in line:
        continue
    new_lines.append(line)

chatbot_start = -1
for i, line in enumerate(new_lines):
    if '{/* ── FLOATING CHATBOT UI ── */}' in line:
        chatbot_start = i
        break

if chatbot_start != -1:
    # Delete from chatbot_start up to the last 4 lines of the file
    new_lines = new_lines[:chatbot_start] + new_lines[-5:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Successfully removed Chatbot section from Services.tsx")
