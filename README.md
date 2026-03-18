# 🚗 Precision Detail — Luxury Car Detailing Website Template

A premium, multi-page **HTML/CSS/JavaScript** website template for a luxury automotive detailing business. Built with **Tailwind CSS** (CDN), **Material Symbols**, and **Google Fonts**. Fully responsive with dark/light mode, RTL support, mobile drawer navigation, and a floating "Coming Soon" CTA.

---

## 📁 Project Structure

```
apex-detail-template/
│
├── README.md
├── update_html.py              # Python utility for bulk HTML updates
│
├── assets/
│   ├── css/
│   │   ├── style.css           # Global custom styles (overrides)
│   │   ├── dark-mode.css       # Dark mode specific overrides
│   │   └── rtl.css             # Right-to-left layout support
│   │
│   └── js/
│       ├── tailwind-config.js  # Global Tailwind config (colors, fonts, screens)
│       └── main.js             # Global JavaScript (theme, drawer, dropdowns, FAB)
│
└── pages/
    ├── index.html              # Home – Version 1 (main landing page)
    ├── home2.html              # Home – Version 2 (alternate layout)
    ├── about.html              # About Us page
    ├── services.html           # Services overview
    ├── ceramic-coating.html    # Ceramic Coating service detail
    ├── pricing.html            # Pricing plans & comparison table
    ├── gallery.html            # Main gallery hub
    ├── gallery-macro.html      # Gallery – Macro Detail shots
    ├── gallery-paint.html      # Gallery – Paint Correction
    ├── gallery-interior.html   # Gallery – Interior Detailing
    ├── gallery-restoration.html# Gallery – Full Restoration
    ├── blog.html               # Blog listing page
    ├── blog-single.html        # Single blog post
    ├── blog-ceramic.html       # Blog – Ceramic Coating article
    ├── blog-404.html           # Blog-specific 404 error page
    ├── contact.html            # Contact form & info
    ├── book-services.html      # Service booking form
    ├── features.html           # Features / Why Us page
    ├── dashboard.html          # Admin/Client Dashboard (SPA-style)
    ├── user-profile.html       # User profile page
    ├── login.html              # Login page
    ├── register.html           # Registration page
    ├── coming-soon.html        # Coming Soon landing page
    └── 404.html                # Global 404 error page
```

---

## 🔗 Page Connections & Navigation

```
index.html (Home 1)
├── → home2.html           (Home dropdown – Version 2)
├── → services.html        (Nav: Services)
│   └── → ceramic-coating.html  (Service detail link)
├── → pricing.html         (Nav: Pricing)
├── → gallery.html         (Nav: Gallery)
│   ├── → gallery-macro.html
│   ├── → gallery-paint.html
│   ├── → gallery-interior.html
│   └── → gallery-restoration.html
├── → blog.html            (Nav: Blog)
│   ├── → blog-single.html
│   ├── → blog-ceramic.html
│   └── → blog-404.html
├── → contact.html         (Nav: Contact)
├── → about.html           (Nav: About)
├── → dashboard.html       (Nav: Dashboard → Admin)
│   └── (SPA sections: Overview, Appointments, Vehicles, History, Invoices)
├── → user-profile.html    (Nav: Dashboard → User)
├── → login.html           (Account icon in header)
│   └── → register.html    (Register link on login page)
├── → book-services.html   ("Book Services" CTA button)
├── → features.html        (Footer / internal links)
└── → coming-soon.html     (🟠 Floating FAB button on ALL pages)
```

---

## ⚙️ Global JavaScript (`assets/js/main.js`)

All pages load `main.js`, which powers:

| Feature | Description |
|---|---|
| **Dark / Light Mode** | Reads `localStorage('theme')`, applies `.dark` class to `<html>`. Toggle via `#theme-toggle-nav` button. |
| **LTR / RTL Direction** | Reads `localStorage('dir')`, sets `dir` attribute on `<html>`. Toggle via `#dir-toggle-nav` button. |
| **Dropdown Navigation** | Click-based dropdowns with `.dropdown-trigger` and `.nav-dropdown` classes. |
| **Mobile Drawer** | Slide-in drawer via `#mobile-menu-trigger`, `#mobile-menu-close`, `#mobile-drawer`, `#drawer-overlay`. |
| **Card Hover Effects** | Auto-applies lift + image zoom on hover to all card-like elements. |
| **Coming Soon FAB** | Injects a fixed orange floating button (bottom-right) on every page, linking to `coming-soon.html`. |

