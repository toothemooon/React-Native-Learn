
## 2026-05-25 - Tactile Feedback for React Native Pressables
**Learning:** React Native's `Pressable` components do not provide native visual feedback or accessibility states by default, which degrades user experience on interactive cards.
**Action:** Standardized custom cards to use the `style={({ pressed }) => [...var_styles, { opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] }]}` pattern along with explicit `accessibilityRole`, `accessibilityLabel`, and `accessibilityState={{ selected: boolean }}`.
