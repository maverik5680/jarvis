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
                updateHeaderTitle();
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

                    // Setup client-side navigation after sidebar is loaded
                    setupClientSideNavigation();
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

// Update header title based on current page title
function updateHeaderTitle() {
    const headerTitle = document.querySelector('#headerTitle');
    if (headerTitle) {
        const pageTitle = document.title.replace('Design System - ', '').replace('Showroom - ', '');
        headerTitle.textContent = pageTitle;
    }
}

// Client-side navigation system
function setupClientSideNavigation() {
    const sidebarElement = document.querySelector('.u-sidebar');
    if (!sidebarElement) return;

    // Intercept all sidebar link clicks
    sidebarElement.addEventListener('click', async (e) => {
        const link = e.target.closest('a');

        // Only intercept internal links
        if (!link || link.getAttribute('href') === '#' || link.hostname !== window.location.hostname) {
            return;
        }

        e.preventDefault();
        const targetUrl = link.href;

        // Navigate to the target URL
        await navigateToPage(targetUrl);
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', async (e) => {
        await navigateToPage(window.location.href, false);
    });
}

// Navigate to a new page with smooth transition
async function navigateToPage(url, pushState = true) {
    try {
        const mainArea = document.querySelector('.u-main-area');
        const main = mainArea?.querySelector('main');

        if (!main) return;

        // Fade out current content
        main.style.transition = 'opacity 0.2s ease-out';
        main.style.opacity = '0';

        // Wait for fade out
        await new Promise(resolve => setTimeout(resolve, 200));

        // Fetch the target page
        const response = await fetch(url);
        if (!response.ok) throw new Error('Page fetch failed');

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract the new main content
        const newMain = doc.querySelector('main');
        if (!newMain) throw new Error('No main element found in target page');

        // Replace the content
        main.innerHTML = newMain.innerHTML;
        main.style.padding = newMain.style.padding || '';

        // Update document title
        const newTitle = doc.title;
        if (newTitle) {
            document.title = newTitle;
            updateHeaderTitle();
        }

        // Update URL if needed
        if (pushState && url !== window.location.href) {
            window.history.pushState({}, newTitle, url);
        }

        // Sync sidebar active state
        const sidebarElement = document.querySelector('.u-sidebar');
        if (sidebarElement) {
            applyActiveStateToSidebar(sidebarElement);
        }

        // Fade in new content
        main.style.opacity = '1';

        // Scroll to top
        mainArea.scrollTop = 0;

    } catch (error) {
        console.error('Navigation failed:', error);
        // Fallback to hard navigation on error
        window.location.href = url;
    }
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
        } else {
            // Remove active classes and inline styles from non-matching links
            link.classList.remove('text-brand-orange', 'font-bold', 'border-l-2', 'border-brand-orange');
            link.classList.add('border-transparent');

            // Clear inline styles
            link.style.color = '';
            link.style.fontWeight = '';
            link.style.borderLeft = '';
        }
    });
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
} else {
    initLayout();
}

