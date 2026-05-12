
## 2023-10-27 - Large Card Tactile Feedback
**Learning:** Native `Pressable` cards lack visual feedback, making interactive elements like the daily "Hero Card" feel unresponsive to touch, especially for visually impaired users.
**Action:** Always wrap `Pressable` styles in `({ pressed }) => [...]` to apply scale and opacity changes (e.g. `transform: [{ scale: pressed ? 0.98 : 1 }]`), and always include `accessibilityRole`, `accessibilityLabel`, and `accessibilityHint` for large interactive cards.
