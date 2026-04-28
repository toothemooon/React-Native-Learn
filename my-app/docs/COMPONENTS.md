# 组件 API 文档

> 最后更新：2026-04-28

---

## WoodenFish

**路径**：`src/components/WoodenFish.tsx`

木鱼主交互组件，负责渲染矢量图形并响应按压手势。

### Props

无（当前为独立组件，状态全部内聚）

### 内部 State

| 状态 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `isPressed` | `boolean` | `false` | 是否处于按压状态 |

### 行为

- **按下 (`onPressIn`)**：`isPressed = true`，木鱼填充色切换为 `#FFFFFF`，整体缩放至 `0.95`
- **松开 (`onPressOut`)**：`isPressed = false`，木鱼填充色恢复 `#3A3A3C`，缩放恢复 `1.0`
- 缩放动画通过 `Pressable` 的 `style` 回调 + `transform` 实现。

---

## SettingsPanel

**路径**：`src/components/SettingsPanel.tsx`

设置面板组件，以 `Modal` 全屏展示所有偏好配置 UI。

### Props

| Prop | 类型 | 必填 | 说明 |
|------|------|------|------|
| `visible` | `boolean` | ✅ | 控制 Modal 显示/隐藏 |
| `onClose` | `() => void` | ✅ | 点击 ✕ 按钮时的回调 |

### 关键类型定义

```typescript
type PlayMode = 'auto' | 'manual';
type StopMode = 'never' | 'count' | 'countdown';

type SoundItem = {
  id: string;
  locked: boolean;
  bold?: boolean;
};
```

### 内部 State

| 状态 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `selectedSound` | `string` | `'00'` | 当前选中的音色 ID |
| `playMode` | `PlayMode` | `'auto'` | 播放模式（自动/手敲） |
| `stopMode` | `StopMode` | `'never'` | 停止模式（永不/计数/倒计时） |
| `selectedCountdown` | `string` | `'5 min'` | 选中的倒计时时长 |
| `selectedCount` | `string` | `'100'` | 选中的停止计数 |

### 待扩展（Phase 2）

- 滑块接入真实 `@react-native-community/slider` 组件并双向绑定 Zustand store
- `onClose` 时将本地 state 同步写入全局 store
- 购买/解锁流程对接 IAP
