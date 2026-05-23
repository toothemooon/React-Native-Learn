
## 2024-05-23 - Icon-Only Button Accessibility and UX
**Learning:** Icon-only buttons (like the send button in chat) often lack semantic meaning for screen readers, and default `Pressable` lacks visual feedback or touch forgiveness, making mobile interaction frustrating.
**Action:** Always add `accessibilityRole="button"`, `accessibilityLabel`, tactile feedback (scale/opacity via `({ pressed }) => [...]`), and expanded touch targets (`hitSlop={10}`) to custom icon-only buttons in React Native.
