import os
import re

# Configuration
SHOWROOM_DIR = '/home/jarvis/Desktop/jarvis/design-showroom'
TEMPLATE = """<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="../ds/src/css/main.css">
    <style>
        /* Emergency debug styles if main.css fails */
        body {{
            background: #000;
            color: #fff;
            margin: 0;
        }}
    </style>
</head>

<body class="u-page-layout">

    <!-- Backdrop -->
    <div class="u-backdrop" id="backdrop"></div>

    <aside class="u-sidebar">
        <!-- SIDEBAR_CONTENT_PLACEHOLDER -->
    </aside>

    <div class="u-main-area">
        <header class="u-header" style="padding: 20px var(--page-margin); border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center;">
            <span>{title}</span>
            <button class="u-menu-btn" id="menuBtn">Menu</button>
        </header>

        <main style="padding: 40px var(--page-margin);">
            <h1>{title}</h1>
            <hr style="border-color: #333; margin-bottom: 20px;">
            <p>Work in Progress. This page documents the <strong>{title}</strong> component.</p>
        </main>
    </div>

    <script>
        // Mobile menu toggle
        const menuBtn = document.getElementById('menuBtn');
        const sidebar = document.querySelector('.u-sidebar');
        const backdrop = document.getElementById('backdrop');

        function toggleMenu() {{
            sidebar.classList.toggle('is-open');
            backdrop.classList.toggle('is-active');
            menuBtn.textContent = sidebar.classList.contains('is-open') ? 'Close' : 'Menu';
        }}

        if (menuBtn && backdrop) {{
            menuBtn.addEventListener('click', toggleMenu);
            backdrop.addEventListener('click', toggleMenu);
        }}
    </script>
</body>

</html>
"""

# Navigation Structure
# Category -> List of (Label, Filename)
SITE_MAP = {
    "Tokens": [
        ("Border", "border.html"),
        ("Breakpoint", "breakpoint.html"),
        ("Colors", "colors.html"),
        ("Elevations", "elevations.html"),
        ("Motion", "motion.html"),
        ("Opacity", "opacity.html"),
        ("Radius", "radius.html"),
        ("Ratios", "ratios.html"),
        ("Shadow", "shadow.html"),
        ("Sizing", "sizing.html"),
        ("Spacing", "spacing.html"),
        ("Variables", "variables.html"),
        ("Z-Index", "z-index.html"),
    ],
    "Base": [
        ("Typography", "typography.html"),
    ],
    "Actions": [
        ("Buttons", "buttons.html"),
        ("Dropdowns", "dropdowns.html"),
        ("Icon Buttons", "icon-buttons.html"),
        ("Menus", "menus.html"),
    ],
    "Data Display": [
        ("Avatars", "avatars.html"),
        ("Badges", "badges.html"),
        ("Cards", "cards.html"),
        ("Lists", "lists.html"),
        ("Skeletons", "skeletons.html"),
        ("Tables", "tables.html"),
        ("Tags", "tags.html"),
    ],
    "Feedback": [
        ("Alerts", "alerts.html"),
        ("Popovers", "popovers.html"),
        ("Progress", "progress.html"),
        ("Spinners", "spinners.html"),
        ("Toasts", "toasts.html"),
        ("Tooltips", "tooltips.html"),
    ],
    "Forms": [
        ("Form Groups", "form-groups.html"),
        ("Form Layouts", "form-layouts.html"),
    ],
    "Inputs": [
        ("Inputs", "inputs.html"),
        ("Select Menus", "select-menus.html"),
        ("Selections", "selections.html"),
        ("Textfields", "textfields.html"),
        ("Toggles", "toggles.html"),
        ("Validation", "validation.html"),
    ],
    "Interaction": [
        ("Accordions", "accordions.html"),
        ("Modals", "modals.html"),
        ("Sliders", "sliders.html"),
    ],
    "Layout Shell": [
        ("Footers", "footers.html"),
        ("Grids", "grids.html"),
        ("Headers", "headers.html"),
        ("Layout Structure", "layout-structure.html"),
        ("Page Layouts", "page-layouts.html"),
        ("Page Margins", "page-margins.html"),
        ("Sidebars", "sidebars.html"),
    ],
    "Navigation": [
        ("Backdrops", "backdrops.html"),
        ("Breadcrumbs", "breadcrumbs.html"),
        ("Flyover", "flyover.html"),
        ("Links", "links.html"),
        ("List Navigation", "list-navigation.html"),
        ("Navbars", "navbars.html"),
        ("Navmenus", "navmenus.html"),
        ("Pagination", "pagination.html"),
        ("Tabs", "tabs.html"),
        ("Tab Bar", "tab-bar.html"),
    ],
    "Sections": [
        ("CTAs", "ctas.html"),
        ("Features", "features.html"),
        ("Heroes", "heroes.html"),
        ("Sections", "sections.html"),
        ("Stats", "stats.html"),
    ]
}

