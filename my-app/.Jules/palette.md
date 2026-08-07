## 2025-08-07 - Accessible Sound Selection Cover Flow
**Learning:** React Native's `Pressable` component handles interaction blocking natively via the `disabled={boolean}` prop. Relying on a manual check within the `onPress` callback fails to provide correct semantics to assistive tech and risks edge-case touch event firing.
**Action:** Always map disabled states explicitly via the `disabled` prop and pair with `accessibilityState={{ disabled: boolean }}` and an explicit `accessibilityRole` to ensure screen readers announce the state change.
