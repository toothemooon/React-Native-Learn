
## 2026-07-20 - Custom Pressable Accessibility States
**Learning:** In React Native, custom UI elements with toggleable, selectable, or locked states (like cards in a grid or gallery) require explicitly setting `accessibilityState={{ selected: boolean, disabled: boolean }}` on the `Pressable` component. Screen readers do not automatically infer these states from custom styles or manual logical checks in the `onPress` handler.
**Action:** Always provide the semantic equivalent `accessibilityState` alongside any visual state changes (like opacity) or functional disablement for custom `Pressable` components.
