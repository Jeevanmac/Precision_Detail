import os
import re
import shutil

pages_dir = r"d:\stitch\apex-detail-template\pages"
stitch_dir = r"d:\stitch"

# Step 1: Copy over requested gallery / service files if they don't exist
extra_files = {
    "macro_details_precision_gallery": "gallery-macro.html",
    "paint_correction_precision_gallery": "gallery-paint.html",
    "interior_precision_gallery": "gallery-interior.html",
    "restorations_precision_gallery": "gallery-restoration.html",
    "service_packages_detailing_2": "ceramic-coating.html", # Since no explicit ceramic folder exists, this is the ceramic-focused one
}

for src_folder, dest_file in extra_files.items():
    src_path = os.path.join(stitch_dir, src_folder, "code.html")
    dest_path = os.path.join(pages_dir, dest_file)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)

HEADER_HTML = """<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/20 dark:border-slate-800/50 px-4 lg:px-6 py-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md fixed top-0 left-0 w-full z-50 transition-all duration-300">
<div class="flex items-center gap-3">
    <div class="flex items-center gap-2">
        <div class="text-primary size-6">
            <a href="index.html">
                <svg fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
                </svg>
            </a>
        </div>
        <a href="index.html"><h2 class="text-slate-900 dark:text-slate-100 text-sm font-black leading-tight tracking-tighter hover:text-primary transition-colors uppercase italic">Precision Detail</h2></a>
    </div>
    <div class="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
    <a href="login.html" class="flex items-center justify-center size-8 rounded-full bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors border border-slate-200 dark:border-slate-700 active:scale-95" title="Login / Account">
        <span class="material-symbols-outlined text-[20px]">account_circle</span>
    </a>
</div>
<div class="flex flex-1 justify-end gap-3 lg:gap-4 items-center">
<nav class="hidden nav-mobile:flex items-center gap-3 lg:gap-4">
<div class="relative">
<a class="nav-home dropdown-trigger text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-0.5 cursor-pointer" href="index.html">Home <span class="material-symbols-outlined text-[12px]">expand_more</span></a>
<div class="nav-dropdown absolute top-full left-0 mt-1 w-40 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 invisible transition-all flex flex-col overflow-hidden z-[100]">
<a href="index.html" class="px-3 py-2 text-[10px] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary">Home 1</a>
<a href="home2.html" class="px-3 py-2 text-[10px] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary">Home 2</a>
</div>
</div>
<a class="nav-services text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-[10px] font-bold uppercase tracking-wider transition-colors" href="services.html">Services</a>
<a class="nav-pricing text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-[10px] font-bold uppercase tracking-wider transition-colors" href="pricing.html">Pricing</a>
<a class="nav-gallery text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-[10px] font-bold uppercase tracking-wider transition-colors" href="gallery.html">Gallery</a>
<a class="nav-blog text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-[10px] font-bold uppercase tracking-wider transition-colors" href="blog.html">Blog</a>
<a class="nav-contact text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-[10px] font-bold uppercase tracking-wider transition-colors" href="contact.html">Contact</a>
<a class="nav-about text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-[10px] font-bold uppercase tracking-wider transition-colors" href="about.html">About</a>
<div class="relative">
<a class="nav-dashboard dropdown-trigger text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-0.5 cursor-pointer" href="dashboard.html">Dashboard <span class="material-symbols-outlined text-[12px]">expand_more</span></a>
<div class="nav-dropdown absolute top-full left-0 mt-1 w-40 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 invisible transition-all flex flex-col overflow-hidden z-[100]">
<a href="dashboard.html" class="px-3 py-2 text-[10px] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary">Admin</a>
<a href="user-profile.html" class="px-3 py-2 text-[10px] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary">User</a>
</div>
</div>
</nav>
<div class="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4 ml-2">
<button id="dir-toggle-nav" class="text-slate-600 dark:text-slate-400 hover:text-primary text-[10px] font-bold tracking-widest px-2 py-1 bg-white/50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700 transition-colors">LTR</button>
<button id="theme-toggle-nav" class="text-slate-600 dark:text-slate-400 hover:text-primary p-1 bg-white/50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700 transition-colors">
<span class="material-symbols-outlined text-[16px] dark:hidden">dark_mode</span>
<span class="material-symbols-outlined text-[16px] hidden dark:block">light_mode</span>
</button>
<a href="book-services.html" class="hidden nav-mobile:flex items-center justify-center rounded-lg h-7 px-3 bg-primary text-white text-[10px] font-black uppercase tracking-wider transition-all hover:brightness-110 active:scale-95 shadow-md shadow-primary/20">
    Book Services
</a>
<!-- Mobile Menu Trigger -->
<button id="mobile-menu-trigger" class="nav-mobile:hidden flex items-center justify-center rounded-lg h-8 w-8 bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition-colors active:scale-90">
    <span class="material-symbols-outlined text-[20px]">menu</span>
</button>
</div>
</div>
</header>

<!-- Mobile Drawer Overlay -->
<div id="drawer-overlay" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] opacity-0 invisible transition-all duration-300"></div>

<!-- Mobile Drawer -->
<div id="mobile-drawer" class="fixed top-0 right-0 h-full w-[280px] bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl text-slate-900 dark:text-white z-[101] translate-x-full transition-transform duration-300 ease-in-out border-l border-slate-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between p-6">
        <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[#22d3ee] text-2xl">diamond</span>
            <span class="font-black tracking-tight text-lg uppercase">Precision<span class="text-[#22d3ee]">Detail</span></span>
        </div>
        <button id="mobile-menu-close" class="text-slate-500 dark:text-white/60 hover:text-primary dark:hover:text-white transition-colors">
            <span class="material-symbols-outlined text-2xl">close</span>
        </button>
    </div>
    
    <!-- Navigation -->
    <div class="flex-1 overflow-y-auto px-6 py-4">
        <nav class="flex flex-col gap-6">
            <!-- Home Links -->
            <div>
                <div class="flex items-center justify-between text-slate-900 dark:text-white font-bold text-xl mb-4 group cursor-pointer border-b border-slate-200 dark:border-white/10 pb-2">
                    Home
                    <span class="material-symbols-outlined text-sm opacity-50">chevron_right</span>
                </div>
                <div class="flex flex-col gap-3 pl-4 border-l border-slate-200 dark:border-white/10 ml-1">
                    <a href="index.html" class="text-slate-900 dark:text-white/70 hover:text-primary text-sm transition-colors flex items-center justify-between">
                        Version 1
                        <span class="text-[10px] bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded uppercase tracking-widest opacity-50">Default</span>
                    </a>
                    <a href="home2.html" class="text-slate-900 dark:text-white/70 hover:text-primary text-sm transition-colors">Version 2</a>
                </div>
            </div>

            <a href="services.html" class="flex items-center justify-between text-slate-900 dark:text-white hover:text-[#22d3ee] font-bold text-xl transition-colors">
                Services
                <span class="material-symbols-outlined text-sm opacity-30">chevron_right</span>
            </a>
            <a href="pricing.html" class="flex items-center justify-between text-slate-900 dark:text-white hover:text-[#22d3ee] font-bold text-xl transition-colors">
                Pricing
                <span class="material-symbols-outlined text-sm opacity-30">chevron_right</span>
            </a>
            <a href="gallery.html" class="flex items-center justify-between text-slate-900 dark:text-white hover:text-[#22d3ee] font-bold text-xl transition-colors">
                Gallery
                <span class="material-symbols-outlined text-sm opacity-30">chevron_right</span>
            </a>
            <a href="blog.html" class="flex items-center justify-between text-slate-900 dark:text-white hover:text-[#22d3ee] font-bold text-xl transition-colors">
                Blog
                <span class="material-symbols-outlined text-sm opacity-30">chevron_right</span>
            </a>
            <a href="contact.html" class="flex items-center justify-between text-slate-900 dark:text-white hover:text-[#22d3ee] font-bold text-xl transition-colors">
                Contact
                <span class="material-symbols-outlined text-sm opacity-30">chevron_right</span>
            </a>

            <!-- Dashboard/Profile -->
            <div class="mt-4 pt-6 border-t border-slate-200 dark:border-white/5 space-y-4">
                 <a href="dashboard.html" class="flex items-center justify-between text-slate-900 dark:text-white/90 hover:text-[#22d3ee] font-bold text-lg transition-colors">
                    Dashboard
                    <span class="material-symbols-outlined text-sm opacity-30">chevron_right</span>
                </a>
                <a href="user-profile.html" class="flex items-center justify-between text-slate-900 dark:text-white/90 hover:text-[#22d3ee] font-bold text-lg transition-colors">
                    User Dashboard
                    <span class="material-symbols-outlined text-sm opacity-30">chevron_right</span>
                </a>
            </div>
        </nav>
    </div>
    
    <!-- Footer Section -->
    <div class="p-6 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 space-y-6">
        <!-- Book Service Action -->
        <a href="book-services.html" class="flex items-center justify-center gap-2 w-full h-14 bg-[#ec5b13] text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl shadow-[#ec5b13]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <span class="material-symbols-outlined text-lg">auto_awesome</span>
            Book Service
        </a>

        <!-- Social Icons -->
        <div class="flex items-center justify-center gap-6 text-slate-400 dark:text-white/40 pt-2">
            <span class="material-symbols-outlined text-xl cursor-pointer hover:text-primary dark:hover:text-white transition-colors">public</span>
            <span class="material-symbols-outlined text-xl cursor-pointer hover:text-primary dark:hover:text-white transition-colors">share</span>
            <span class="material-symbols-outlined text-xl cursor-pointer hover:text-primary dark:hover:text-white transition-colors">alternate_email</span>
            <span class="material-symbols-outlined text-xl cursor-pointer hover:text-primary dark:hover:text-white transition-colors">chat_bubble</span>
        </div>

        <!-- Copyright -->
        <p class="text-[9px] text-center text-slate-500 dark:text-white/30 uppercase tracking-[0.2em]">
            © 2026 Precision Detail Automotive Group
        </p>
    </div>
</div><!-- End Mobile Drawer -->"""

