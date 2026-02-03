# Design System Audit Report

**Scope:** All files under `ds/src/css/` and all HTML files in the repository.  
**Date:** 2025-02-02

---

## .cursorrules

No `.cursorrules` file was found in the repository. This audit uses standard design system conventions:

- **Magic numbers:** Avoid hardcoded pixel values; use design tokens (e.g. `--space-*`, `--radius-*`, `--size-*`, `--breakpoint-*`) where they exist.
- **Colors:** Use semantic or base color tokens (`var(--color-*)`); no raw hex outside token definition files.
- **Z-index:** Use z-index tokens (`var(--z-*)`) from `tokens/z-index.css`; no raw integer `z-index` in components or utilities.

Token definition files (`ds/src/css/tokens/*.css`) are treated as the source of truth; values there are not listed as violations unless they could reference another token (e.g. media queries using `var(--breakpoint-m)`).

---

## 1. Hex color not using a token

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/base/typography.css | 44 | `color: var(--color-text, #ffffff);` | Use `var(--color-text-body)` or `var(--color-white)`; remove hex fallback or use token. |
| ds/src/css/base/typography.css | 45 | `background-color: var(--color-bg, #000000);` | Use `var(--color-bg-surface)` or `var(--color-brand-black)`; remove hex fallback or use token. |
| ds/src/css/base/typography.css | 58 | `color: var(--color-text, #ffffff);` | Use `var(--color-text-header)` or `var(--color-white)`; remove hex fallback or use token. |
| ds/src/css/components/data-display/list.css | 101 | `color: var(--color-brand-primary, #000);` | Use `var(--color-brand-black)` (and align token name: system uses `--color-brand-black`, not `--color-brand-primary`). |

---

## 2. Integer z-index (not using token)

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/layout/subdivisions.css | 81 | `z-index: 10;` | `var(--z-above)` |
| ds/src/css/components/data-display/card.css | 70 | `z-index: 1;` | `var(--z-base)` or add `--z-card-media` if semantic layer is needed. |
| ds/src/css/components/data-display/card.css | 77 | `z-index: 2;` | Add token (e.g. `--z-card-overlay`) or use `var(--z-above)` with documentation. |
| ds/src/css/components/data-display/card.css | 84 | `z-index: 3;` | Add token (e.g. `--z-card-content`) for card stacking. |
| ds/src/css/components/data-display/card.css | 295 | `z-index: 10;` | `var(--z-above)` |

---

## 3. Hardcoded pixel values

Values in `tokens/spacing.css`, `tokens/radius.css`, `tokens/breakpoint.css`, `tokens/layout-sizes.css`, and `tokens/shadow.css` are token definitions and are not listed. All other hardcoded `px` (and one `rem` where a token exists) are listed below.

### ds/src/css/base/typography.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/base/typography.css | 84 | `@media (min-width: 768px)` | `@media (min-width: var(--breakpoint-m))` |

### ds/src/css/tokens/border-width.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/tokens/border-width.css | 10 | `border-width: 1px;` | Define `--border-thin: 1px` in tokens and use `var(--border-thin)`. |
| ds/src/css/tokens/border-width.css | 14 | `border-width: 2px;` | Define `--border-medium: 2px` and use `var(--border-medium)`. |
| ds/src/css/tokens/border-width.css | 18 | `border-width: 4px;` | Define `--border-thick: 4px` and use `var(--border-thick)`. |
| ds/src/css/tokens/border-width.css | 23 | `border: 1px solid var(--color-border);` | Use `var(--border-thin)` for width once token exists. |

### ds/src/css/themes/dark.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/themes/dark.css | 38 | `--shadow-m: 0 4px 12px rgba(...)` | Use `var(--radius-sm)` for 4px if shadow token is refactored; or keep as theme token. |
| ds/src/css/themes/dark.css | 39 | `--shadow-l: 0 8px 24px rgba(...)` | Consider spacing/size tokens if theme shadows are standardized. |
| ds/src/css/themes/dark.css | 40 | `--shadow-xl: 0 12px 32px rgba(...)` | Same as above. |
| ds/src/css/themes/dark.css | 43 | `--shadow-offset: 20px 20px 0 ...` | `var(--space-l)` is 24px; add `--space-offset: 20px` or use `var(--space-l)` if acceptable. |
| ds/src/css/themes/dark.css | 58 | `--tab-bar-height: 64px;` | Consider `var(--size-header-height)` (4rem) or add `--size-tab-bar: 64px` in layout-sizes. |
| ds/src/css/themes/dark.css | 61 | `--feature-icon-size: 48px;` | Add `--size-feature-icon: 48px` in layout-sizes or use existing size token. |

