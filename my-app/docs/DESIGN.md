# 产品与架构设计文档 (PRD & Design)

> 最后更新：2026-04-24

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
  - [x] 敲击间隔滑块（静态 UI）
  - [x] 间隔偏差程度滑块（静态 UI）
  - [x] 音色网格（00–12，锁定 BUY 角标）
  - [x] 链接与操作列表
  - [x] 二进制代码后缀开关
- [ ] 粒子飘字动画层
- [ ] 触觉震动 (expo-haptics)
- [ ] 音频播放 (expo-av)

---

## 一、 1:1 复刻拆解（Phase 1）

### 1. 核心视觉与布局 (Main Screen)
- **纯黑背景** (`#000000`) 沉浸式。
- **正中央交互区**：主物体（木鱼）矢量图。松开为线框，按下为实心填充，并伴随 `0.95` 倍的微缩放效果。
- **顶栏**：右上角设置或模式切换按钮（∞ 符号），以及左上角可能的偏好入口（齿轮）。
- **粒子层 (Overlay)**：点击位置上方生成随手势上浮褪色的文本组件（如：“功德 +1”）。

### 2. 参数与设置面板 (Settings Panel)
- **当前实现**：`SettingsPanel.js` 使用 React Native `Modal`（`animationType="slide"`）实现全屏上推面板。
- **面板模块**：
  1. **自定义文字输入**：顶部 TextInput 框，支持自定义飘字内容。
  2. **自动模式控制组**（静态 UI，逻辑 Phase 2 接入）：
     - 滑动条 1：敲击间隔 (例如 0.1s - 2.0s)。
     - 滑动条 2：间隔偏差程度 (例如 0% - 10%)。
  3. **音色矩阵 (Grid)**：
     - 00 到 12 的网格选择器，`selectedSound` 本地 state 控制选中态（白色描边）。
     - 锁定状态 UI：未解锁音色右上角带绿色 `BUY` 角标。
  4. **扩展列表 (List)**：联系作者、发表评论、分享App、购买、作者的其他app（橙褐色高亮行）、历史记录。
  5. **特殊开关**：在悬浮文字后面显示绿色二进制代码（Switch 组件，本地 state）。

### 3. 系统级能力 (System Capabilities)
- **触觉震动 (Haptics)**：每一次主动/自动敲击，必须调用轻量及无延迟震动反馈 (`expo-haptics`)。
- **音频持留 (Audio Pool)**：使用 `expo-av` 缓存音色，必须支持打断式重播或多实例并发，防止“狂点吞音”。
- **屏幕常亮 (Keep-awake)**：自动模式开启并处于前台时，调用 `expo-keep-awake` 阻止手机息屏。

---

## 二、 核心数据模型 (Zustand Store)

```typescript
interface AppState {
  // 核心偏好
  floatingText: string;            // 悬浮文字 (默认: 功德 + 1)
  appendBinary: boolean;           // 是否追加二进制 (默认: false)
  selectedSoundId: string;         // 当前音色 (默认: '00')
  
  // 自动化引擎配置
  isAutoMode: boolean;             // 是否开启自动敲击
  autoInterval: number;            // 基础敲击间隔 (ms)
  autoDeviation: number;           // 偏差百分比 (0-1)
  
  // 购买与解锁状态
  unlockedSounds: string[];        // 已解锁的音色ID列表 (如 ['00', '01'])
  
  // Actions
  setFloatingText: (text: string) => void;
  setSelectedSoundId: (id: string) => void;
  setAutoInterval: (ms: number) => void;
  setAutoDeviation: (pct: number) => void;
  toggleAutoMode: () => void;
  toggleAppendBinary: () => void;
}
```

---

## 三、 目录结构

```
my-app/
├── App.js                         # 根组件，持有 settingsVisible state
├── index.js                       # Expo 入口
├── app.json                       # Expo 配置
├── docs/
│   ├── DESIGN.md                  # PRD & 架构设计（本文件）
│   ├── COMPONENTS.md              # 组件 API 文档
│   └── ROADMAP.md                 # 开发路线图
└── src/
    └── components/
        ├── WoodenFish.js          # 木鱼主交互组件
        └── SettingsPanel.js       # 设置面板（Modal）
```
