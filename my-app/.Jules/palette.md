
## 2024-07-23 - Tactile Feedback and Accessibility State for React Native Cards
**Learning:** In React Native, `Pressable` components used as grid items or cards do not provide built-in visual feedback or announce selection states by default. This makes interactive lists feel unresponsive and causes screen readers to miss which item is currently selected.
**Action:** When implementing custom UI cards with toggleable or selectable states, explicitly set `accessibilityState={{ selected: boolean }}` and use the `style={({ pressed }) => [...]}` pattern to add tactile feedback (e.g., scale and opacity changes) for improved responsiveness and accessibility.