### ds/src/css/themes/light.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/themes/light.css | 37 | `--shadow-m: 0 4px 12px rgba(...)` | Same as dark theme; consider shared shadow tokens. |
| ds/src/css/themes/light.css | 38 | `--shadow-l: 0 8px 24px rgba(...)` | Same as above. |
| ds/src/css/themes/light.css | 39 | `--shadow-xl: 0 12px 32px rgba(...)` | Same as above. |
| ds/src/css/themes/light.css | 42 | `--shadow-offset: 20px 20px 0 ...` | `var(--space-l)` or new token. |
| ds/src/css/themes/light.css | 56 | `--tab-bar-height: 64px;` | `var(--size-header-height)` or `--size-tab-bar` in layout-sizes. |
| ds/src/css/themes/light.css | 59 | `--feature-icon-size: 48px;` | Add `--size-feature-icon` in layout-sizes or use existing size token. |

### ds/src/css/components/layout/sidebar.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/layout/sidebar.css | 10 | `width: var(--sidebar-width, 280px);` | Use `var(--size-sidebar)` (250px) or add `--size-sidebar-collapsed: 280px` in layout-sizes. |
| ds/src/css/components/layout/sidebar.css | 67 | `width: 16px;` | `var(--space-m)` |
| ds/src/css/components/layout/sidebar.css | 68 | `height: 16px;` | `var(--space-m)` |
| ds/src/css/components/layout/sidebar.css | 97 | `box-shadow: 0 0 0 3px var(--color-accent);` | Use `var(--radius-xs)` (2px) or add focus ring token e.g. `--focus-ring-width: 3px`. |
| ds/src/css/components/layout/sidebar.css | 135 | `box-shadow: 0 0 0 3px var(--color-accent);` | Same as above. |
| ds/src/css/components/layout/sidebar.css | 222 | `backdrop-filter: blur(4px);` | Add `--blur-s: 4px` (or use in utility) and reference token. |
| ds/src/css/components/layout/sidebar.css | 238 | `--sidebar-width: 72px;` | Add to layout-sizes or keep as component token with token value. |
| ds/src/css/components/layout/sidebar.css | 254 | `--sidebar-width: 88px;` | Same. |
| ds/src/css/components/layout/sidebar.css | 267 | `--sidebar-width: 56px;` | Same. |
| ds/src/css/components/layout/sidebar.css | 307 | `backdrop-filter: blur(6px);` | Add blur token (e.g. `--blur-m: 6px`) and use var(). |

### ds/src/css/components/layout/header.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/layout/header.css | 10 | `height: var(--header-height, 64px);` | Use `var(--size-header-height)` (4rem) or define 64px in layout-sizes. |
| ds/src/css/components/layout/header.css | 47 | `box-shadow: 0 0 0 3px var(--color-accent);` | Focus ring token. |
| ds/src/css/components/layout/header.css | 75 | `height: var(--header-height-desktop, 72px);` | Add `--size-header-desktop` in layout-sizes. |
| ds/src/css/components/layout/header.css | 89 | `height: var(--header-height-mobile, 60px);` | Add `--size-header-mobile` in layout-sizes. |
| ds/src/css/components/layout/header.css | 120 | `box-shadow: 0 0 0 3px var(--color-accent);` | Focus ring token. |
| ds/src/css/components/layout/header.css | 162 | `--header-height: 48px;` | Use layout-sizes token. |
| ds/src/css/components/layout/header.css | 163 | `--header-height-desktop: 56px;` | Use layout-sizes token. |
| ds/src/css/components/layout/header.css | 199 | `min-width: 200px;` | Consider `var(--size-max-xs)` (20rem) or add min-width token. |
| ds/src/css/components/layout/header.css | 214 | `width: 32px;` | `var(--space-xl)` (28px) or add icon size token. |
| ds/src/css/components/layout/header.css | 215 | `height: 32px;` | Same. |
| ds/src/css/components/layout/header.css | 221 | `box-shadow: 0 0 0 3px var(--color-accent);` | Focus ring token. |
| ds/src/css/components/layout/header.css | 249 | `top: -4px;` | `calc(-1 * var(--space-xxs))` |
| ds/src/css/components/layout/header.css | 250 | `right: -6px;` | `calc(-1 * var(--radius-md))` |
| ds/src/css/components/layout/header.css | 254 | `padding: 2px 6px;` | `var(--radius-xs)` and `var(--radius-md)` |

### ds/src/css/components/layout/subdivisions.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/layout/subdivisions.css | 12 | `min-height: var(--subdivision-min-height, 400px);` | Add `--size-subdivision-min` in layout-sizes. |
| ds/src/css/components/layout/subdivisions.css | 96 | `min-height: 300px;` | Add token or use `var(--size-*)` from layout-sizes. |
| ds/src/css/components/layout/subdivisions.css | 106 | `minmax(var(--tile-min, 280px), 1fr)` | Use `var(--size-sidebar)` or add `--size-tile-min` in layout-sizes. |
| ds/src/css/components/layout/subdivisions.css | 116 | `min-height: var(--tile-min-height, 200px);` | Add `--size-tile-height` in layout-sizes. |

