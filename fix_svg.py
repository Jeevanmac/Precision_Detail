import os
import re

pages_dir = r'd:\stitch\apex-detail-template\pages'

# The exact header class string used across all pages (original)
old_header = 'class="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/20 dark:border-slate-800/50 px-4 lg:px-6 py-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md fixed top-0 left-0 w-full z-50 transition-all duration-300"'

# New: transparent start, duration-500 for smoother, id="navbar"
new_header = 'id="navbar" class="flex items-center justify-between whitespace-nowrap border-b border-solid border-transparent px-4 lg:px-6 py-2 bg-transparent fixed top-0 left-0 w-full z-50 transition-all duration-500"'

html_files = [f for f in os.listdir(pages_dir) if f.endswith('.html')]

for filename in sorted(html_files):
    filepath = os.path.join(pages_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if old_header in content:
        new_content = content.replace(old_header, new_header)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed: {filename}")
    else:
        print(f"No match: {filename}")

print("Done!")
