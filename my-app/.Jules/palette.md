
## 2026-05-30 - Added Missing Accessibility and Tactile Feedback to HomeScreen Pressables
**Learning:** In React Native, custom selection elements like grid cards using `Pressable` natively lack screen reader selection announcements and visual tap feedback. Explicitly providing `accessibilityRole="button"` and `accessibilityState={{ selected: boolean }}` ensures assistive technologies properly announce the component's state, while `style={({ pressed }) => [...]}` provides crucial visual acknowledgment of user interactions.
**Action:** Add these accessibility properties and interaction styles universally when creating custom buttons or selection cards with `Pressable`.
