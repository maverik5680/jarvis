# Jarvis Design System — Constitutional Architecture

The Jarvis Design System is built on a strict, law-driven architecture designed for clarity, maintainability, and long-term scalability.  
Every file, token, utility, and component exists within a constitutional hierarchy that prevents entropy and ensures predictable behavior.

This document defines the Laws of Jarvis, the Five-Layer CSS Stack, and the Theme Architecture that governs the entire system.

---

# The Laws of Jarvis

## Law I — Components Contain No Layout
Components define appearance, not placement.

- No margins  
- No padding  
- No grid or flex layout  
- No positioning  
- No spacing decisions  

All layout is handled by utilities or page-level composition.

---

## Law II — Tokens Are the Single Source of Truth
Tokens define the design DNA of the system.

- Colors  
- Spacing  
- Typography  
- Radii  
- Shadows  
- Motion  
- Breakpoints  
- Z-index  
- Containers  

Tokens are never overridden.  
Tokens are never duplicated.  
Tokens are never renamed.  
Tokens are never defined anywhere else.

`tokens.css` is a protected file and may only be modified intentionally by the system architect.

---

## Law III — Utility Supremacy
Utilities are the override engine of the system.

- Atomic  
- Reusable  
- Predictable  
- Composable  
- Stateless  

Utilities override:

1. Global  
2. Components  
3. Page-level CSS  

Utilities never contain semantic meaning.  
Utilities never contain component logic.  
Utilities never rename themselves or drift over time.

---

## Law IV — The Solo-Dev Paradox
The system must remain:

- simple  
- predictable  
- low-maintenance  
- future-proof  

No middle layers.  
No abstractions that pretend to be reusable but are not.  
No hero.css, feature.css, cta.css, or other page-section frameworks.

If it is page-specific, it belongs in the page, not the system.

---

## Law V — Identity Preservation
The design system’s identity must remain stable and untouched.

Identity includes:

- token names  
- token values  
- color palette  
- utility class names  
- component class names  
- naming conventions  
- prefixes  
- file structure  

No AI agent, formatter, or refactor tool may alter these without explicit instruction.

---

## Law VI — All Components Must Be Fully Responsive
Every component must adapt fluidly across all breakpoints.

- No fixed widths  
- No fixed heights  
- No pixel-locked layouts  
- No desktop-only assumptions  
- No rigid spacing that breaks on smaller screens  

Responsiveness is mandatory.

Components must scale using:

- fluid typography  
- fluid spacing  
- percentage or max-width containers  
- responsive utilities  
- breakpoint-aware composition  

If a component renders, it must render correctly at every viewport size.

---

# Theme Architecture

## Dark Theme Is the Default Theme
Jarvis uses a dark-first theme model.

Dark mode is active when no attribute is present:

```html
<html>
```

Light mode activates only when:

```html
<html data-theme="light">
```

Light theme is an override layer, not the base layer.  
No component, utility, or script may assume light mode by default.

---

# The Five-Layer CSS Stack

The Jarvis CSS architecture is built on a strict cascade:

```
1. reset.css        ← browser normalization
2. global.css       ← base element rules
3. tokens.css       ← design DNA
4. utilities.css    ← atomic override engine
5. components.css   ← semantic UI components
6. main.css         ← app entrypoint (imports and transitions)
```

Each layer has a single responsibility.  
No layer may leak into another.

---
