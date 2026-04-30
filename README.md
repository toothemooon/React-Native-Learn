# React Native Learn

使用 React Native + Expo 学习移动端开发的实践仓库。当前项目：**WoodenFish (电子木鱼) - 正念冥想平台**。

---

## 项目：WoodenFish (电子木鱼)

本项目已经从早期的“单页面解压小工具”全面战略升维，目标是打造一个基于 **Dark Zen (暗黑禅意)** 视觉风格、采用 **Library & Player (货架与播放器) 分离**架构的平台级正念冥想生态应用（参考 Calm / Spotify）。

### 产品愿景与特色

- **Dark Zen 极致美学**：摒弃冰冷的工具风，采用深空灰、暗夜绿等有温度的暗色系，配合微弱毛玻璃与动态光影，营造深邃的冥想空间。
- **全屏沉浸播放器 (Global Modal Player)**：木鱼敲击、白噪音引擎等核心体验运行在全局最高层级的 Z-Index Modal 中，确保绝对纯粹的无干扰沉浸。
- **物理级感官反馈**：SVG 径向渐变模拟 3D 质感，Animated 水波纹配合真实震动，还原数字法器的敲击体验。
- **双引擎配置中心**：法器配置 (Bento Box 调音台) 与全局系统设置严格物理隔离，保障“禅境”不被冰冷的底层代码逻辑破坏。

### 当前进度

- **Phase 1（打磨极简引擎）**: ✅ 即将完成。3D 质感 SVG 木鱼、全套 Bento Box 调音台交互、双分离系统设置页均已完工。
- **Phase 2（平台化架构重构）**: ⏳ 待启动。即将引入 `React Navigation`，搭建底层四向 Bottom Tabs，并将当前主页彻底封装为全局浮动播放器。

### 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React Native 0.81 + Expo SDK 54 |
| 语言 | TypeScript |
| 包管理 | Bun |
| 路由/状态 | 组件本地 state（Phase 2 将引入 React Navigation 与 Zustand） |
| UI/动效 | react-native-svg, Animated (RN 原生) |
| 运行时 | Expo Go |

### 快速开始

推荐环境：[Bun](https://bun.sh/)

```bash
cd my-app
bun install
bun run start
```

- 手机扫描二维码（需安装 **Expo Go**）
- 按 `i` 打开 iOS 模拟器
- 按 `a` 打开 Android 模拟器

### 目录结构

```text
my-app/
├── App.tsx                  # 当前根组件 (即将被升级封装为 Player Modal)
├── docs/                    # 核心架构与规划文档 ⭐️
│   ├── DESIGN.md            # 视觉与架构设计规范 (Dark Zen)
│   └── ROADMAP.md           # 演进路线图 (Phase 1 ~ Phase 4)
└── src/
    └── components/
        ├── AppSettings.tsx  # 全屏系统设置页 (脱敏后台)
        ├── SettingsPanel.tsx# 法器配置调音台 (Bento Box)
        └── WoodenFish.tsx   # 核心木鱼交互组件 (SVG)
```

### 文档导航

- [视觉与架构设计规范 (DESIGN)](my-app/docs/DESIGN.md)
- [演进路线图 (ROADMAP)](my-app/docs/ROADMAP.md)