### ds/src/css/components/layout/grid.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/layout/grid.css | 10 | `max-width: var(--layout-max-width, 1280px);` | Add `--size-layout-max` in layout-sizes (e.g. 80rem). |
| ds/src/css/components/layout/grid.css | 37 | `minmax(var(--grid-min, 240px), 1fr)` | Add `--size-grid-min` in layout-sizes. |
| ds/src/css/components/layout/grid.css | 41 | `minmax(var(--grid-min, 240px), 1fr)` | Same. |

### ds/src/css/components/navigation/navmenu.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/navigation/navmenu.css | 26 | `max-width: 320px;` | `var(--size-max-xs)` (20rem ≈ 320px) or add navmenu token. |
| ds/src/css/components/navigation/navmenu.css | 75 | `box-shadow: 0 0 0 3px var(--navmenu-accent);` | Focus ring token. |
| ds/src/css/components/navigation/navmenu.css | 116 | `box-shadow: 0 0 0 3px var(--navmenu-accent);` | Same. |
| ds/src/css/components/navigation/navmenu.css | 134 | `max-height: 500px;` | Add `--size-navmenu-max-height` or use token. |
| ds/src/css/components/navigation/navmenu.css | 166 | `box-shadow: 0 0 0 3px var(--navmenu-accent);` | Same. |

### ds/src/css/components/actions/button.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/actions/button.css | 40 | `box-shadow: 0 0 0 3px var(--color-accent);` | Focus ring token. |

### ds/src/css/components/actions/button-group.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/actions/button-group.css | 8 | `/* 16px * 0.25 = 4px */` | Comment only; no code change. |
| ds/src/css/components/actions/button-group.css | 22 | `@media (max-width: 600px)` | Add `--breakpoint-group-stack: 600px` or use nearest breakpoint. |

### ds/src/css/components/actions/dropdown.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/actions/dropdown.css | 25 | `min-width: 180px;` | Add `--size-dropdown-min` or use `var(--size-max-*)`. |
| ds/src/css/components/actions/dropdown.css | 35 | `transform: translateY(4px);` | `translateY(var(--space-xxs))` |
| ds/src/css/components/actions/dropdown.css | 87 | `height: 1px;` | Use 1px divider token or `var(--border-thin)` once defined. |

### ds/src/css/utilities/background-utility.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/utilities/background-utility.css | 57 | `backdrop-filter: blur(4px);` | `var(--blur-s)` or add blur token. |
| ds/src/css/utilities/background-utility.css | 58 | `backdrop-filter: blur(8px);` | `var(--blur-m)` |
| ds/src/css/utilities/background-utility.css | 59 | `backdrop-filter: blur(16px);` | `var(--blur-l)` |

### ds/src/css/utilities/visibility-utility.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/utilities/visibility-utility.css | 19 | `width: 1px;` | Standard a11y clip pattern; consider `var(--border-thin)` if token exists. |
| ds/src/css/utilities/visibility-utility.css | 20 | `height: 1px;` | Same. |
| ds/src/css/utilities/visibility-utility.css | 22 | `margin: -1px;` | Same. |

### ds/src/css/utilities/sizing-utility.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/utilities/sizing-utility.css | 22 | `max-width: 320px !important;` | `var(--size-max-xs)` |
| ds/src/css/utilities/sizing-utility.css | 23 | `max-width: 480px !important;` | Add `--size-max-480` or use rem equivalent token. |
| ds/src/css/utilities/sizing-utility.css | 24 | `max-width: 768px !important;` | `var(--breakpoint-m)` |
| ds/src/css/utilities/sizing-utility.css | 25 | `max-width: 1024px !important;` | `var(--breakpoint-l)` |
| ds/src/css/utilities/sizing-utility.css | 26 | `max-width: 1280px !important;` | `var(--breakpoint-xl)` or layout max token. |

### ds/src/css/utilities/grid-utility.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/utilities/grid-utility.css | 23 | `minmax(var(--grid-min, 200px), 1fr)` | Add `--size-grid-min` in layout-sizes. |
| ds/src/css/utilities/grid-utility.css | 24 | `minmax(var(--grid-min, 200px), 1fr)` | Same. |

### ds/src/css/utilities/border-utility.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/utilities/border-utility.css | 44 | `/* BORDER SIDES (default 1px solid border token) */` | Comment only; ensure implementation uses token. |

### ds/src/css/components/sections/cta.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/sections/cta.css | 21 | `max-width: 720px;` | Add `--size-cta-content` or use rem token. |
| ds/src/css/components/sections/cta.css | 46 | `max-width: 540px;` | Add token or use existing size. |

