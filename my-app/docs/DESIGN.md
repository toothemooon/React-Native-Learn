# 产品与架构设计文档 (PRD & Design)

> 最后更新：2026-04-30

## 核心策略

| 阶段 | 状态 | 目标 |
|------|------|------|
| **Phase 1: 核心 UI 与状态层** | 🟡 进行中 | 1:1 像素级复刻视觉、设置面板，搭建全局状态管理(Zustand)与本地持久化(AsyncStorage) |
| **Phase 2: 视·听·触反馈闭环** | ⬜ 未开始 | 完成敲击反馈循环(震动、音频)、悬浮粒子动画、自动化引擎配置 |
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
- [ ] **状态全局化 (Zustand)**
- [ ] **数据持久化 (AsyncStorage)**
- [ ] **真实可拖动滑块 (@react-native-community/slider)**

---

## 一、 1:1 复刻拆解（Phase 1 视觉部分）

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
     - 00 到 12 的网格选择器。
     - 锁定状态 UI：未解锁音色右上角带绿色 `BUY` 角标。

---

## 二、 核心数据模型 (Zustand Store)

> Phase 1 的核心目标之一，构建统一的状态源，避免 Props/State 嵌套过深。

```typescript
interface AppState {
  // === 需要持久化的偏好设置 (AsyncStorage) ===
  floatingText: string;            // 悬浮文字 (如: "功德 +1")
  selectedSoundId: string;         // 当前选中音色 ID
  
  // === 自动化引擎配置 ===
  playMode: 'auto' | 'manual';     // 自动/手动模式
  stopMode: 'never' | 'count' | 'countdown'; // 停止条件
  autoInterval: number;            // 自动敲击基础间隔 (ms)
  
  // === 运行时状态 (不持久化) ===
  isSettingsVisible: boolean;      // 设置面板可见性
  
  // === Actions ===
  setFloatingText: (text: string) => void;
  setSelectedSoundId: (id: string) => void;
  setPlayMode: (mode: 'auto' | 'manual') => void;
  setStopMode: (mode: 'never' | 'count' | 'countdown') => void;
  setAutoInterval: (interval: number) => void;
  setSettingsVisible: (visible: boolean) => void;
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
