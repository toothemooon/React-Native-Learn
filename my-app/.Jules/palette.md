
## 2024-05-24 - Tactile Feedback and Accessibility for Main CTA Buttons
**Learning:** Native `Pressable` components in React Native lack default visual feedback and can be confusing for screen reader users if they don't have proper roles and labels. The primary Call to Action (CTA) buttons, like "Start Meditation", need clear visual cues when pressed to reassure the user that the action was registered.
**Action:** Always implement a `style={({ pressed }) => [...]}` pattern to add slight scale down (`transform: [{ scale: 0.96 }]`) and opacity reduction (`opacity: 0.8`) on press for large CTA buttons. Additionally, ensure `accessibilityRole="button"`, `accessibilityLabel`, and `accessibilityHint` are provided to make the button's purpose clear to screen reader users.
