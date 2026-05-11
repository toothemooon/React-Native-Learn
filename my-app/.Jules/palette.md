
## 2026-05-11 - Hero Card Accessibility & Tactile Feedback
**Learning:** React Native's `Pressable` components, particularly complex cards like the Daily Zen hero card, require manual tactile feedback (using the `style={({ pressed }) => [...]} pattern`) to feel responsive. Furthermore, large interactive cards often lack proper accessibility labels by default, making them confusing for screen reader users.
**Action:** When implementing custom `Pressable` cards, always inject an opacity/scale press state and explicitly set `accessibilityRole="button"` along with a descriptive `accessibilityLabel` and `accessibilityHint`.
