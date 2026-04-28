# 产品与架构设计文档 (PRD & Design)

> 最后更新：2026-04-28

## 核心策略

| 阶段 | 状态 | 目标 |
|------|------|------|
| **Phase 1: UI 复刻** | 🟡 进行中 | 1:1 像素级照搬现有的极致解压（木鱼）主视觉、设置面板及部分静态 UI |
| **Phase 2: 逻辑打通** | ⬜ 未开始 | 完成核心"视·听·触"反馈循环、悬浮粒子动画、自动化引擎配置及状态全链路对接 |
| **Phase 3: 差异化演进** | ⬜ 未开始 | 修改主题交互、替换视觉元素（如其他减压物品）、增加更多正向情绪机制 |

### Phase 1 完成进度

- [x] 纯黑背景主界面布局
- [x] 顶栏（齿轮图标 + ∞ 模式切换）
- [x] 木鱼矢量图（按下缩放 + 颜色变化）
- [x] 设置面板 UI（Modal 全屏）
  - [x] 悬浮文字输入框
  - [x] 播放模式切换 (Segmented Control)
  - [x] 停止模式配置 (计数/倒计时选择器)
  - [x] 敲击间隔滑块（静态 UI）
  - [x] 音色网格（00–12，锁定 BUY 角标）
  - [x] 链接与操作列表
- [ ] 粒子飘字动画层
- [ ] 触觉震动 (expo-haptics)
- [ ] 音频播放 (expo-av)

---

## 一、 1:1 复刻拆解（Phase 1）

### 1. 核心视觉与布局 (Main Screen)
- **纯黑背景** (`#000000`) 沉浸式。
- **正中央交互区**：主物体（木鱼）矢量图。松开为线框，按下为实心填充，并伴随 `0.95` 倍的微缩放效果。
- **顶栏**：右上角设置或模式切换按钮（∞ 符号）。

### 2. 参数与设置面板 (Settings Panel)
- **当前实现**：`SettingsPanel.tsx` 使用 React Native `Modal` 实现全屏上推面板。
- **面板模块**：
  1. **自定义文字输入**：顶部 TextInput 框，支持自定义飘字内容。
  2. **播放与停止模式**：
     - **播放模式**：支持“自动”与“手敲”切换。
     - **停止模式**：支持“永不”、“计数”与“倒计时”三种逻辑 UI。
  3. **音色矩阵 (Grid)**：
     - 00 到 12 的网格选择器，`selectedSound` 本地 state 控制选中态（白色描边）。
     - 锁定状态 UI：未解锁音色右上角带绿色 `BUY` 角标。

---

## 二、 核心数据模型 (Zustand Store)

> 注：当前仍处于 Phase 1，尚未接入全局 Store，仅作为设计参考。

```typescript
interface AppState {
  // 核心偏好
  floatingText: string;            // 悬浮文字
  selectedSoundId: string;         // 当前音色
  
  // 自动化引擎配置
  playMode: 'auto' | 'manual';
  stopMode: 'never' | 'count' | 'countdown';
  autoInterval: number;            // 基础敲击间隔 (ms)
  
  // Actions
  setFloatingText: (text: string) => void;
  setSelectedSoundId: (id: string) => void;
  setPlayMode: (mode: 'auto' | 'manual') => void;
}
```

---

## 三、 目录结构

```
my-app/
├── App.tsx                        # 根组件
├── index.ts                       # Expo 入口
├── app.json                       # Expo 配置
├── tsconfig.json                  # TS 配置
├── docs/
│   ├── DESIGN.md                  # PRD & 架构设计（本文件）
│   ├── COMPONENTS.md              # 组件 API 文档
│   └── ROADMAP.md                 # 开发路线图
└── src/
    └── components/
        ├── WoodenFish.tsx          # 木鱼主交互组件
        └── SettingsPanel.tsx       # 设置面板（Modal）
```
