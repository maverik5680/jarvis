# Responsive SaaS Layout Examples

This directory contains example implementations of the production-ready responsive SaaS layout system.

## Files

### `test-layout.html`
**Self-contained demo with inline styles**
- All CSS and JavaScript inline
- No external dependencies
- Perfect for quick testing and demos
- Open directly in a browser

**Usage:**
```bash
# Open in browser
open test-layout.html
# or
python3 -m http.server 8080
# then visit http://localhost:8080/test-layout.html
```

### `index.html`
**Full example with CSS imports**
- Uses design system CSS files
- Demonstrates proper integration
- More feature examples
- Best for learning the structure

### `saas-layout-example.html`
**Alternative implementation**
- Extended content examples
- Shows different use cases
- Alternative organization

## Features Demonstrated

### Mobile-First Responsive Design
- **Mobile (<1024px)**: Sidebar hidden with hamburger menu
- **Desktop (≥1024px)**: Sidebar fixed on left side

### Interactive Elements
1. **Hamburger Menu** - Click to toggle sidebar on mobile
2. **Backdrop Overlay** - Click to close sidebar
3. **Keyboard Navigation** - Press Escape to close
4. **Auto-close** - Sidebar closes when resizing to desktop

### Accessibility
- Semantic HTML5 structure
- ARIA labels and roles
- Keyboard navigation support
- Skip-to-main-content link
- Focus management

## Design Tokens Used

### Colors
```css
--color-bg-sidebar: var(--color-brand-black)  /* #000000 */
--color-accent: var(--color-brand-orange)     /* #FF5F00 */
--color-bg-surface: var(--color-gray-900)     /* #0a0a0b */
```

### Spacing
```css
--space-xs: 8px
--space-m: 16px
--space-l: 24px
--space-xl: 28px
```

### Motion
```css
--ms-fast: 150ms
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)
```

### Layout
```css
--sidebar-width: 280px
--breakpoint-l: 1024px
--z-sidebar: 1000
--z-header: 1100
```

## Testing Checklist

- [ ] **Desktop view** - Sidebar visible, no hamburger menu
- [ ] **Mobile view** - Sidebar hidden, hamburger visible
- [ ] **Toggle sidebar** - Click hamburger to open/close
- [ ] **Backdrop** - Click dark overlay to close
- [ ] **Escape key** - Press Escape to close sidebar
- [ ] **Resize** - Window resize auto-closes mobile sidebar
- [ ] **Keyboard nav** - Tab through links, arrows in accordions
- [ ] **Active state** - Current page link highlighted in orange
- [ ] **Smooth animations** - All transitions are smooth

## Browser Support

✅ Chrome/Edge 88+
✅ Firefox 87+
✅ Safari 14+
✅ iOS Safari 14+
✅ Chrome Android

## Customization

### Change Sidebar Width
```css
:root {
  --sidebar-width: 320px; /* Default: 280px */
}
```

### Change Breakpoint
```css
:root {
  --breakpoint-l: 1280px; /* Default: 1024px */
}
```

### Change Colors
```css
:root {
  --color-bg-sidebar: #1a1a1a;    /* Lighter sidebar */
  --color-accent: #0066ff;         /* Blue accent */
}
```

### Change Animation Speed
```css
:root {
  --ms-fast: 200ms;  /* Slower (default: 150ms) */
  --ms-fast: 100ms;  /* Faster */
}
```

## Integration Guide

### 1. HTML Structure
```html
<header class="header">
  <button class="menu-btn" id="menuBtn">
    <span></span>
  </button>
</header>

<div class="layout-shell">
  <aside class="sidebar" id="mainSidebar">
    <!-- Navigation content -->
  </aside>
  
  <main class="main-area" id="main-content">
    <!-- Main content -->
  </main>
</div>

<div class="sidebar-backdrop" id="backdrop"></div>
```

### 2. CSS Imports
```html
<link rel="stylesheet" href="../ds/src/css/tokens/colors.css">
<link rel="stylesheet" href="../ds/src/css/tokens/spacing.css">
<link rel="stylesheet" href="../ds/src/css/tokens/motion.css">
<link rel="stylesheet" href="../ds/src/css/components/layout/sidebar.css">
<link rel="stylesheet" href="../ds/src/css/components/navigation/navbar.css">
```

### 3. JavaScript
```html
<script type="module">
  import { initSidebarToggle } from '../js/components/sidebar-toggle.js';
  initSidebarToggle();
</script>
```

## Performance Tips

1. **Use CSS transforms** - Already implemented for GPU acceleration
2. **Minimize repaints** - Layout uses `transform` not `left/right`
3. **Debounce resize** - Already implemented (250ms delay)
4. **Lazy load content** - Consider for large sidebars
5. **Optimize images** - Use WebP format where possible

## Accessibility Tips

1. **Always include ARIA labels** - Already implemented
2. **Test with keyboard only** - Tab, Escape, Arrow keys
3. **Test with screen reader** - VoiceOver, NVDA, JAWS
4. **Maintain focus order** - Sidebar should come before main
5. **Provide skip links** - Already implemented

## Troubleshooting

### Sidebar not sliding in
- Check that JavaScript is loading correctly
- Verify `initSidebarToggle()` is being called
- Check browser console for errors

### Sidebar flickering on page load
- Ensure CSS loads before JavaScript
- Check that default state is `transform: translateX(-100%)`

### Layout shifting on desktop
- Verify `--sidebar-width` matches sidebar width
- Check that media query is at correct breakpoint

### Hamburger not visible on mobile
- Check viewport is under 1024px
- Verify media query in navbar.css
- Inspect element to see if display: none is applied

## Support

For issues or questions:
1. Check this README
2. Review example files
3. Check design system documentation
4. Open an issue in the repository

## License

Part of the Jarvis Design System.
