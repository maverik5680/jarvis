// sidebar.js

async function initSidebar() {
    const sidebarElement = document.querySelector('.u-sidebar');
    const menuBtn = document.getElementById('menuBtn');
    const backdrop = document.getElementById('backdrop');

    if (!sidebarElement) return;

    // 1. Fetch and Inject Sidebar HTML
    try {
        const response = await fetch('./asidebar.html');
        if (!response.ok) throw new Error('Failed to load asidebar.html');
        const html = await response.text();

        // Extract content inside <aside> or use the whole thing if it's just the aside
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const incomingSidebar = doc.querySelector('.u-sidebar');

        if (incomingSidebar) {
            sidebarElement.innerHTML = incomingSidebar.innerHTML;
        } else {
            // Fallback if the file just contains the inner content
            sidebarElement.innerHTML = html;
        }
    } catch (error) {
        console.error('Sidebar load failed:', error);
    }

    // 2. Mobile Toggle Logic
    function toggleMenu() {
        sidebarElement.classList.toggle('is-open');
        if (backdrop) backdrop.classList.toggle('is-active');
        if (menuBtn) {
            menuBtn.textContent = sidebarElement.classList.contains('is-open') ? 'Close' : 'Menu';
        }
    }

    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (backdrop) backdrop.addEventListener('click', toggleMenu);

    // 3. Highlight active link & Auto-open category
    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    const links = sidebarElement.querySelectorAll('a');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentFile) {
            link.classList.add('active');

            // Auto-open correct <details>
            const parentDetails = link.closest('details');
            if (parentDetails) {
                parentDetails.setAttribute('open', '');
            }
        }
    });
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
} else {
    initSidebar();
}