### ds/src/css/components/sections/hero.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/sections/hero.css | 43 | `max-width: 620px;` | Add `--size-hero-content` in layout-sizes. |

### ds/src/css/components/sections/feature.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/sections/feature.css | 43 | `width: var(--feature-icon-size, 48px);` | Use `var(--size-feature-icon)` from layout-sizes/themes. |
| ds/src/css/components/sections/feature.css | 44 | `height: var(--feature-icon-size, 48px);` | Same. |

### ds/src/css/components/sections/stats.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/sections/stats.css | 7 | `minmax(200px, 1fr)` | `var(--size-grid-min)` or 200px token. |
| ds/src/css/components/sections/stats.css | 8 | `gap: 40px;` | `var(--space-xxxl)` (responsive; check breakpoint). |
| ds/src/css/components/sections/stats.css | 15 | `gap: 8px;` | `var(--space-xs)` |
| ds/src/css/components/sections/stats.css | 41 | `max-width: 180px;` | Add token or use `var(--size-max-*)`. |

### ds/src/css/components/navigation/tabs.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/navigation/tabs.css | 49 | `box-shadow: inset 0 0 0 1px var(--color-border-light);` | 1px → `var(--border-thin)` when token exists. |
| ds/src/css/components/navigation/tabs.css | 74 | `height: 2px;` | `var(--radius-xs)` or add indicator height token. |

### ds/src/css/components/navigation/tab-bar.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/navigation/tab-bar.css | 15 | `height: var(--tab-bar-height, 64px);` | Use theme token or `var(--size-header-height)`. |
| ds/src/css/components/navigation/tab-bar.css | 66 | `width: 24px;` | `var(--space-l)` |
| ds/src/css/components/navigation/tab-bar.css | 67 | `height: 24px;` | `var(--space-l)` |
| ds/src/css/components/navigation/tab-bar.css | 85 | `height: 2px;` | `var(--radius-xs)` or indicator token. |
| ds/src/css/components/navigation/tab-bar.css | 127 | `--tab-bar-height: 52px;` | Add to layout-sizes or theme. |
| ds/src/css/components/navigation/tab-bar.css | 135 | `width: 20px;` | `var(--space-xl)` or icon size token (20px common). |
| ds/src/css/components/navigation/tab-bar.css | 136 | `height: 20px;` | Same. |

### ds/src/css/components/navigation/pagination.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/navigation/pagination.css | 73 | `height: 2px;` | `var(--radius-xs)` or divider token. |

### ds/src/css/components/navigation/link.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/navigation/link.css | 55 | `height: 1px;` | `var(--border-thin)` when token exists. |

### ds/src/css/components/navigation/flyover.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/navigation/flyover.css | 20 | `width: var(--flyover-trigger-size, 56px);` | Add `--size-flyover-trigger` in layout-sizes. |
| ds/src/css/components/navigation/flyover.css | 21 | `height: var(--flyover-trigger-size, 56px);` | Same. |
| ds/src/css/components/navigation/flyover.css | 50 | `calc(... 56px ...)` | Use same token. |
| ds/src/css/components/navigation/flyover.css | 59 | `min-width: 200px;` | `var(--size-grid-min)` or layout token. |
| ds/src/css/components/navigation/flyover.css | 63 | `transform: translateY(8px);` | `translateY(var(--space-xs))` |

### ds/src/css/components/navigation/backdrop.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/navigation/backdrop.css | 11 | `blur(var(--backdrop-blur, 4px))` | Use `var(--blur-s)` when blur token exists. |
| ds/src/css/components/navigation/backdrop.css | 46 | `blur(var(--backdrop-blur, 4px))` | Same. |
| ds/src/css/components/navigation/backdrop.css | 55 | `backdrop-filter: blur(12px);` | Add `var(--blur-l)` or similar. |
| ds/src/css/components/navigation/backdrop.css | 76 | `backdrop-filter: blur(4px);` | `var(--blur-s)` |

### ds/src/css/components/interaction/slider.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/interaction/slider.css | 40 | `width: var(--slider-dot-size, 8px);` | `var(--space-xs)` or add `--size-slider-dot`. |
| ds/src/css/components/interaction/slider.css | 41 | `height: var(--slider-dot-size, 8px);` | Same. |
| ds/src/css/components/interaction/slider.css | 58 | `width: var(--slider-dot-active-width, 24px);` | `var(--space-l)` or add token. |

