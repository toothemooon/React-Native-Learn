
## 2024-08-02 - Added Accessibility Props to Dynamic Lists
**Learning:** When using `map` to render list items with selectable states in React Native (like the ambient sounds and instruments in `HomeScreen.tsx`), these dynamic custom components lack native accessibility support. While they function visually, they are completely opaque to screen readers without explicit props.
**Action:** Always map the logical state of a component (e.g., `isSelected`) to its semantic equivalent for assistive technologies by explicitly adding `accessibilityState={{ selected: boolean }}` alongside `accessibilityRole="button"` and an appropriate `accessibilityLabel` when rendering custom list items using `Pressable` or `TouchableOpacity`.
