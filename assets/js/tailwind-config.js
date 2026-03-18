tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#ec5b13",
                "background-light": "#f8f6f6",
                "background-dark": "#0a0a0a",
                "surface-dark": "#1a110c",
                "accent-dark": "#2a1d17",
                "slate-custom": "#1e293b",
                "charcoal": "#1a1a1a",
                "border-dark": "#332218",
            },
            fontFamily: {
                "display": ["Public Sans", "sans-serif"],
                "serif": ["Playfair Display", "serif"]
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            },
            screens: {
                'nav-mobile': '915px',
            }
        },
    },
}
