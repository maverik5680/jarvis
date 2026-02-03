// ds/src/js/core/theme.js

export function initTheme() {
    const themeToggle = document.querySelector('#theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // 1. Apply theme on load
    applyTheme(currentTheme);

    // 2. Listen for clicks
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.classList.contains('theme-dark') ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('theme-dark');
    } else {
        document.documentElement.classList.remove('theme-dark');
    }
    localStorage.setItem('theme', theme);
}