### ds/src/css/components/interaction/modal.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/interaction/modal.css | 31 | `max-width: 600px;` | Add `--size-modal-mid` in layout-sizes. |
| ds/src/css/components/interaction/modal.css | 48 | `max-width: 400px;` | Add `--size-modal-sm`. |
| ds/src/css/components/interaction/modal.css | 64 | `max-width: 800px;` | Add `--size-modal-lg`. |
| ds/src/css/components/interaction/modal.css | 67 | `@media (min-width: 801px)` | Use `var(--breakpoint-m)` or add 801px token if intentional. |

### ds/src/css/components/interaction/accordion.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/interaction/accordion.css | 71 | `max-height: 600px;` | Add `--size-accordion-max-height` or use token. |

### ds/src/css/components/inputs/toggle-switch.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/inputs/toggle-switch.css | 9 | `width: var(--toggle-width, 44px);` | Add `--size-toggle-width` in layout-sizes. |
| ds/src/css/components/inputs/toggle-switch.css | 10 | `height: var(--toggle-height, 24px);` | `var(--space-l)` or `--size-toggle-height`. |
| ds/src/css/components/inputs/toggle-switch.css | 32 | `border-radius: var(--toggle-height, 24px);` | Same. |
| ds/src/css/components/inputs/toggle-switch.css | 48 | `width: calc(var(--toggle-height, 24px) - 6px);` | Use `var(--radius-md)` for 6px. |
| ds/src/css/components/inputs/toggle-switch.css | 49 | `height: calc(var(--toggle-height, 24px) - 6px);` | Same. |
| ds/src/css/components/inputs/toggle-switch.css | 51 | `left: 3px;` | Add small inset token or use half of `--radius-md`. |
| ds/src/css/components/inputs/toggle-switch.css | 52 | `top: 3px;` | Same. |
| ds/src/css/components/inputs/toggle-switch.css | 57 | `box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);` | Use `var(--shadow-sm)` from tokens. |
| ds/src/css/components/inputs/toggle-switch.css | 72 | `translateX(calc(var(--toggle-width, 44px) - var(--toggle-height, 24px)));` | Use size tokens. |
| ds/src/css/components/inputs/toggle-switch.css | 79 | `box-shadow: 0 0 0 4px ...` | Focus ring token (4px). |

### ds/src/css/components/inputs/radio-card.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/inputs/radio-card.css | 59 | `box-shadow: 0 0 0 2px var(--color-accent);` | Use `var(--radius-xs)` or focus ring token (2px). |

### ds/src/css/components/inputs/checkbox-list.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/inputs/checkbox-list.css | 40 | `margin-top: 2px;` | `var(--radius-xs)` |

### ds/src/css/components/inputs/textfield.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/inputs/textfield.css | 13 | `font-size: 16px; /* iOS zoom-safe */` | Use `var(--fs-body)` or add `--fs-input: 16px` token. |
| ds/src/css/components/inputs/textfield.css | 33 | `box-shadow: 0 2px 0 0 var(--color-accent);` | Underline thickness token or `var(--radius-xs)`. |
| ds/src/css/components/inputs/textfield.css | 74 | `min-height: 120px;` | Add `--size-textarea-min-height` or use spacing token. |
| ds/src/css/components/inputs/textfield.css | 78 | `font-size: 16px;` | Same as line 13. |
| ds/src/css/components/inputs/textfield.css | 95 | `box-shadow: 0 0 0 4px ...` | Focus ring token. |
| ds/src/css/components/inputs/textfield.css | 110 | `width: 18px;` | Icon/control size token. |
| ds/src/css/components/inputs/textfield.css | 111 | `height: 18px;` | Same. |

### ds/src/css/components/inputs/selection.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/inputs/selection.css | 22 | `width: var(--selection-size, 20px);` | Add `--size-selection` or use `var(--space-xl)`. |
| ds/src/css/components/inputs/selection.css | 23 | `height: var(--selection-size, 20px);` | Same. |
| ds/src/css/components/inputs/selection.css | 57 | `box-shadow: 0 0 0 4px ...` | Focus ring token. |
| ds/src/css/components/inputs/selection.css | 77 | `left: 6px;` | `var(--radius-md)` |
| ds/src/css/components/inputs/selection.css | 78 | `top: 2px;` | `var(--radius-xs)` |
| ds/src/css/components/inputs/selection.css | 79 | `width: 5px;` | Add small icon dimension token if needed. |
| ds/src/css/components/inputs/selection.css | 80 | `height: 10px;` | Same. |
| ds/src/css/components/inputs/selection.css | 83 | `border-width: 0 2px 2px 0;` | `var(--border-medium)` when token exists. |
| ds/src/css/components/inputs/selection.css | 89 | `width: 8px;` | `var(--space-xs)` |
| ds/src/css/components/inputs/selection.css | 90 | `height: 8px;` | `var(--space-xs)` |

