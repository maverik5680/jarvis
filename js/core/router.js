import { updateActiveLinks } from '../components/sidebar.js';

export function initRouter() {
    // Listen for all clicks on the document
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        
        // Only intercept if it's an internal link (not a new tab or external site)
        if (link && link.href.startsWith(window.location.origin)) {
            e.preventDefault(); 
            const url = link.href;
            navigateToPage(url);
        }
    });

    // Handle the browser "Back" and "Forward" buttons
    window.addEventListener('popstate', () => {
        navigateToPage(window.location.href, false);
    });
}

/**
 * Navigates to a new page with smooth fade transition
 * @param {string} url - The URL to navigate to
 * @param {boolean} pushState - Whether to push a new state to history (default: true)
 */
async function navigateToPage(url, pushState = true) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) {
        console.error('Router: #main-content element not found');
        return;
    }

    // Add loading class to trigger fade-out animation
    mainContent.classList.add('is-loading');

    try {
        // Fetch the new page
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract the main content from the fetched page
        const newMainContent = doc.getElementById('main-content');
        if (!newMainContent) {
            throw new Error('Target page does not have #main-content element');
        }

        // Wait for animation to complete before updating content
        await new Promise(resolve => setTimeout(resolve, 300));

        // Update the DOM
        mainContent.innerHTML = newMainContent.innerHTML;

        // Update the URL in the browser (if not from popstate)
        if (pushState) {
            window.history.pushState({}, '', url);
        }

        // Update active links in sidebar
        const sidebar = document.querySelector('.u-sidebar');
        if (sidebar) {
            updateActiveLinks(sidebar);
        }

        // Remove loading class to trigger fade-in animation
        mainContent.classList.remove('is-loading');

    } catch (error) {
        console.error('Router: Navigation failed', error);
        // Remove loading class on error
        mainContent.classList.remove('is-loading');
        // Fallback to hard navigation
        window.location.href = url;
    }
}