// Pre-render active state into sidebar HTML BEFORE DOM injection
function applyActiveStateToSidebar(sidebarElement) {
    const currentPath = window.location.pathname;
    const normalizedCurrentPath = currentPath.replace(/\.html$/, '');

    const links = sidebarElement.querySelectorAll('a');

    links.forEach(link => {
        const linkUrl = new URL(link.href, window.location.origin);
        const normalizedLinkPath = linkUrl.pathname.replace(/\.html$/, '');

        // LOGIC ONLY: Toggle the 'is-active' class
        const isMatch = normalizedLinkPath === normalizedCurrentPath;
        link.classList.toggle('is-active', isMatch);

        // Open parent accordion if active
        if (isMatch) {
            const parentDetails = link.closest('details');
            if (parentDetails) {
                parentDetails.open = true;
            }
        }
    });
}