### ds/src/css/components/inputs/select-menu.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/inputs/select-menu.css | 17 | `min-height: 48px;` | Use `var(--size-input-height)` or add token (48px). |
| ds/src/css/components/inputs/select-menu.css | 20 | `font-size: 16px;` | `var(--fs-body)` or `--fs-input`. |
| ds/src/css/components/inputs/select-menu.css | 46 | `width: 12px;` | `var(--space-s)` |
| ds/src/css/components/inputs/select-menu.css | 47 | `height: 12px;` | `var(--space-s)` |
| ds/src/css/components/inputs/select-menu.css | 51 | `background-size: 12px 12px;` | Same. |
| ds/src/css/components/inputs/select-menu.css | 62 | `box-shadow: 0 0 0 4px ...` | Focus ring token. |

### ds/src/css/components/inputs/input.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/inputs/input.css | 15 | `min-height: 48px;` | `var(--size-input-height)` or add token. |
| ds/src/css/components/inputs/input.css | 18 | `font-size: 16px;` | `var(--fs-input)` or `var(--fs-body)`. |
| ds/src/css/components/inputs/input.css | 40 | `box-shadow: 0 0 0 4px ...` | Focus ring token. |

### ds/src/css/components/forms/form-section.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/forms/form-section.css | 51 | `height: 1px;` | `var(--border-thin)` when token exists. |
| ds/src/css/components/forms/form-section.css | 80 | `border-left: 4px solid var(--color-accent);` | `var(--radius-sm)` or accent border token. |
| ds/src/css/components/forms/form-section.css | 81 | `padding-left: calc(var(--space-xl) - 4px);` | Use `var(--space-xl)` and `var(--radius-sm)` in calc. |

### ds/src/css/components/forms/form-field.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/forms/form-field.css | 23 | `min-height: 48px;` | `var(--size-input-height)` or token. |
| ds/src/css/components/forms/form-field.css | 42 | `min-height: 120px;` | `var(--size-textarea-min)` or token. |
| ds/src/css/components/forms/form-field.css | 51 | `background-size: 16px;` | `var(--space-m)` |
| ds/src/css/components/forms/form-field.css | 71 | `box-shadow: 0 0 0 4px ...` | Focus ring token. |
| ds/src/css/components/forms/form-field.css | 139 | `min-height: 40px;` | `var(--space-xxxl)` or size token. |
| ds/src/css/components/forms/form-field.css | 147 | `min-height: 56px;` | Add `--size-input-height-lg` or use token. |

### ds/src/css/components/feedback/tooltip.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/feedback/tooltip.css | 49 | `border-width: var(--tooltip-arrow-size, 6px);` | Add `--size-tooltip-arrow` or use `var(--radius-md)`. |
| ds/src/css/components/feedback/tooltip.css | 60 | `transform: translate(-50%, -6px);` | Use `calc(-1 * var(--radius-md))`. |
| ds/src/css/components/feedback/tooltip.css | 77 | `transform: translate(-50%, 6px);` | `var(--radius-md)` |
| ds/src/css/components/feedback/tooltip.css | 94 | `transform: translate(-6px, -50%);` | Same. |
| ds/src/css/components/feedback/tooltip.css | 111 | `transform: translate(6px, -50%);` | Same. |

### ds/src/css/components/feedback/toast.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/feedback/toast.css | 15 | `max-width: 400px;` | Add `--size-toast-max` or use modal-sm token. |
| ds/src/css/components/feedback/toast.css | 94 | `transform: translateX(40px);` | `var(--space-xxxl)` (40px at base) or token. |

### ds/src/css/components/feedback/spinner.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/feedback/spinner.css | 7 | `width: var(--spinner-size, 20px);` | Add `--size-spinner` in layout-sizes. |
| ds/src/css/components/feedback/spinner.css | 8 | `height: var(--spinner-size, 20px);` | Same. |
| ds/src/css/components/feedback/spinner.css | 29 | `--spinner-size: 16px;` | Use `var(--space-m)` or size scale. |
| ds/src/css/components/feedback/spinner.css | 33 | `--spinner-size: 20px;` | Same. |
| ds/src/css/components/feedback/spinner.css | 37 | `--spinner-size: 28px;` | `var(--space-xl)` or size scale. |
| ds/src/css/components/feedback/spinner.css | 41 | `--spinner-size: 36px;` | `var(--space-xxl)` or size scale. |

