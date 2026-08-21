
## 2026-08-21 - Adding accessibilityState and tactile feedback to Pressable grid selection cards
**Learning:** In React Native, `Pressable` components that act as selection cards or buttons lack native visual feedback and their selection state is not automatically announced by assistive technologies.
**Action:** Use the `style={({ pressed }) => [...]}` pattern to add scaling/opacity for tactile feedback, and explicitly provide `accessibilityRole="button"` and `accessibilityState={{ selected: boolean }}` to improve visual and auditory feedback.
