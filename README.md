# React Native Learn

使用 React Native + Expo 学习移动端开发的实践仓库。当前项目：**WoodenFish (电子木鱼) — 正念冥想平台**。

---

## 项目：WoodenFish (电子木鱼)

本项目已完成 Phase 1 全面架构升维，从早期的"单页面解压小工具"重塑为一个基于 **Dark Zen (暗黑禅意)** 视觉风格、采用 **Library & Player (货架与播放器) 分离**架构的平台级正念冥想生态应用（设计参考 Calm / Spotify）。

### 产品愿景与特色

- 🌑 **Dark Zen 极致美学**：深空灰底色 (`#0B0D11`) 配合极细发光边框，引入战略强调色——霓虹薄荷绿 (`#D4FF59`)，以"幽灵发光态 (Ghost Glow)"按钮呈现，避免刺眼的同时保持高辨识度。
- 🏛️ **平台化三向底部导航**：全局底部悬浮 Tab Bar（禅境 / 境界 / 我的），实现类 Calm 的平台级内容生态入口。
- 🎯 **同心圆沉浸播放器 (Global Modal Player)**：木鱼敲击体验封装于全局最高层级 `presentation: 'modal'` 中，上拉进入沉浸，下滑收起。关闭后 HomeScreen 柔和淡出，顺理成章引导至境界页。
- 🤖 **AI 禅师寄语板 (Premium 核心高地)**：境界页新增 AI Zen Master 今日定制寄语（3-4 行极细灰度文字），非 Pro 用户以 `expo-blur` 玻璃拟态模糊锁定。核心付费价值展示页。
- 👑 **Pro 身份与商业合规闭环**：我的页身份卡片下方置入 Zen Pro 会员状态卡（试用状态+恢复购买按钮），满足 App Store 硬性合规要求。隐去顶部 icon 与修行足迹（代码保留）。
- ⚙️ **极简设置入口**：我的页保留 "App 设置" 入口卡片，点击滚动呼出系统设置 Modal（震动、Apple Health、法律协议）。

### 当前进度

| 阶段 | 状态 | 说明 |
|------|------|------|
| **Phase 1：架构重组** | ✅ 已完成 | React Navigation、Bottom Tabs、Player Modal、信息架构重组（三页闭环：身体层→精神层→身份层）已全部落地 |
| **Phase 2：感官闭环** | 🟡 即将启动 | expo-av 音频引擎、expo-haptics 触觉、Skia 材质渲染 |
| **Phase 3：生态构建** | ⏳ 待规划 | Zustand Persist、Apple Health、包浆养成系统 |
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
cd my-app
bun install
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
    │   ├── HomeScreen.tsx        # 禅境首页：问候语 + 唯一 Hero 卡片（1.0 极简入口，砍去近期修行区）
    │   ├── JourneyScreen.tsx     # 境界页：SVG 呼吸人像 + AI Zen Master 今日寄语 + 核心统计（Premium 核心页）
    │   ├── PlayerScreen.tsx      # 全屏沉浸播放器（核心木鱼 + 计数，1.0 极简版）
    │   └── ProfileScreen.tsx     # 个人资料：身份卡片 + Zen Pro 会员状态卡 + App 设置
    └── components/
        ├── WoodenFish.tsx        # 核心木鱼交互组件 (SVG + Animated)
        ├── SettingsPanel.tsx     # 法器调音台 (Bento Box，仅沉浸态呼出)
        ├── AppSettings.tsx       # 全屏系统设置页 (Profile 内嵌，Modal 呼出)
```

### 文档导航

- [视觉与架构设计规范 (DESIGN)](my-app/docs/DESIGN.md)
- [演进路线图 (ROADMAP)](my-app/docs/ROADMAP.md)
- [组件 API 文档 (COMPONENTS)](my-app/docs/COMPONENTS.md)
