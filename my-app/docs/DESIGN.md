# 产品与架构设计文档 (PRD & Design)

> 最后更新：2026-04-30

## 核心策略：从“工具”转向“意境”

为摆脱竞品同质化，项目将在 Phase 1 强化 UI 质感，在 Phase 2 和 Phase 3 从**交互维度、视觉叙事、功能生态**三个方向进行突破。

| 阶段 | 状态 | 目标 |
|------|------|------|
| **Phase 1: 核心 UI 与状态层** | 🟡 进行中 | 搭建基础框架，打磨极致 UI 质感与微交互，随后完成全局状态管理(Zustand) |
| **Phase 2: 反馈闭环与深度交互**| ⬜ 未开始 | 实现多维物理交互（长按连击、滑动摩擦、摇晃重力），融合白噪音，建立沉浸听觉/触觉闭环 |
| **Phase 3: 意境化与生态打通**  | ⬜ 未开始 | 引入动态材质与背景（Skia Shader）、包浆成长机制、收集系统、Apple Health 联动与云端共振 |

### Phase 1 核心 UI 与视觉精雕
- [x] 纯黑背景主界面布局、木鱼矢量图、基础按压动画
- [x] 设置面板 UI（文字输入、播放/停止模式、音色网格）
- [ ] **UI 质感升级**：引入 `expo-blur` 毛玻璃效果，优化排版体系；通过 SVG `RadialGradient` 提升木鱼图形的三维光影反馈；加入水波纹微交互。
- [ ] **真实可拖动滑块 (@react-native-community/slider)** 极简样式定制
- [ ] **状态全局化 (Zustand)** 与 **数据持久化 (AsyncStorage)**

---

## 一、 核心差异化设计 (Phase 2 & Phase 3)

### 1. 交互维度突破：物理真实感
- **多端手势**：除了单击，引入“长按”（模拟快速诵经加速）与“绕边缘滑动”（模拟颂钵的低频嗡鸣）。
- **重力感应**：利用加速度计，摇晃手机时触发木槌与腔体的碰撞音效，增加零碎的真实感。
- **白噪音融合**：不再只有干巴的敲击声，支持叠加环境音（如：雨夜、篝火、山谷）。

### 2. 视觉与叙事：意境与成长
- **动态环境 (Shader)**：摒弃死板的纯黑，通过 `react-native-skia` 引入高性能流体烟雾、雨滴等动态极简背景。
- **材质差异**：木鱼、金属钵、玉石、赛博机械，不同材质对应专属的物理反馈动画与震动频率。
- **视觉包浆系统**：打破传统的“功德+1”文字，敲击达到阈值后，本体颜色和光泽产生微妙变幻（如材质逐渐变得温润透亮），提供长期正向情绪价值。

### 3. 生态打通：社交、收集与健康
- **收集系统**：将音色转化为收集品，通过特定节日或累计敲击次数解锁隐藏音效（例如：猫咪叫声、水滴声、电子 8-bit）。
- **健康联动**：将用户敲击木鱼的投入时间转化为“正念/冥想分钟数”同步至系统健康 App，提升产品的工具价值与过审成功率。
- **全球共振 (云禅房)**：通过微秒级 WebSocket 数据，展现其他用户的“敲击波纹”，带来“众生皆在”的宏大孤独与共鸣。
- **桌面扩展**：增加 Widget 小组件与锁屏 Live Activity 支持。

---

## 二、 核心数据模型 (Zustand Store 扩展设想)

```typescript
interface AppState {
  // 基础偏好
  floatingText: string;
  selectedSoundId: string;
  selectedMaterial: 'wood' | 'metal' | 'jade' | 'cyber'; // 材质皮肤
  backgroundEnv: 'none' | 'rain' | 'smoke';             // 动态环境
  
  // 自动化与混音
  playMode: 'auto' | 'manual';
  autoInterval: number;
  whiteNoiseVolume: number;        // 白噪音音量
  
  // 成长与数据
  totalTaps: number;               // 历史总敲击次数（用于计算“包浆”等级）
  mindfulnessMinutes: number;      // 累计正念时长
  unlockedSounds: string[];        // 收集系统：已解锁的隐藏音效ID数组
  
  // Actions...
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
        ├── WoodenFish.tsx         # 木鱼主交互组件
        └── SettingsPanel.tsx      # 设置面板
```
