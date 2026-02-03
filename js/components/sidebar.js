// ds/src/js/components/sidebar.js

/**
 * Initializes sidebar behaviors: Active States and Accordion logic.
 */
export function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // 1. Set initial active state and open parent details
    updateActiveLinks(sidebar);

    // 2. Accordion Logic: Close other <details> when one is opened
    const allDetails = sidebar.querySelectorAll('details');
    
    allDetails.forEach((targetDetail) => {
        targetDetail.addEventListener('toggle', () => {
            // If the user just opened this one...
            if (targetDetail.open) {
                // ...close all others
                allDetails.forEach((detail) => {
                    if (detail !== targetDetail) {
                        detail.open = false;
                    }
                });
            }
        });
    });
}

/**
 * Applies 'is-active' class to the link matching the current URL
 */
export function updateActiveLinks(sidebarElement) {
    const currentPath = window.location.pathname.replace(/\.html$/, '') || '/';
    const links = sidebarElement.querySelectorAll('a');

    links.forEach(link => {
        try {
            const linkUrl = new URL(link.href, window.location.origin);
            const linkPath = linkUrl.pathname.replace(/\.html$/, '');

            const isMatch = linkPath === currentPath;
            link.classList.toggle('is-active', isMatch);

            // Ensure the active link's category is open on load
            if (isMatch) {
                const parentDetails = link.closest('details');
                if (parentDetails) parentDetails.open = true;
            }
        } catch (e) {
            // Ignore invalid URLs
        }
    });
}