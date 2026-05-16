
## 2026-05-16 - Tactile Feedback & Accessibility on Large Cards
**Learning:** Large custom `Pressable` cards in React Native lack native visual feedback, leaving users uncertain if their tap registered. Furthermore, icon-heavy or complex cards without proper accessibility roles and labels create confusion for screen reader users.
**Action:** Always implement the `style={({ pressed }) => [...]}` pattern for tactile feedback (e.g., slight scaling down and opacity reduction) and add `accessibilityRole="button"`, `accessibilityLabel`, and `accessibilityHint` to large interactive cards.
