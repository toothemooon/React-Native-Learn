
## 2026-08-12 - Accessible Grid Cards
**Learning:** When building grid layouts with selectable cards in React Native, `Pressable` needs explicit `accessibilityState={{ selected: boolean }}` for assistive technologies to announce the selection status properly, otherwise it's just announced as a button.
**Action:** Always add `accessibilityState={{ selected: isSelected }}` alongside `accessibilityRole="button"` and `accessibilityLabel` when creating custom toggleable/selectable cards.
