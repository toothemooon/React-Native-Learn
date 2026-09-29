
## 2026-09-29 - Tactile Feedback and Accessibility State for Pressable Cards
**Learning:** When building grid-based selectable cards in React Native, users relying on screen readers need explicit feedback on selection state, and sighted users need visual confirmation of interaction. `Pressable` components natively lack both.
**Action:** Always provide `accessibilityState={{ selected: boolean }}` alongside `accessibilityRole="button"` for selectable cards, and implement tactile visual feedback (e.g., scale down slightly and adjust opacity) using the `style={({ pressed }) => [...]}` pattern.