---

## 🎨 Design System (`assets/js/tailwind-config.js`)

| Token | Value |
|---|---|
| **Primary Color** | `#ec5b13` (Orange) |
| **Background Light** | `#f8f6f6` |
| **Background Dark** | `#0a0a0a` |
| **Surface Dark** | `#1a110c` |
| **Accent Dark** | `#2a1d17` |
| **Font (Display)** | `Public Sans` |
| **Font (Serif)** | `Playfair Display` |
| **Nav Breakpoint** | `nav-mobile: 915px` (desktop nav visible above this) |

---

## 🧩 Reusable Components

### Header (all pages)
```html
<header class="... fixed top-0 left-0 w-full z-50 ...">
  <!-- Logo -->
  <h2 class="... uppercase italic relative">
    Precision Detail
    <span class="absolute -right-2 top-0 text-orange-500 text-[10px]">●</span>
  </h2>

  <!-- Desktop Nav (hidden below 915px) -->
  <nav class="hidden nav-mobile:flex ...">
    <a href="index.html">Home</a>
    <a href="gallery.html">Gallery</a>
    <!-- ... -->
  </nav>

  <!-- Theme / Dir Toggles -->
  <button id="theme-toggle-nav">...</button>
  <button id="dir-toggle-nav">LTR</button>

  <!-- Mobile Hamburger -->
  <button id="mobile-menu-trigger">...</button>
</header>
```

### Mobile Drawer
```html
<div id="drawer-overlay" class="fixed inset-0 ... opacity-0 invisible ..."></div>
<div id="mobile-drawer" class="fixed top-0 right-0 h-full w-[280px] ... translate-x-full ...">
  <button id="mobile-menu-close">...</button>
  <nav>...</nav>
</div>
```

### Footer (all pages)
```html
<footer>
  <h4 class="... uppercase italic relative">
    Precision Detail
    <span class="absolute -right-2 top-0 text-orange-500 text-[10px]">●</span>
  </h4>
  <!-- Quick Links, Support, Subscribe -->
  <p>© 2025 Precision Detail. All rights reserved.</p>
</footer>
```

---

## 🚀 How to Run Locally

This is a **static HTML project** — no build tools or npm required.

**Option 1 – Open directly:**
```
Double-click: pages/index.html
```

**Option 2 – VS Code Live Server (recommended):**
1. Install the **Live Server** extension in VS Code
2. Right-click `pages/index.html` → **Open with Live Server**

**Option 3 – Python HTTP server:**
```bash
cd d:/stitch/apex-detail-template
python -m http.server 8080
# Visit: http://localhost:8080/pages/index.html
```

---

## 🌐 Deploying to GitHub Pages

1. **Push the project to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit – Precision Detail Template"
git remote add origin https://github.com/YOUR_USERNAME/precision-detail.git
git push -u origin main
```

2. **Enable GitHub Pages:**
   - Go to your repo → **Settings** → **Pages**
   - Set source to `main` branch, root `/`
   - Your site will be live at: `https://YOUR_USERNAME.github.io/precision-detail/pages/index.html`

> **Note:** Since pages are in the `/pages/` subdirectory, all asset paths use `../assets/` which works correctly when served from GitHub Pages.

---

## 📦 External Dependencies (CDN — No Install Required)

| Library | URL |
|---|---|
| Tailwind CSS | `https://cdn.tailwindcss.com?plugins=forms,container-queries` |
| Material Symbols | Google Fonts CDN |
| Public Sans Font | Google Fonts CDN |
| Playfair Display Font | Google Fonts CDN |

---

## 🗒️ Notes for ChatGPT / AI Context

- **No framework, no bundler.** Pure HTML + vanilla JS + Tailwind CDN.
- All pages are **self-contained** but share `main.js` and `tailwind-config.js`.
- Dark mode is class-based (`.dark` on `<html>`), persisted via `localStorage`.
- The `nav-mobile` custom breakpoint (915px) controls desktop nav visibility — **not** the standard Tailwind `md` or `lg`.
- The **Coming Soon FAB** is injected via JS into every page that loads `main.js`.
- Gallery sub-pages have their own inline Tailwind config (they don't use the shared `tailwind-config.js`).
- `dashboard.html` is a **SPA-style** page — content sections switch without page reload using JavaScript template injection.
