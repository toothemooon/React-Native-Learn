# React Native Learn

使用 React Native + Expo 学习移动端开发的实践仓库。当前项目：**WoodenFish (电子木鱼) — 正念冥想平台**。

---

## 项目：WoodenFish (电子木鱼)

本项目已完成 Phase 1 全面架构升维与高保真 UI 重构，从早期的"单页面解压小工具"重塑为一个基于 **Dark Zen (暗黑禅意)** 视觉风格、采用 **Library & Player (货架与播放器) 分离**架构的平台级正念冥想生态应用（设计参考 Calm / Spotify）。

### 产品愿景与特色

- 🌑 **Dark Zen 极致美学**：深空灰底色 (`#0B0D11`) 配合极细发光边框，引入战略强调色——霓虹薄荷绿 (`#D4FF59`)，以"幽灵发光态 (Ghost Glow)"按钮呈现，避免刺眼的同时保持高辨识度。
- 🏛️ **平台化三向底部导航**：全局悬浮式 Bottom Tab Bar（**禅修 / 木鱼 / 禅师**），实现高内聚的内容生态入口。
- 🎯 **同心圆沉浸播放器 (Global Modal Player)**：木鱼敲击体验封装于全局最高层级 `presentation: 'modal'` 中，上拉进入沉浸，下滑收起。
- 🎵 **环境音与法器调试台 (左页 — 禅修)**：提供 2x3 环境音选择网格（夏日雨声、深山林间等）与 1x3 核心法器选择栏。点击切换可触发高亮发光边框交互，点击底置 Ghost Glow 按钮即可一键开始沉浸禅修。
- 💬 **AI 禅师交互聊天室 (右页 — 禅师)**：重构了高保真的聊天对话界面。包含精致的禅师圆角头像，气泡对话流（禅师气泡左侧带有极细的霓虹薄荷绿装饰条），支持动态对话滚动，且内置 1000ms 智能禅修智慧答复模拟器。

### 当前进度

| 阶段 | 状态 | 说明 |
|------|------|------|
| **Phase 1：架构与高保真 UI** | ✅ 已完成 | Tab 路由重组、左页调试台、中页呼吸人像、右页 AI 禅师聊天交互、沉浸播放器全部高保真落地 |
| **Phase 2：感官闭环** | 🟡 即将启动 | expo-av 听觉引擎、expo-haptics 触觉、Skia 材质渲染 |
| **Phase 3：生态构建** | ⏳ 待规划 | Zustand Persist、Apple Health 数据同步、包浆养成系统 |
| **Phase 4：商业化** | ⏳ 待规划 | 在线禅房、Zen Pro 订阅、限定内购 (Drop) |

### 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React Native 0.81 + Expo SDK 54 |
| 语言 | TypeScript |
| 包管理 | Bun |
| 路由 | `@react-navigation/native` + `@react-navigation/bottom-tabs` + `@react-navigation/native-stack` |
| 安全区域 | `react-native-safe-area-context` + `SafeAreaProvider` |
| 图标 | `@expo/vector-icons` (Ionicons) |
| 状态 | 组件级 `useState`（Phase 3 将引入 Zustand） |
| UI/动效 | `react-native-svg`, `Animated` (RN 原生) |
| 滑块 | `@react-native-community/slider` |
| 模糊效果 | `expo-blur` |

### 快速开始

推荐环境：[Bun](https://bun.sh/)

```bash
# 进入工程目录
cd my-app
# 安装依赖
bun install
# 启动项目
bun run start
```

- 按 `i` 打开 iOS 模拟器
- 按 `r` 在模拟器中重新载入（Metro 重启后必须执行）
- 手机扫描二维码（需安装 **Expo Go**）

### 目录结构

```text
my-app/
├── App.tsx                       # 根组件，挂载 SafeAreaProvider + NavigationContainer
├── docs/                         # 核心架构与规划文档 ⭐️
│   ├── DESIGN.md                 # 视觉规范、色彩体系、动效语言
│   ├── ROADMAP.md                # 四阶段演进路线图
│   └── COMPONENTS.md             # 组件 API 文档
└── src/
    ├── navigation/
    │   ├── RootNavigator.tsx     # 全局路由：Bottom Tabs + Player Modal Stack
    │   └── types.ts              # 导航类型定义（CompositeNavigationProp）
    ├── screens/
    │   ├── HomeScreen.tsx        # 禅修页（左页）：环境音 2x3 网格 + 法器选择栏 + 开始禅修
    │   ├── JourneyScreen.tsx     # 木鱼页（中页）：SVG 呼吸人像 + 累计数据与连续天数大字
    │   ├── PlayerScreen.tsx      # 全屏沉浸播放器（核心木鱼 + 计数，1.0 极简版）
    │   └── ProfileScreen.tsx     # 禅师页（右页）：AI 禅师聊天会话 + 智能响应气泡交互
    └── components/
        ├── WoodenFish.tsx        # 核心木鱼交互组件 (SVG + Animated)
        ├── SettingsPanel.tsx     # 法器调音台 (Bento Box，仅沉浸态呼出)
        ├── AppSettings.tsx       # 全屏系统设置页 (Profile 内嵌，Modal 呼出，代码保留)
```

### 文档导航

- [视觉与架构设计规范 (DESIGN)](my-app/docs/DESIGN.md)
- [演进路线图 (ROADMAP)](my-app/docs/ROADMAP.md)
- [组件 API 文档 (COMPONENTS)](my-app/docs/COMPONENTS.md)
