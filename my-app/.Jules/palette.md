
## 2025-07-12 - Tactile Feedback and Accessibility State for Toggleable Cards
**Learning:** In React Native, toggleable `Pressable` cards (like grids for environment sounds or instruments) require explicit `accessibilityState={{ selected: boolean }}` alongside physical tactile feedback (scale/opacity) so screen readers can properly announce their selection status.
**Action:** Always combine the `style={({ pressed }) => [...]}` feedback pattern with `accessibilityRole="button"` and `accessibilityState={{ selected: isSelected }}` on custom selectable cards.