### ds/src/css/components/feedback/progress-bar.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/feedback/progress-bar.css | 11 | `height: var(--progress-height, 8px);` | `var(--space-xs)` or add `--size-progress-height`. |
| ds/src/css/components/feedback/progress-bar.css | 82 | `height: 4px;` | `var(--space-xxs)` |
| ds/src/css/components/feedback/progress-bar.css | 86 | `height: 8px;` | `var(--space-xs)` |
| ds/src/css/components/feedback/progress-bar.css | 90 | `height: 12px;` | `var(--space-s)` |
| ds/src/css/components/feedback/progress-bar.css | 94 | `height: 16px;` | `var(--space-m)` |
| ds/src/css/components/feedback/progress-bar.css | 106 | `... 10px` (in gradient) | `var(--space-s)` or keep for stripe width. |
| ds/src/css/components/feedback/progress-bar.css | 107 | `... 10px` | Same. |
| ds/src/css/components/feedback/progress-bar.css | 108 | `... 20px` | `var(--space-l)` or token. |
| ds/src/css/components/feedback/progress-bar.css | 119 | `background-position: 40px 0;` | `var(--space-xxxl)` (base) or token. |

### ds/src/css/components/feedback/popover.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/feedback/popover.css | 10 | `min-width: 200px;` | `var(--size-grid-min)` or dropdown token. |
| ds/src/css/components/feedback/popover.css | 11 | `max-width: 320px;` | `var(--size-max-xs)` or navmenu token. |
| ds/src/css/components/feedback/popover.css | 23 | `transform: translateY(4px);` | `translateY(var(--space-xxs))` |
| ds/src/css/components/feedback/popover.css | 45 | `width: 10px;` | `var(--radius-lg)` or arrow size token. |
| ds/src/css/components/feedback/popover.css | 46 | `height: 10px;` | Same. |
| ds/src/css/components/feedback/popover.css | 62 | `transform: translateY(4px);` | `var(--space-xxs)` |
| ds/src/css/components/feedback/popover.css | 68 | `bottom: -5px;` | Consider `calc(-1 * var(--radius-md))` (6px). |
| ds/src/css/components/feedback/popover.css | 74 | `transform: translateY(-4px);` | `calc(-1 * var(--space-xxs))` |
| ds/src/css/components/feedback/popover.css | 80 | `top: -5px;` | Same as 68. |
| ds/src/css/components/feedback/popover.css | 87 | `transform: translateX(4px);` | `var(--space-xxs)` |
| ds/src/css/components/feedback/popover.css | 93 | `right: -5px;` | Same. |
| ds/src/css/components/feedback/popover.css | 100 | `transform: translateX(-4px);` | Same. |
| ds/src/css/components/feedback/popover.css | 106 | `left: -5px;` | Same. |

### ds/src/css/components/data-display/card.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/data-display/card.css | 30 | `box-shadow: 0 0 0 3px ...` | Focus ring token. |
| ds/src/css/components/data-display/card.css | 41 | `transform: translateY(-2px);` | `calc(-1 * var(--radius-xs))` |
| ds/src/css/components/data-display/card.css | 59 | `min-height: 240px;` | Add `--size-card-min-height` or token. |
| ds/src/css/components/data-display/card.css | 76 | `background: rgba(0, 0, 0, 0.3);` | Use `var(--opacity-low)` or overlay token: e.g. `color-mix(in srgb, var(--color-brand-black) 30%, transparent)`. |
| ds/src/css/components/data-display/card.css | 96 | `height: var(--card-image-header-height, 180px);` | Add `--size-card-image-height` in layout-sizes. |
| ds/src/css/components/data-display/card.css | 160 | `minmax(300px, 1fr)` | Add `--size-card-min-width` or use token. |
| ds/src/css/components/data-display/card.css | 184 | `inset 0 0 0 1px ...` | 1px → `var(--border-thin)`. |
| ds/src/css/components/data-display/card.css | 185 | `inset 0 2px 6px rgba(...)` | Use `var(--shadow-sm)` or elevation token. |
| ds/src/css/components/data-display/card.css | 190 | `inset 0 0 0 1px ...` | Same as 184. |
| ds/src/css/components/data-display/card.css | 191 | `inset 0 3px 10px rgba(...)` | Use shadow token. |
| ds/src/css/components/data-display/card.css | 232 | `right: -40px;` | `calc(-1 * var(--space-xxxl))` (base) or token. |
| ds/src/css/components/data-display/card.css | 242 | `width: 140px;` | Add ribbon width token or use spacing scale. |
| ds/src/css/components/data-display/card.css | 251 | `right: -28px;` | `calc(-1 * var(--space-xl))` (28px at base). |
| ds/src/css/components/data-display/card.css | 252 | `width: 110px;` | Add token or use spacing. |
| ds/src/css/components/data-display/card.css | 262 | `transform: translateY(6px);` | `var(--radius-md)` |
| ds/src/css/components/data-display/card.css | 285 | `max-height: 1000px;` | Add `--size-card-content-max` or use token. |
| ds/src/css/components/data-display/card.css | 336 | `width: 8px;` | `var(--space-xs)` |
| ds/src/css/components/data-display/card.css | 337 | `height: 8px;` | Same. |
| ds/src/css/components/data-display/card.css | 340 | `margin-top: 6px;` | `var(--radius-md)` |

