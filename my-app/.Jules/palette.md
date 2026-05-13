## 2026-05-13 - Tactile Feedback for Pressable Components
**Learning:** In React Native, the `Pressable` component provides no default visual or tactile feedback when interacted with. This was widely seen in the codebase and negatively impacts UX by leaving users uncertain if their press was registered.
**Action:** Use the `style={({ pressed }) => [...]}` pattern to provide dynamic visual feedback (e.g., opacity and scale reductions) on `Pressable` cards and ensure all interactive elements receive appropriate `accessibilityRole`, `accessibilityLabel`, and `accessibilityHint`.
