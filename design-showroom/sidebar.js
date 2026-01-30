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

    // 2. Fetch and Inject Sidebar WITH PRE-RENDERED ACTIVE STATE
    if (sidebarElement) {
        try {
            const response = await fetch('/asidebar.html');
            if (response.ok) {
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const incomingSidebar = doc.querySelector('.u-sidebar');

                if (incomingSidebar) {
                    // PRE-RENDER: Apply active state BEFORE injecting into DOM
                    applyActiveStateToSidebar(incomingSidebar);
                    // Inject the pre-configured sidebar
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
}

// Pre-render active state into sidebar HTML BEFORE DOM injection
function applyActiveStateToSidebar(sidebarElement) {
    // Get current page path and normalize it
    const currentPath = window.location.pathname;
    const normalizedCurrentPath = currentPath.replace(/\.html$/, '');

    // Find all links in the sidebar
    const links = sidebarElement.querySelectorAll('a');

    links.forEach(link => {
        // Get the absolute URL of the link
        const linkUrl = new URL(link.href, window.location.origin);

        // Normalize the link pathname
        const normalizedLinkPath = linkUrl.pathname.replace(/\.html$/, '');

        // Check if this link matches the current page
        const isMatch = normalizedLinkPath === normalizedCurrentPath;

        if (isMatch) {
            // Apply active classes
            link.classList.add('text-brand-orange', 'font-bold', 'border-l-2', 'border-brand-orange');
            link.classList.remove('border-transparent');

            // CRITICAL: Add inline styles to override CSS specificity
            link.style.color = 'var(--color-brand-orange)';
            link.style.fontWeight = '700';
            link.style.borderLeft = '2px solid var(--color-brand-orange)';

            // Open the parent accordion BEFORE injection
            const parentDetails = link.closest('details');
            if (parentDetails) {
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

