// sidebar.js

async function initLayout() {
    const sidebarElement = document.querySelector('.u-sidebar');
    const headerElement = document.querySelector('.u-header');
    const backdrop = document.getElementById('backdrop');

    // 1. Fetch and Inject Header
    if (headerElement) {
        try {
            const response = await fetch('./aheader.html');
            if (response.ok) {
                const html = await response.text();
                headerElement.innerHTML = html;

                // Set page title in header if possible
                const headerTitle = headerElement.querySelector('#headerTitle');
                if (headerTitle) {
                    const pageTitle = document.title.replace('Design System - ', '').replace('Showroom - ', '');
                    headerTitle.textContent = pageTitle;
                }
            }
        } catch (error) {
            console.error('Header load failed:', error);
        }
    }

    // 2. Fetch and Inject Sidebar
    if (sidebarElement) {
        try {
            const response = await fetch('./asidebar.html');
            if (response.ok) {
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const incomingSidebar = doc.querySelector('.u-sidebar');

                if (incomingSidebar) {
                    sidebarElement.innerHTML = incomingSidebar.innerHTML;
                } else {
                    sidebarElement.innerHTML = html;
                }
            }
        } catch (error) {
            console.error('Sidebar load failed:', error);
        }
    }

    // 3. Set up Toggles (after header/sidebar are injected)
    const menuBtn = document.getElementById('menuBtn');

    function toggleMenu() {
        if (!sidebarElement) return;

        const isOpen = sidebarElement.classList.toggle('is-open');
        if (backdrop) backdrop.classList.toggle('is-active');

        if (menuBtn) {
            menuBtn.textContent = isOpen ? 'Close' : 'Menu';
        }
    }

    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (backdrop) backdrop.addEventListener('click', toggleMenu);

    // 4. Hydrate active link state (run after sidebar is injected)
    hydrateSidebarActiveState();
}

// Dedicated hydration function for sidebar active state
function hydrateSidebarActiveState() {
    const sidebarElement = document.querySelector('.u-sidebar');
    if (!sidebarElement) return;

    // Get current page path and normalize it (remove .html extension if present)
    const currentPath = window.location.pathname;
    const normalizedCurrentPath = currentPath.replace(/\.html$/, '');

    // Find all links in the sidebar
    const links = sidebarElement.querySelectorAll('a');

    links.forEach(link => {
        // Get the absolute URL of the link
        const linkUrl = new URL(link.href, window.location.origin);

        // Normalize the link pathname (remove .html extension if present) 
        const normalizedLinkPath = linkUrl.pathname.replace(/\.html$/, '');

        // Check if this link matches the current page (comparing normalized paths)
        const isMatch = normalizedLinkPath === normalizedCurrentPath;

        if (isMatch) {
            // Apply active styles: orange text, bold, and orange left border
            link.classList.add('text-brand-orange', 'font-bold', 'border-l-2', 'border-brand-orange');
            link.classList.remove('border-transparent');

            // Find and open the parent accordion (details element)
            const parentDetails = link.closest('details');
            if (parentDetails) {
                // Force the accordion to stay open
                parentDetails.setAttribute('open', '');
                parentDetails.open = true;
            }
        }
    });
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
} else {
    initLayout();
}

