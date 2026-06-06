
## 2024-05-24 - Tactile Selectable Cards
**Learning:** In React Native, `Pressable` lacks native visual feedback and implicit ARIA state mapping compared to standard HTML buttons. Custom "selectable card" UI elements often visually indicate selection but fail to communicate it to screen readers.
**Action:** When implementing custom grid cards or selectable options using `Pressable`, explicitly pair the visual feedback (e.g., `pressed` scaling via the functional `style` prop) with `accessibilityState={{ selected: boolean }}` and `accessibilityRole="button"` to ensure both sighted users and screen reader users understand the interactive state.
