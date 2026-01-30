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

    // 4. Highlight active link & Auto-open category
    if (sidebarElement) {
        // Use current window URL for comparison
        const currentUrl = new URL(window.location.href);
        const links = sidebarElement.querySelectorAll('a');

        links.forEach(link => {
            // Create URL object for the link to normalize it
            // Use link.href directly as it returns the absolute URL
            const linkUrl = new URL(link.href, window.location.origin);

            // Compare pathnames to avoid hash/query mismatches if those vary
            // Also matching trailing slash cases if necessary
            // We strip leading slash to ensure consistency if needed, but pathname comparison is usually safe
            const isMatch = linkUrl.pathname === currentUrl.pathname;

            if (isMatch) {
                // Apply active styles: Brand Orange + Bold + Border Color
                link.classList.add('text-brand-orange', 'font-bold', 'border-brand-orange');
                link.classList.remove('border-transparent');

                // Expand parent accordion
                const parentDetails = link.closest('details');
                if (parentDetails) {
                    parentDetails.setAttribute('open', 'true');
                }
            }
        });
    }
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
} else {
    initLayout();
}

