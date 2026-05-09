## 2024-05-09 - Adding tactile feedback to bare React Native components
**Learning:** React Native's `Pressable` component does not provide default visual feedback. Without applying a `style={({ pressed }) => [...]}` pattern, interactive elements feel dead to the touch, and lack of ARIA roles makes them inaccessible.
**Action:** Established a reusable pattern for all large touch targets (cards, banners) to include `transform: [{ scale: 0.98 }]` and slight opacity changes, paired with explicit `accessibilityRole="button"`, `accessibilityLabel`, and `accessibilityHint`.
