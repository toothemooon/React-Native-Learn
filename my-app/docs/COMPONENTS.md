# 组件 API 文档

> 最后更新：2026-04-24

---

## WoodenFish

**路径**：`src/components/WoodenFish.js`

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
- 缩放动画通过 `Pressable` 的 `style` 回调 + `transform` 实现（无额外动画库）

### 待扩展（Phase 2）

- `onTap` 回调 prop，触发飘字粒子 + 触觉震动 + 音频播放
- 接入 Zustand store 读取音色配置

---

## SettingsPanel

**路径**：`src/components/SettingsPanel.js`

设置面板组件，以 `Modal` 全屏展示所有偏好配置 UI。

### Props

| Prop | 类型 | 必填 | 说明 |
|------|------|------|------|
| `visible` | `boolean` | ✅ | 控制 Modal 显示/隐藏 |
| `onClose` | `() => void` | ✅ | 点击 ✕ 按钮时的回调 |

### 内部 State

| 状态 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `selectedSound` | `string` | `'00'` | 当前选中的音色 ID |
| `binarySwitch` | `boolean` | `false` | 是否显示绿色二进制代码后缀 |

### 子区域结构

```
SettingsPanel (Modal)
├── topBar              ∞ 标识
└── panel (卡片)
    ├── headerRow       ✕ 关闭 + 悬浮文字 TextInput
    └── ScrollView
        ├── sliderBlock  敲击间隔（静态）
        ├── sliderBlock  间隔偏差程度（静态）
        ├── soundBlock   音色网格 (00–12)
        ├── linksSection 操作列表 + Switch
        └── footer       版权信息
```

### 音色数据

```js
// locked: true 的音色显示 BUY 角标，点击无效
const SOUNDS = [
  { id: '00', locked: false },
  ...
  { id: '06', locked: true },
  ...
  { id: '12', locked: true, bold: true },
];
```

### 待扩展（Phase 2）

- 滑块接入真实 `Slider` 组件并双向绑定 Zustand store
- `onClose` 时将本地 state 同步写入全局 store
- 购买/解锁流程对接 IAP
