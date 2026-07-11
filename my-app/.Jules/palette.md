
## 2024-07-11 - Tactile Feedback and Selection States in React Native Grid Components
**Learning:** React Native's `Pressable` components in grid layouts (like environmental sounds and instruments) lack native visual feedback and semantic state. Without explicit attributes, screen readers cannot determine which item in a grid is currently active, and users don't get physical affirmation when selecting an item.
**Action:** Consistently apply `accessibilityRole="button"`, `accessibilityState={{ selected: boolean }}`, and tactile feedback (`style={({ pressed }) => [...]}`) using scale and opacity transformations to interactive grid cards.
