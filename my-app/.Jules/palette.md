
## 2024-05-18 - Selectable Card Accessibility Pattern
**Learning:** In React Native, custom interactive elements acting like tabs or selectable cards (e.g., using `Pressable`) require explicit state declaration. Without `accessibilityState={{ selected: boolean }}`, screen readers announce them only as generic buttons, making it impossible for visually impaired users to know which option is currently active.
**Action:** When implementing custom toggleable or selectable UI patterns, always include `accessibilityState={{ selected: isSelected }}` alongside standard `accessibilityRole="button"` and `accessibilityLabel`. For locked items, include `accessibilityState={{ disabled: isLocked }}` and provide an `accessibilityHint` explaining why it's disabled.
