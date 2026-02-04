import { initSidebar } from './components/sidebar.js';
import { initSidebarToggle } from './components/sidebar-toggle.js';
import { initRouter } from './core/router.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('JARVIS: System Booting...');

    // 1. Initialize the Sidebar toggle (Mobile menu)
    initSidebarToggle();

    // 2. Initialize the Sidebar logic (Orange links/Accordion)
    initSidebar();

    // 3. Initialize the Router (Intercepts clicks for smooth fades)
    initRouter();

    console.log('JARVIS: All systems nominal.');
});
