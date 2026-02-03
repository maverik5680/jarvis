export function initRouter() {
    window.addEventListener('popstate', (e) => navigateToPage(window.location.href, false));
    // Logic to intercept link clicks goes here...
}

export async function navigateToPage(url, pushState = true) {
    // Your AJAX fetching logic from earlier
}