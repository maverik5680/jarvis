import { SELECTORS, BREAKPOINTS } from '../core/constants.js';

/**
 * SIDEBAR TOGGLE
 * Simple vanilla JavaScript for mobile menu toggle
 * Production-ready with accessibility considerations
 */

/**
 * Initialize sidebar toggle functionality
 * Handles hamburger menu, backdrop, and keyboard navigation
 */
export function initSidebarToggle() {
  const menuBtn = document.querySelector(SELECTORS.MENU_BTN);
  const sidebar = document.querySelector(SELECTORS.SIDEBAR) || document.querySelector(SELECTORS.SIDEBAR_NAV);
  const backdrop = document.querySelector(SELECTORS.BACKDROP) || document.querySelector(SELECTORS.SIDEBAR_BACKDROP);
  const body = document.body;

  // Exit if required elements don't exist
  if (!menuBtn || !sidebar) {
    console.warn('Sidebar toggle: Required elements not found');
    return;
  }

  /**
   * Toggle sidebar open/closed state
   */
  function toggleSidebar() {
    const isOpen = sidebar.classList.contains('is-open');

    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  /**
   * Open the sidebar
   */
  function openSidebar() {
    // Add open class to sidebar
    sidebar.classList.add('is-open');

    // Activate backdrop if it exists
    if (backdrop) {
      backdrop.classList.add('is-active');
    }

    // Add active state to menu button
    menuBtn.classList.add('is-active');

    // Prevent body scroll on mobile
    body.classList.add('sidebar-open');

    // Update button text
    menuBtn.textContent = 'Close';

    // Update ARIA attribute
    menuBtn.setAttribute('aria-expanded', 'true');

    // Set focus to first focusable element in sidebar
    const firstLink = sidebar.querySelector('a, button, details summary');
    if (firstLink) {
      firstLink.focus();
    }
  }

  /**
   * Close the sidebar
   */
  function closeSidebar() {
    // Remove open class from sidebar
    sidebar.classList.remove('is-open');

    // Deactivate backdrop if it exists
    if (backdrop) {
      backdrop.classList.remove('is-active');
    }

    // Remove active state from menu button
    menuBtn.classList.remove('is-active');

    // Restore body scroll
    body.classList.remove('sidebar-open');

    // Update button text
    menuBtn.textContent = 'Menu';

    // Update ARIA attribute
    menuBtn.setAttribute('aria-expanded', 'false');

    // Return focus to menu button
    menuBtn.focus();
  }

  /**
   * Handle escape key to close sidebar
   */
  function handleEscapeKey(event) {
    if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeSidebar();
    }
  }

  // Event Listeners

  // Menu button click
  menuBtn.addEventListener('click', toggleSidebar);

  // Backdrop click to close
  if (backdrop) {
    backdrop.addEventListener('click', closeSidebar);
  }

  // Escape key to close
  document.addEventListener('keydown', handleEscapeKey);

  // Initialize ARIA attribute
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-controls', sidebar.id || 'mainSidebar');

  // Close sidebar on window resize to desktop size
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Close sidebar if window is resized to desktop size
      if (window.innerWidth >= BREAKPOINTS.DESKTOP && sidebar.classList.contains('is-open')) {
        closeSidebar();
      }
    }, 250);
  });

  console.log('Sidebar toggle initialized');
}
