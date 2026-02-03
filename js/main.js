// main.js - The central dispatcher
import { initSidebar } from './components/sidebar.js';
// import { initRouter } from './core/router.js'; // We can enable these as we build them
// import { initTheme } from './core/theme.js';
// import { initUI } from './core/ui.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('JARVIS: System Booting...');

    // Initialize the sidebar (which handles the Brand Orange active links)
    initSidebar();

    // Add other initializers here as we create the files
    console.log('JARVIS: All systems nominal.');
});