FOOTER_HTML = """<footer class="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
<div class="max-w-7xl mx-auto px-6 lg:px-20 py-12">
<div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
<div class="col-span-1 md:col-span-1 flex flex-col gap-6">
<div class="flex items-center gap-2">
<div class="text-primary size-6">
<svg fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
</svg>
</div>
<span class="text-slate-900 dark:text-white font-bold text-lg">Precision Detail</span>
</div>
<p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Defining automotive excellence through meticulous craftsmanship and premium protection services.</p>
<div class="flex gap-4">
<a class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-[18px]">public</span>
</a>
<a class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-[18px]">share</span>
</a>
</div>
</div>
<div>
<h4 class="text-slate-900 dark:text-white font-bold mb-6">Quick Links</h4>
<ul class="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
<li><a class="hover:text-primary transition-colors" href="services.html">Services</a></li>
<li><a class="hover:text-primary transition-colors" href="gallery.html">Gallery</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Locations</a></li>
<li><a class="hover:text-primary transition-colors" href="about.html">About</a></li>
</ul>
</div>
<div>
<h4 class="text-slate-900 dark:text-white font-bold mb-6">Support</h4>
<ul class="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
<li><a class="hover:text-primary transition-colors" href="#">Contact Us</a></li>
<li><a class="hover:text-primary transition-colors" href="#">FAQs</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
</ul>
</div>
<div>
<h4 class="text-slate-900 dark:text-white font-bold mb-6">Subscribe</h4>
<p class="text-slate-500 dark:text-slate-400 text-sm mb-4">Get the latest tips and offers.</p>
<div class="flex gap-2">
<input class="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm px-4 h-10 w-full focus:ring-2 focus:ring-primary/50" placeholder="Email" type="email"/>
<button class="bg-primary text-white px-4 rounded-lg h-10 hover:opacity-90">
<span class="material-symbols-outlined text-[20px]">send</span>
</button>
</div>
</div>
</div>
<div class="pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    © 2024 Precision Detail. All rights reserved.
                </div>
</div>
</footer>"""

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    filename = os.path.basename(filepath)
    needs_custom_layout = filename in ["dashboard.html", "user-profile.html"]
    
    # --- Helper Functions ---
    def safe_replace(pattern, replacement, text):
        if replacement in text:
            return text
        return re.sub(r'\b' + re.escape(pattern) + r'\b', replacement, text)

    def dedupe_classes(text):
        def _dedupe(match):
            attr = match.group(1)
            classes = match.group(2).split()
            seen = set()
            unique_classes = []
            for c in classes:
                if c not in seen:
                    unique_classes.append(c)
                    seen.add(c)
            return f'{attr}="{" ".join(unique_classes)}"'
        return re.sub(r'(\b[a-z-]+)="([^"]*)"', _dedupe, text)

    # --- Header Replacement ---
    if not needs_custom_layout:
        # 1. Broad cleanup of ANY drawer-related markers or IDs
        content = re.sub(r'<header.*?</header>', '', content, flags=re.DOTALL)
        content = re.sub(r'<!-- Mobile Drawer Overlay -->.*?<!-- Mobile Drawer Overlay -->', '', content, flags=re.DOTALL)
        content = re.sub(r'<!-- Mobile Drawer -->.*?<!-- Mobile Drawer -->', '', content, flags=re.DOTALL)
        content = re.sub(r'<div id="drawer-overlay".*?</div>', '', content, flags=re.DOTALL)
        
        # Aggressive multi-pass drawer removal to handle nested/partial drawers
        for _ in range(3):
            content = re.sub(r'<div id="mobile-drawer".*?</div>(?=\s*(?:<main|<footer|<!--))', '', content, flags=re.DOTALL)
            content = re.sub(r'<div id="mobile-drawer".*?<!-- Footer Section -->.*?</div>\s*</div>', '', content, flags=re.DOTALL)
            content = re.sub(r'<div id="mobile-drawer".*?</div>\s*</div>', '', content, flags=re.DOTALL)
        
        # Final purge for loose/partial drawer fragments that might have lost their ID or opening tag
        # These are very specific to the messy artifacts found in contact.html and book-services.html
        content = re.sub(r'<!--\s*Navigation\s*-->\s*<div class="flex-1 overflow-y-auto px-6 py-4">.*?<!--\s*Footer Section\s*-->.*?</div>\s*</div>', '', content, flags=re.DOTALL)
        content = re.sub(r'<div class="flex-1 overflow-y-auto px-6 py-4">.*?<!--\s*Footer Section\s*-->.*?</div>\s*</div>', '', content, flags=re.DOTALL)
        content = re.sub(r'<div class="p-6 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 space-y-6">.*?</div>\s*</div>', '', content, flags=re.DOTALL)
        content = re.sub(r'<div class="p-6 bg-white/5 border-t border-slate-900/40 dark:border-white/10 space-y-6">.*?</div>\s*</div>', '', content, flags=re.DOTALL)
        
        # New deep-clean patterns for loose white links and legacy blocks
        content = re.sub(r'<!--\s*Dashboard/Profile\s*-->.*?</div>\s*</nav>\s*</div>\s*</div>', '', content, flags=re.DOTALL)
        content = re.sub(r'<a href="services.html" class="flex items-center justify-between text-white hover:text-\[#22d3ee\] font-bold text-xl transition-colors">.*?<!--\s*Footer Section\s*-->.*?</div>\s*</div>', '', content, flags=re.DOTALL)
        content = re.sub(r'<a href="services.html" class="flex items-center justify-between text-white hover:text-\[#22d3ee\] font-bold text-xl transition-colors">.*?</div>\s*</nav>\s*</div>', '', content, flags=re.DOTALL)
        content = re.sub(r'<!--\s*Sticky Header\s*-->', '', content)
        
        content = re.sub(r'<!-- Mobile Menu Trigger -->.*?<button id="mobile-menu-trigger".*?</button>', '', content, flags=re.DOTALL)
        
        content = content.replace('<!-- Mobile Drawer Overlay -->', '')
        # 2. Insert new header (this adds the <!-- End Mobile Drawer --> marker)
        content = re.sub(r'(<body.*?>)', r'\1\n' + HEADER_HTML, content)

        # 3. Scrub Zone: Aggressively remove any residual fragments between the new drawer and the page content
        # This targets the common "extra section" wrapper and any loose nav bits
        content = re.sub(r'<!-- End Mobile Drawer -->.*?(?=\s*(?:<main|<section|<div class="static-content"|<!-- Hero|<!-- Our Craft|<!-- Lead Gen|<!-- Results|<!-- CTA|<!-- Featured|<!-- Services|<!-- Features|<!-- About|<!-- Contact|<!-- Pricing|<!-- Gallery|<!-- Gallery Grid|<!-- Pricing Section|<!-- Content Area))', '<!-- End Mobile Drawer -->', content, flags=re.DOTALL)
        
        # Targeted cleanup for the specific wrapper div fragment found in index.html
        content = re.sub(r'<div class="relative flex min-h-screen w-full flex-col overflow-x-hidden pt-12">.*?</div>(?=\s*(?:<main|<!-- Hero))', '', content, flags=re.DOTALL)
        
        # Clean up excessive empty lines after the drawer
        content = re.sub(r'(<!-- End Mobile Drawer -->)\s*\n\s*', r'\1\n', content)

    # --- Footer Replacement ---
    if not needs_custom_layout:
        content = re.sub(r'<footer.*?</footer>', FOOTER_HTML, content, flags=re.DOTALL)

    # --- Active States (Header) ---
    if not needs_custom_layout:
        active_class = "text-primary font-black scale-105"
        
        # List of nav items and their specific identifiers
        nav_items = [
            ('home', 'Home'),
            ('services', 'Services'),
            ('pricing', 'Pricing'),
            ('gallery', 'Gallery'),
            ('blog', 'Blog'),
            ('contact', 'Contact'),
            ('about', 'About'),
            ('dashboard', 'Dashboard')
        ]
        
        for nav_slug, nav_text in nav_items:
            is_active = (nav_slug in filename) or (nav_slug == 'home' and 'index' in filename)
            if is_active:
                # Target the specific <a> for this nav item
                # We look for nav-<slug> class
                pattern = r'class="([^"]*\bnav-' + nav_slug + r'\b[^"]*)"'
                def add_active(match):
                    classes = match.group(1)
                    # Remove standard colors, add active class
                    clean_classes = re.sub(r'\btext-slate-6[0-9]0\b|\bdark:text-slate-[3-4][0-9]0\b', '', classes)
                    return f'class="{clean_classes} {active_class}"'
                
                content = re.sub(pattern, add_active, content)

    # --- Global styling improvements for light mode ---
    content = safe_replace('text-slate-400', 'text-slate-600 dark:text-slate-400', content)
    content = safe_replace('text-slate-300', 'text-slate-600 dark:text-slate-400', content)
    content = safe_replace('border-white/10', 'border-slate-900/40 dark:border-white/10', content)
    content = safe_replace('bg-white/5', 'bg-slate-50 dark:bg-white/5', content)
    content = safe_replace('text-white/70', 'text-slate-600 dark:text-white/70', content)
    content = safe_replace('text-white/40', 'text-slate-600 dark:text-white/40', content)
    content = safe_replace('text-white/60', 'text-slate-600 dark:text-white/60', content)

    # --- Page Specific Fixes ---
    if filename == "contact.html":
        # Form specific color fixes
        content = safe_replace('placeholder:text-white', 'placeholder:text-slate-600 dark:placeholder:text-slate-400', content)
        content = content.replace('<select class="', '<select class="text-slate-900 dark:text-white ')
        content = content.replace('<option class="', '<option class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white ')
        content = content.replace('text-white focus:outline-none', 'text-slate-900 dark:text-white focus:outline-none')
        # Fix the text color for all form inputs
        content = re.sub(r'(<input|<textarea|<select)([^>]*class="[^"]*)', r'\1\2 text-slate-900 dark:text-white', content)

    elif filename in ["login.html", "register.html"]:
        content = content.replace('glass-panel rounded-3xl overflow-hidden shadow-2xl relative z-10', 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative z-10')
        content = content.replace('p-8 md:p-12 flex flex-col justify-center', 'p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-slate-900')
        content = content.replace('text-slate-100', 'text-slate-900 dark:text-slate-100')

    # --- De-duplicate classes to clean up ---
    content = dedupe_classes(content)

    # --- Miscellaneous Cleanup ---
    if 'pt-12' not in content and 'flex min-h-screen' in content:
        content = content.replace('flex min-h-screen w-full flex-col overflow-x-hidden', 'flex min-h-screen w-full flex-col overflow-x-hidden pt-12')
    
    # Final cleanup of any duplicated pt-12
    content = content.replace('pt-12 pt-12', 'pt-12')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for filename in os.listdir(pages_dir):
    if filename.endswith(".html"):
        filepath = os.path.join(pages_dir, filename)
        process_file(filepath)
        print(f"Processed {filename}")
