## 2024-05-01 - Accessible Icon Buttons and Touch Targets
**Learning:** In React Native, `Pressable` components that only contain icons (like back buttons, settings gears, etc.) are completely opaque to screen readers by default. Screen reader users will simply hear "button" (if lucky) or just nothing. Furthermore, small icons without a `hitSlop` present a physical accessibility challenge for users with motor impairments or fat-finger errors on mobile devices.
**Action:** Always add `accessibilityRole="button"` and a descriptive `accessibilityLabel` to icon-only `Pressable` components. Always provide a generous `hitSlop` (e.g., `hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}`) to expand the touch target area without affecting the visual layout.
## 2026-05-17 - Accessible Pressable Hero Cards
**Learning:** Large interactive cards often lack proper semantics and visual feedback in React Native, leading to an unresponsive feel and poor screen reader experience.
**Action:** Always wrap large cards in `Pressable` with a tactile feedback style (opacity + scale down) and include `accessibilityRole="button"` with descriptive labels/hints.
