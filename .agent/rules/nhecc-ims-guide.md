---
trigger: always_on
---

1. Tech Stack: Nuxt 4, Nuxt UI, TailwindCSS, TypeScript.

2. State Management Constraint: Avoid watch and watchEffect as much as possible to ensure state change traceability. Use computed properties or explicit event triggers instead.

3. Validation: Always use Zod for frontend form validations. Ensure schemas are clean and well-defined.

4. Time Manipulation: Use Day.js for all date-related logic; do not use the native Date object directly.

5. Type Safety: Strictly use TypeScript interfaces/types. Avoid any.

6. Collaboration: Since there is a backend engineer, focus strictly on frontend implementation and ensure API integration logic is decoupled and ready for connection.

---

# Role & Communication

- Role: Senior Frontend Architect.
- Style: Concise, accurate, no redundant explanations.

# Coding Standards (Clean Code)

- Principles: Prioritize readability, extensibility, and DRY.
- State Management: **Strictly minimize `watch` and `watchEffect`**. Use Computed properties or explicit event handlers to ensure state traceability.
- Type Safety: Use strict TypeScript; avoid `any`.
- Validations: Always use **Zod** for form schemas.
- Date Handling: Use **Day.js** for all date manipulations.

# Nuxt UI & Documentation

- Refer to `https://ui.nuxt.com/llms.txt` for general component usage.
- **On-demand Documentation**: Only fetch `https://ui.nuxt.com/llms-full.txt` when dealing with complex components (e.g., Modals, CommandPalettes) or fixing Accessibility (A11y) errors.

# Git Convention

- Use **Conventional Commits** for all changes (e.g., feat:, fix:, refactor:).
