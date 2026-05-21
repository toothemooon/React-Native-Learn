# 组件参考手册：WoodenFish

本文档为 **WoodenFish (电子木鱼)** React Native 应用架构、组件和屏幕的技术参考手册。

---

## 1. 架构与导航

应用采用混合嵌套导航结构，将 Stack 堆栈导航器与 Bottom Tab 底部标签导航器相结合。

```
App.tsx (SafeAreaProvider)
 └── NavigationContainer
      └── RootNavigator (Native Stack)
           ├── MainTabs (底部标签导航)
           │    ├── HomeScreen (禅修)
           │    ├── JourneyScreen (木鱼 - 中间页，保持原样)
           │    └── ProfileScreen (禅师)
           │
           └── PlayerModal (PlayerScreen - presentation: 'modal')
```

### 路由配置 (`src/navigation/RootNavigator.tsx`)
*   **BottomTabs**: 绝对定位的底部悬浮导航栏，具有半透明玻璃质感 (`rgba(21, 23, 26, 0.95)`)，选中态使用霓虹薄荷绿 (`#D4FF59`) 高亮。
*   **标签名与图标**：
    *   **禅修 (Tab 1)**：`home` / `home-outline` (主页)
    *   **木鱼 (Tab 2)**：`ellipse` / `ellipse-outline` (象征同心修持环)
    *   **禅师 (Tab 3)**：`chatbubble-ellipses` / `chatbubble-ellipses-outline` (会话聊天)
*   **PlayerModal**: 声明为 `presentation: 'modal'` 并配置从底部滑入的转场，确保最高层级的沉浸。

---

## 2. 核心组件 (`src/components/`)

### `WoodenFish.tsx`
核心木鱼交互组件，使用动态 SVG 和原生高性能动画实现。
*   **Props**:
    *   `onStrike?`: `() => void` — 每次成功敲击木鱼时触发的回调。
*   **状态与动效**:
    *   `isPressed` (`boolean`): 监听按压状态，控制敲击时的微缩放 (`pressed ? 0.96 : 1`) 与 SVG 径向渐变的光影变幻。
    *   `rippleScale`, `rippleOpacity` (`Animated.Value`): 触发 400ms 的并行涟漪扩散动画，最大缩放至 `2.5x` 并逐渐淡出。

### `SettingsPanel.tsx`
法器配置调音台，采用 Bento-Box（便当盒）网格布局。默认隐藏，仅在 `PlayerScreen` 沉浸态中以 Modal 形式呼出。
*   **Props**:
    *   `visible`: `boolean` — 控制调音台 Modal 的显示与隐藏。
    *   `onClose`: `() => void` — 关闭调音台的回调。
*   **核心状态**:
    *   `mantra` (`string`): 祈福铭文内容（如 `"功功德 +1"`）。
    *   `isEditingMantra` (`boolean`): 切换铭文的展示态与 `TextInput` 编辑态。
    *   `autoPlay` (`boolean`): 是否开启自动敲击模式。
    *   `stopMode` (`'never' | 'count' | 'time'`): 禅修结束目标的配置。
    *   `selectedSound` (`string`): 当前选中的木鱼音色 ID。
    *   `intervalVal` (`string`): 自动敲击的频率间隔秒数（UI占位状态）。

### `AppSettings.tsx`
全局系统设置浮层，在 `ProfileScreen` 中以全屏 Modal 形式呼出（代码在项目中保留）。
*   **Props**:
    *   `visible`: `boolean` — 控制设置页 Modal 的显隐。
    *   `onClose`: `() => void` — 点击“完成”关闭设置页的回调。
*   **核心状态**:
    *   `hapticsEnabled` (`boolean`): 是否启用全局物理触觉震动反馈。
    *   `healthSync` (`boolean`): 是否启用 Apple Health 冥想时间同步。

---

## 3. 屏幕组件 (`src/screens/`)

### `HomeScreen.tsx` (禅修)
*   **职责**: 身体层面。提供环境音与法器的多维参数校准界面。
*   **结构**: 
    *   头部段问候语与开启禅修主标题。
    *   **环境音模块**：2x3 按钮网格（夏日雨声、深山林间、溪水流声等），支持 Emoji 图标。
    *   **法器模块**：1x3 选择行（木鱼、颂钵、磬）。
*   **核心状态与交互**：
    *   `selectedSound` (`string`): 当前激活的环境音卡片 ID，选中卡片触发霓虹薄荷绿边框高亮。
    *   `selectedInstrument` (`string`): 当前选中的法器 ID，触发绿色高亮。
    *   **ctaButton**: 点击底置“开始禅修”按钮完美跳转至 `PlayerModal` 沉浸页。

### `JourneyScreen.tsx` (木鱼 - 中间页)
*   **职责**: 精神层面。呈现修行心境的视觉图腾与累计成果。
*   **结构**: 包含 SVG 呼吸人像、以及连续禅修天数、累计时长统计大字（此页面保留 Phase 1 架构，未做改动）。
*   **动效**:
    *   **呼吸循环**: 4400ms 循环的平滑缩放动效（`1.0` 到 `1.015`），模拟冥想呼吸。
    *   **入场动画**: 每次 Tab 聚焦时触发的立方贝塞尔透明度与缩放并行入场动效。

### `PlayerScreen.tsx` (全屏沉浸播放器)
*   **职责**: 核心打坐敲击交互空间。
*   **结构**: 背景发光同心圆环、`WoodenFish` 交互层、底部修行信息以及“调整法器”触发按钮。
*   **核心状态**: `strikes` (`number`)：记录当前会话的敲击总数。

### `ProfileScreen.tsx` (禅师 - 右页)
*   **职责**: 悟道层面。提供沉浸式 AI 禅师对话流。
*   **结构**:
    *   顶部栏挂载禅师修行头像 `🧘` 以及主副标题。
    *   **消息流滚动视图** (`chatArea`)：
        *   禅师气泡（左对齐）：采用灰色卡片背景，左侧带有极细的霓虹薄荷绿装饰条 (`borderLeftColor: '#D4FF59'`)，底部附带“禅师”时间小字。
        *   用户气泡（右对齐）：采用偏蓝暗灰气泡，底部附带“你”发送者小字。
*   **核心状态与交互**：
    *   `messages` (`Message[]`): 维护当前聊天历史列表。
    *   `inputText` (`string`): 暂存当前输入文本。
    *   **自动答复模拟器**：发送消息后自动滚动到底部 (`useRef`)，并在 1000ms 延迟后自动追加禅语回复，极大增强交互表现力。

---

## 4. UI 规范与技术约束

### Modal 内部的 Safe Area 约束
React Native 的 `<Modal>` 组件是通过原生层直接渲染在最顶层的，它会脱离 React 组件树的上下文。

为了防止 iPhone 刘海屏等对内容的遮挡，**所有 Modal 内部的根节点必须重新包裹声明组件树**：
```tsx
<Modal visible={visible}>
  <SafeAreaProvider>
    <SafeAreaView edges={['top', 'bottom']}>
      {/* 内容区域 */}
    </SafeAreaView>
  </SafeAreaProvider>
</Modal>
```