def generate_sidebar_html(current_filename):
    html = []
    html.append('<div style="padding: 20px;">')
    html.append('            <h2><a href="showroom.html" style="color: inherit; text-decoration: none;">JARVIS</a></h2>')
    html.append('            <nav>')
    
    for category, items in SITE_MAP.items():
        # Check if any item in this category is active to open the details
        is_open = any(item[1] == current_filename for item in items)
        open_attr = ' open' if is_open else ''
        
        html.append(f'                <details{open_attr}>')
        html.append(f'                    <summary>{category}</summary>')
        html.append('                    <ul>')
        
        for label, filename in items:
            active_class = ' class="active"' if filename == current_filename else ''
            html.append(f'                        <li><a href="{filename}"{active_class}>{label}</a></li>')
            
        html.append('                    </ul>')
        html.append('                </details>')
        html.append('')
        
    html.append('            </nav>')
    html.append('        </div>')
    return '\n'.join(html)

def process_files():
    # Ensure directory exists
    if not os.path.exists(SHOWROOM_DIR):
        os.makedirs(SHOWROOM_DIR)

    # Collect all target files
    all_files = set()
    for items in SITE_MAP.values():
        for _, filename in items:
            all_files.add(filename)
    all_files.add("showroom.html") # Main file

    for filename in all_files:
        filepath = os.path.join(SHOWROOM_DIR, filename)
        sidebar_content = generate_sidebar_html(filename)
        
        if not os.path.exists(filepath):
            print(f"Creating new file: {filename}")
            # Determine title from filename
            title = filename.replace('.html', '').replace('-', ' ').title()
            for items in SITE_MAP.values():
                for label, fname in items:
                    if fname == filename:
                        title = label
                        break
            
            content = TEMPLATE.format(title=title)
            # Inject sidebar
            content = content.replace('<!-- SIDEBAR_CONTENT_PLACEHOLDER -->', sidebar_content)
            
            with open(filepath, 'w') as f:
                f.write(content)
        else:
            print(f"Updating existing file: {filename}")
            with open(filepath, 'r') as f:
                content = f.read()

            # 1. Update/Inject Sidebar
            pattern_sidebar = re.compile(r'(<aside class="u-sidebar">\s*)([\s\S]*?)(\s*</aside>)')
            match_sidebar = pattern_sidebar.search(content)
            if match_sidebar:
                new_sidebar = match_sidebar.group(1) + sidebar_content + match_sidebar.group(3)
                content = content.replace(match_sidebar.group(0), new_sidebar)
            else:
                print(f"WARNING: Could not find sidebar in {filename}")

            # 2. Inject Backdrop if missing
            if '<div class="u-backdrop" id="backdrop"></div>' not in content:
                content = content.replace('<body class="u-page-layout">', 
                                         '<body class="u-page-layout">\n\n    <!-- Backdrop -->\n    <div class="u-backdrop" id="backdrop"></div>')

            # 3. Update Header (Inject button and add flex styles)
            pattern_header = re.compile(r'(<header class="u-header"[^>]*>)([\s\S]*?)(</header>)')
            match_header = pattern_header.search(content)
            if match_header:
                header_inner = match_header.group(2)
                if 'id="menuBtn"' not in header_inner:
                    title_match = re.search(r'<span>(.*?)</span>', header_inner)
                    title = title_match.group(1) if title_match else filename.replace('.html', '').title()
                    
                    new_header = f"""<header class="u-header" style="padding: 20px var(--page-margin); border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center;">
            <span>{title}</span>
            <button class="u-menu-btn" id="menuBtn">Menu</button>
        </header>"""
                    content = content.replace(match_header.group(0), new_header)

            # 4. Inject Script if missing
            if 'const menuBtn = document.getElementById(\'menuBtn\');' not in content:
                script_inject = """
    <script>
        // Mobile menu toggle
        const menuBtn = document.getElementById('menuBtn');
        const sidebar = document.querySelector('.u-sidebar');
        const backdrop = document.getElementById('backdrop');

        function toggleMenu() {
            sidebar.classList.toggle('is-open');
            backdrop.classList.toggle('is-active');
            menuBtn.textContent = sidebar.classList.contains('is-open') ? 'Close' : 'Menu';
        }

        if (menuBtn && backdrop) {
            menuBtn.addEventListener('click', toggleMenu);
            backdrop.addEventListener('click', toggleMenu);
        }
    </script>
</body>"""
                content = content.replace('</body>', script_inject)
            
            with open(filepath, 'w') as f:
                f.write(content)

if __name__ == "__main__":
    process_files()