### ds/src/css/components/data-display/table.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/data-display/table.css | 58 | `height: 1px;` | `var(--border-thin)` when token exists. |
| ds/src/css/components/data-display/table.css | 105 | `border-left: 5px solid transparent;` | Add small border token or use `var(--radius-md)` (6px). |
| ds/src/css/components/data-display/table.css | 106 | `border-right: 5px solid transparent;` | Same. |
| ds/src/css/components/data-display/table.css | 107 | `border-bottom: 5px solid var(--color-gray-400);` | Same. |

### ds/src/css/components/data-display/list.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/data-display/list.css | 9 | `border-radius: 4px;` | `var(--radius-sm)` |
| ds/src/css/components/data-display/list.css | 12 | `border: 1px solid ...` | `var(--border-thin)` when token exists. |
| ds/src/css/components/data-display/list.css | 33 | `margin-right: 8px;` | `var(--space-xs)` |
| ds/src/css/components/data-display/list.css | 40 | `margin-right: 8px;` | Same. |
| ds/src/css/components/data-display/list.css | 51 | `gap: 16px;` | `var(--space-m)` |
| ds/src/css/components/data-display/list.css | 52 | `padding: 16px 20px;` | `var(--space-m)` and add 20px token or use `var(--space-l)`. |
| ds/src/css/components/data-display/list.css | 53 | `min-height: 72px;` | Add `--size-list-item-tall` or use spacing. |
| ds/src/css/components/data-display/list.css | 55 | `border-bottom: 1px solid ...` | `var(--border-thin)`. |
| ds/src/css/components/data-display/list.css | 79 | `padding: 10px 16px;` | `var(--radius-lg)` (10px) and `var(--space-m)`. |
| ds/src/css/components/data-display/list.css | 80 | `min-height: 48px;` | `var(--size-input-height)` or token. |
| ds/src/css/components/data-display/list.css | 114 | `width: 24px;` | `var(--space-l)` |
| ds/src/css/components/data-display/list.css | 115 | `height: 24px;` | Same. |
| ds/src/css/components/data-display/list.css | 120 | `width: 20px;` | `var(--space-xl)` or icon size. |
| ds/src/css/components/data-display/list.css | 121 | `height: 20px;` | Same. |
| ds/src/css/components/data-display/list.css | 128 | `gap: 2px;` | `var(--radius-xs)` |
| ds/src/css/components/data-display/list.css | 134 | `font-size: 16px;` | `var(--fs-body)` or `--fs-input`. |
| ds/src/css/components/data-display/list.css | 142 | `font-size: 14px;` | Add `--fs-list-title` if in typography scale. |
| ds/src/css/components/data-display/list.css | 147 | `font-size: 14px;` | Same. |
| ds/src/css/components/data-display/list.css | 154 | `font-size: 12px;` | Add caption/small token if in scale. |
| ds/src/css/components/data-display/list.css | 161 | `gap: 12px;` | `var(--space-s)` |
| ds/src/css/components/data-display/list.css | 170 | `margin-left: 4px;` | `var(--space-xxs)` |

### ds/src/css/components/data-display/badge.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/components/data-display/badge.css | 32 | `min-height: var(--badge-height, 20px);` | Add `--size-badge-height` or use `var(--space-xl)`. |
| ds/src/css/components/data-display/badge.css | 56 | `width: 8px;` | `var(--space-xs)` |
| ds/src/css/components/data-display/badge.css | 57 | `height: 8px;` | Same. |
| ds/src/css/components/data-display/badge.css | 71 | `width: 12px;` | `var(--space-s)` |
| ds/src/css/components/data-display/badge.css | 72 | `height: 12px;` | Same. |

### ds/src/css/data/icons.css

| File | Line | Offending Code | Suggested Token Fix |
|------|------|----------------|---------------------|
| ds/src/css/data/icons.css | 8 | `width: 1.25rem;  /* 20px */` | Use `var(--size-icon)` or `var(--space-xl)` if 20px is standard. |

---

## 4. HTML files

**design-showroom/master-template.html**  
No inline styles or hardcoded pixel/hex/z-index values were found. The template uses classes and links to `../ds/src/css/main.css`; no violations to report.

---

## Summary

- **Hex color violations:** 4 (typography.css ×3, list.css ×1).
- **Integer z-index violations:** 5 (subdivisions.css ×1, card.css ×4).
- **Hardcoded pixel (and related) violations:** 200+ across components, utilities, base, themes, and tokens/border-width.css.
- **HTML:** No violations in `master-template.html`.

Recommended next steps: introduce missing tokens (e.g. focus ring width, blur, input/icon sizes, layout max widths) in `tokens/`, then replace hardcoded values with `var(...)` in the order above. Prioritize hex and z-index fixes for consistency and maintainability.
