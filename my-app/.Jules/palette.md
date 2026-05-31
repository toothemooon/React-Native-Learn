
## 2024-05-31 - [Improved Sound Card Feedback & A11y in SettingsPanel]
**Learning:** In React Native, `Pressable` items acting as selectable radio cards frequently lack built-in accessibility roles, states, and visual tactile feedback. Providing visual confirmation during the press interaction increases perceived responsiveness.
**Action:** Always provide the `accessibilityRole="button"`, descriptive `accessibilityLabel`, and `accessibilityState={{ selected, disabled }}`. Furthermore, replace static style arrays with `({ pressed }) => [...]` to attach scale and opacity transforms to simulate physical depth.
