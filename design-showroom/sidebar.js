// sidebar.js
const sidebarContent = `
    <div style="padding: 20px;">
        <h2><a href="inputs.html" style="color: inherit; text-decoration: none;">JARVIS</a></h2>
        <nav>
            <!-- your entire <details> structure exactly as-is -->
            ${/* I'm not rewriting it all, just keep your existing content */""}
        </nav>
    </div>
`;

document.addEventListener("DOMContentLoaded", function () {
    const sidebarElement = document.querySelector('.u-sidebar');
    if (!sidebarElement) return;

    // 1. Inject sidebar HTML
    sidebarElement.innerHTML = sidebarContent;

    // 2. Determine current page
    const currentFile = window.location.pathname.split("/").pop() || "index.html";

    // 3. Highlight active link
    const activeLink = sidebarElement.querySelector(`a[href="${currentFile}"]`);
    if (activeLink) {
        activeLink.classList.add('active');

        // 4. Auto-open correct <details>
        const parentDetails = activeLink.closest('details');
        if (parentDetails) {
            parentDetails.setAttribute('open', '');
        }
    }
});
