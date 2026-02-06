import { initSidebar } from './components/sidebar.js';
import { initSidebarToggle } from './components/sidebar-toggle.js';
import { initForms } from './components/forms.js';
import { initRouter } from './core/router.js';
import { initTheme } from './core/theme.js';

// Bundle the design system CSS with Vite.
// This avoids relying on a raw <link> path in index.html.
import '@ds/main.css';

document.addEventListener('DOMContentLoaded', () => {
    console.log('JARVIS: System Booting...');

    // 1. Initialize Theme (Data-theme attribute sync)
    initTheme();

    // 2. Initialize the Sidebar toggle (Mobile menu)
    initSidebarToggle();

    // 3. Initialize the Sidebar logic (Orange links/Accordion)
    initSidebar();

    // 4. Initialize Remote Forms
    initForms();

    // 5. Initialize the Router (Intercepts clicks for smooth SPA transitions)
    initRouter();

    console.log('JARVIS: All systems nominal.');
});
