# Jarvis Design System Tree

This document provides a complete overview of the Jarvis repository structure.

## Root Directory Structure

```
jarvis/
├── .gitignore
├── .vscode/
│   └── settings.json
├── DESIGN_SYSTEM_TREE.md
├── README.md
├── ds/
│   ├── .gitignore
│   ├── architecture.txt
│   ├── deployment.txt
│   ├── package.json
│   ├── public/
│   │   ├── _redirects
│   │   └── vite.svg
│   └── src/
│       ├── counter.js
│       ├── javascript.svg
│       ├── main.js
│       └── css/
│           └── main.css (imports tokens, base, components, utilities)
├── feedback/
│   ├── alert.css
│   ├── popover.css
│   ├── progress-bar.css
│   ├── spinner.css
│   ├── toast.css
│   └── tooltip.css
├── index.html
├── js/
│   ├── components/
│   │   ├── forms.js
│   │   ├── sidebar.js
│   │   └── sidebar-toggle.js
│   ├── core/
│   │   ├── constants.js
│   │   ├── router.js
│   │   └── theme.js
│   ├── main.js
│   └── tooltip.js
├── node_modules/
├── package-lock.json
├── package.json
├── templates/
│   └── saas-master.html
├── vite-config/
│   └── base.config.js
├── vite.config.js
└── vscode-logs.log
```

## Directory Details

### `.vscode/`
IDE configuration for Visual Studio Code
- **settings.json** - VS Code workspace settings

### `ds/` - Design System
Core design system files and build configuration
- **architecture.txt** - Design system architecture documentation (2.2 KB)
- **deployment.txt** - Deployment instructions and configuration (1.8 KB)
- **package.json** - Design system build configuration
- **.gitignore** - Git ignore patterns for build artifacts

#### `ds/public/`
Static assets for the design system
- **_redirects** - Netlify/hosting redirect rules
- **vite.svg** - Vite logo asset

#### `ds/src/`
Design system source files
- **main.js** - Main entry point with sidebar loader and Vite demo (1.9 KB)
- **counter.js** - Demo counter component
- **javascript.svg** - JavaScript logo asset

#### `ds/src/css/`
Complete CSS architecture with imports for:
- **Tokens**: colors, spacing, blur, breakpoints, z-index, motion, radius, borders, layout, elevation, opacity, ratios, shadows
- **Base**: reset, global styles, typography, router transitions
- **Layout**: container, footer, grid, header, layout-shell, page-layout, page-margin, subdivisions
- **Navigation**: backdrop, breadcrumb, flyover, navbar, navmenu, link, pagination, sidebar, tab-bar, tabs
- **Actions**: button, button-group, icon-button, dropdown
- **Data Display**: table, badge, card, avatar, tag, list, list-group
- **Forms & Inputs**: form-group, form-field, form-layout, form-section, checkbox-list, input, radio-card, segmented-control, textfield, selection, select-menu, toggle-switch, validation
- **Sections**: section, feature, stats, hero, cta
- **Utilities**: alignment, aspect-ratio, border, color, cursor, display, elevation, flex, gap, and more

### `feedback/`
User feedback component styles (CSS)
- **alert.css** - Alert notifications (4.0 KB)
- **popover.css** - Popover overlays (6.2 KB)
- **progress-bar.css** - Progress indicators (4.5 KB)
- **spinner.css** - Loading spinners (3.0 KB)
- **toast.css** - Toast notifications (3.6 KB)
- **tooltip.css** - Tooltip components (5.0 KB)

### `js/` - JavaScript Modules

#### `js/components/`
Reusable component modules
- **forms.js** - Form handling with async submit and loading states (1.2 KB)
- **sidebar.js** - Sidebar active states and accordion logic (1.9 KB)
- **sidebar-toggle.js** - Mobile menu toggle with accessibility (3.5 KB)

#### `js/core/`
Core functionality modules
- **constants.js** - Selectors and breakpoint constants (477 bytes)
- **router.js** - Client-side routing logic (2.8 KB)
- **theme.js** - Theme switching functionality (810 bytes)

#### Root JS Files
- **main.js** - Main application entry point (970 bytes)
- **tooltip.js** - Tooltip component initialization (1.7 KB)

### `templates/`
HTML template files
- **saas-master.html** - SaaS application master template (2.6 KB)

### `vite-config/`
Vite bundler configuration
- **base.config.js** - Base Vite configuration (221 bytes)

## Configuration Files

- **`.gitignore`** - Git ignore patterns for root
- **`package.json`** - Node.js project configuration and dependencies
- **`package-lock.json`** - Locked versions of dependencies (43.9 KB)
- **`vite.config.js`** - Root Vite build tool configuration (335 bytes)

## Main Files

- **`index.html`** - Main HTML entry point (1.5 KB)
- **`README.md`** - Project documentation
- **`vscode-logs.log`** - VS Code logging file (23.6 KB)
- **`DESIGN_SYSTEM_TREE.md`** - This file

## Design System Architecture

The Jarvis Design System follows a modular CSS architecture with:

1. **Token-based design** - Design tokens for colors, spacing, motion, etc.
2. **Component library** - Reusable UI components organized by category
3. **Utility classes** - Single-purpose utility classes for rapid development
4. **JavaScript modules** - Vanilla JS for interactive components
5. **Vite build system** - Modern bundler for development and production

---

*Last updated: 2026-02-06 18:38:53*