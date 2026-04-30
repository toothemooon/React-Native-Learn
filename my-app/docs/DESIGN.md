# 产品与架构设计文档 (PRD & Design)

> 最后更新：2026-04-30

## 核心策略：从“工具”转向“意境”

为摆脱竞品同质化，项目分为四个阶段推进，注重阶段性 ROI（投资回报率）与成功指标的衡量。

| 阶段 | 状态 | 目标 | 核心指标 |
|------|------|------|----------|
| **Phase 1: 核心 UI 与状态层** | 🟡 进行中 | 搭建基础框架与 UI 质感，适时止损防止无限打磨，完成 Zustand 状态管理 | 60 FPS 基线，无 UI 阻塞 |
| **Phase 2: 反馈闭环与商业化**| ⬜ 未开始 | 跑通高响应的触觉/音频闭环、叠加白噪音，并验证 IAP 内购全链路 | 延迟 < 50ms，IAP 沙盒跑通 |
| **Phase 3: 意境化与高级交互**| ⬜ 未开始 | 包浆成长机制、音色收集系统、复杂物理手势探索以及 Apple Health 联动 | 单次正念时长提升，功能性评价达标 |
| **Phase 4: 云禅房 (独立立项)**| ⬜ 未开始 | 需要后端基建支持的 WebSocket 全球敲击波纹实时同步功能 | 服务端并发承载力，弱社交留存 |

### Phase 1 核心 UI 与视觉精雕
- [x] 纯黑背景主界面布局、木鱼矢量图、基础按压动画
- [x] 设置面板 UI（文字输入、播放/停止模式、音色网格）
- [ ] **UI 质感升级**：引入 `expo-blur` 毛玻璃效果，优化排版体系；通过 SVG `RadialGradient` 提升木鱼图形的三维光影反馈；加入水波纹微交互。
- [ ] **真实可拖动滑块 (@react-native-community/slider)** 极简样式定制
- [ ] **状态全局化 (Zustand)** 与 **数据持久化 (AsyncStorage)**

---

## 一、 核心差异化设计 (Phase 2 & Phase 3)

### 1. 交互维度突破：物理真实感
- **基础体验**：极致低延迟的触控震动与空间音频叠加白噪音。
- **高阶手势 (低优先级探索)**：除了单击，未来视需求引入“长按”（模拟快速诵经加速）、“绕边缘滑动”（模拟颂钵的低频嗡鸣）以及利用加速度计的“重力摇晃感应”。

### 2. 视觉与叙事：意境与成长
- **动态环境**：使用轻量级的 Lottie 或 Reanimated 渲染烟雾、雨夜等意境背景。如后期对性能与极致效果有追求，再考虑平替为 Skia Shader。
- **材质差异**：木鱼、金属钵、玉石、赛博机械，不同材质对应专属的物理反馈动画与震动频率。
- **视觉包浆系统**：打破传统的“功德+1”文字，敲击达到阈值后，本体颜色和光泽产生微妙变幻，提供长期正向情绪价值。

### 3. 生态打通：社交、收集与健康
- **收集系统与商业化 (IAP)**：将音色转化为收集品，部分隐藏音色通过节日或敲击成就解锁；而高级音色库、特殊材质皮肤则直接与 StoreKit/Google Play IAP 系统挂钩，打造清晰的商业闭环。
- **健康联动**：将用户敲击木鱼的投入时间转化为“正念/冥想分钟数”同步至系统健康 App，提升产品的工具价值与过审成功率。
- **全球共振 (独立 Phase 4)**：由于涉及服务端基建，作为 Phase 4 单独迭代，通过微秒级 WebSocket 数据展现其他用户的“敲击波纹”，带来“众生皆在”的宏大孤独与共鸣。
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
  unlockedSounds: string[];        // 收集系统：已解锁的音效ID数组
  
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
