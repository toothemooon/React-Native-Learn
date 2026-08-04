
## 2024-08-04 - React Native Pressable Style Array Fallbacks
**Learning:** When transitioning a React Native `Pressable` component's `style` prop from a static array to a dynamic function `({ pressed }) => [...]` for tactile feedback, ensure that conditional styling statements in the array return `false` or `undefined` rather than complex boolean evaluations, as React Native gracefully ignores falsy values in style arrays.
**Action:** When adding tactile feedback to existing components, confidently convert `style={[...]}` to `style={({ pressed }) => [...]}` while retaining the existing conditional style expressions inline.
