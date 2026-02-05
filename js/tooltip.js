/**
 * Tooltip System
 * Token-driven, accessible, minimal.
 * Automatically wires all elements with `.tooltip`.
 */

(function () {
  const TOOLTIP_SELECTOR = ".tooltip";
  const VISIBLE_CLASS = "is-visible";

  function showTooltip(trigger, tooltip) {
    tooltip.classList.add(VISIBLE_CLASS);
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
  }

  function hideTooltip(trigger, tooltip) {
    tooltip.classList.remove(VISIBLE_CLASS);
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
  }

  function wireTooltip(trigger) {
    const tooltip = trigger.querySelector(".tooltip-content");
    if (!tooltip) return;

    // Ensure ARIA compliance
    const id = tooltip.id || `tooltip-${Math.random().toString(36).slice(2)}`;
    tooltip.id = id;
    trigger.setAttribute("aria-describedby", id);
    tooltip.setAttribute("role", "tooltip");

    // Hover
    trigger.addEventListener("mouseenter", () => showTooltip(trigger, tooltip));
    trigger.addEventListener("mouseleave", () => hideTooltip(trigger, tooltip));

    // Focus (keyboard)
    trigger.addEventListener("focus", () => showTooltip(trigger, tooltip));
    trigger.addEventListener("blur", () => hideTooltip(trigger, tooltip));

    // Touch (mobile)
    trigger.addEventListener("touchstart", () => {
      showTooltip(trigger, tooltip);
      setTimeout(() => hideTooltip(trigger, tooltip), 2000);
    });
  }

  function initTooltips() {
    document.querySelectorAll(TOOLTIP_SELECTOR).forEach(wireTooltip);
  }

  // Initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTooltips);
  } else {
    initTooltips();
  }
})();
