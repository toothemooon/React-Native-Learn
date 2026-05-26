
## 2026-05-26 - Tactile Feedback for React Native Pressables
**Learning:** In React Native, `Pressable` components do not provide native visual feedback by default. Using static style arrays leaves them feeling dead. Furthermore, failing to explicitly set `accessibilityRole="button"` and `accessibilityState={{ selected: isSelected }}` makes the app hostile to screen readers.
**Action:** Use the `style={({ pressed }) => [...styles, { opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] }]}` functional pattern for all custom cards/buttons to instantly improve tactile UX, and systematically append explicit a11y roles and labels to improve inclusiveness.
