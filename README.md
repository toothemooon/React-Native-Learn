# React Native Learn

使用 React Native + Expo 学习移动端开发的实践仓库。当前项目：**极致解压（木鱼）App 复刻**。

---

## 项目：my-app（木鱼）

一款模仿"极致解压 - 木鱼"的 React Native 应用，分三个阶段从 UI 复刻到逻辑打通再到差异化演进。

### 当前进度

- **Phase 1（UI 复刻）**: 进行中。主界面、木鱼交互、设置面板 UI 已基本完成。
- **TypeScript 迁移**: 已完成。项目已全面启用 TypeScript 强化类型安全。

### 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React Native 0.81 + Expo SDK 54 |
| 语言 | TypeScript |
| 包管理 | Bun |
| 路由/状态 | 组件本地 state（Phase 2 引入 Zustand） |
| 矢量图 | react-native-svg |
| 图标 | @expo/vector-icons (Ionicons) |
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

```
my-app/
├── App.tsx                 # 根组件
├── index.ts                # Expo 入口
├── app.json                # Expo 配置
├── tsconfig.json           # TS 配置
├── docs/
│   ├── DESIGN.md           # PRD & 架构设计
│   ├── COMPONENTS.md       # 组件 API 文档
│   └── ROADMAP.md          # 开发路线图
└── src/
    └── components/
        ├── WoodenFish.tsx   # 木鱼交互组件
        └── SettingsPanel.tsx # 设置面板
```

### 文档

- [设计文档 & PRD](my-app/docs/DESIGN.md)
- [组件 API](my-app/docs/COMPONENTS.md)
- [开发路线图](my-app/docs/ROADMAP.md)
