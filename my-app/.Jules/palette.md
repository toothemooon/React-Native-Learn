
## 2024-05-20 - Adding Accessibility and Tactile Feedback to Custom Cards
**Learning:** React Native's `Pressable` component doesn't inherently provide visual feedback or screen reader semantics. Custom card components used as buttons must explicitly implement tactile feedback (via `style={({ pressed }) => [...]}`) and accessibility props (`accessibilityRole="button"`, `accessibilityState={{ selected: ... }}`).
**Action:** Always verify that custom interactive elements acting as buttons have proper visual feedback and ARIA-equivalent props assigned. Ensure stateful selections update `accessibilityState` to properly announce status to screen readers.
