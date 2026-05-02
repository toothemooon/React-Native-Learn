# 组件手册：WoodenFish 项目架构教学文档

> 最后更新：2026-05-02
>
> 本文档不只是 API 字典，更是帮你建立"心智模型"的教学手册。每个章节都会解释**是什么**、**为什么这样设计**，以及**如何做选择**。

---

## 第 0 章：先建立整体画面（心智模型）

在看任何代码之前，先用一个类比理解整个系统：

> 把 App 想象成一座**电影院**：

| 类比 | 对应代码 | 说明 |
|------|---------|------|
| 整个电影院（建筑本身） | `RootNavigator` | 管理所有空间，决定什么时候打开哪个门 |
| 大厅 / 咖啡厅 / 售票处 | `Bottom Tabs`（四个 Tab） | 日常活动区，可以自由穿梭 |
| 放映厅 | `PlayerScreen`（Modal） | 一旦进入，外部世界消失，全身心沉浸 |
| 放映厅里的调音室 | `SettingsPanel` | 只能在放映厅内使用，外面看不见 |
| 电影院门口的服务台 | `AppSettings` | 跟看电影本身无关的行政事务（退票、投诉） |

### 数据与控制流向图

谁拥有什么，谁打开谁：

```
App.tsx
 └── NavigationContainer
      └── RootNavigator（Stack）
           │
           ├──【Tab 层】BottomTabs
           │    ├── HomeScreen
           │    │    └── 点击 Hero 卡片 → navigate('PlayerModal') ──────────┐
           │    ├── JourneyScreen（占位）                                     │
           │    └── ProfileScreen                                             │
           │         ├── useState(settingsVisible)                            │
           │         └── <AppSettings visible={settingsVisible} />            │
           │                                                                  │
           └──【Modal 层】PlayerScreen ◄─────────────────────────────────────┘
                └── useState(panelVisible)
                └── <SettingsPanel visible={panelVisible} />
```

**一句话总结**：HomeScreen 用**导航**打开 PlayerScreen；ProfileScreen 用**状态**控制 AppSettings。这两种方式不同，是因为它们本质上是两种不同的东西——下面第 2 章会详细解释。

---

## 第 1 章：导航系统（RootNavigator）

**文件路径**：`src/navigation/RootNavigator.tsx`

### 核心概念：两种导航器的区别

> **Tab Navigator（底部 Tab）**：几个页面**并排存在**，用户平行切换，没有"上一页"的概念。就像电影院不同区域之间走动，你随时可以去大厅或咖啡厅。

> **Stack Navigator（堆栈）**：页面**叠加存在**，像一摞卡片，新页面压在旧页面上，可以返回。就像进入放映厅，关上门后大厅"消失"了，但还在那里，你退出来就回去了。

### 两者如何嵌套

这个项目把它们**组合使用**：

```
Stack（外层）
 ├── 卡片1：BottomTabs（内层，是一整个 Tab 系统）
 └── 卡片2：PlayerScreen（用 presentation: 'modal' 声明为模态弹出）
```

`BottomTabs` 整体被当作 Stack 的"第一张卡片"。当 `navigate('PlayerModal')` 被调用时，PlayerScreen 这张"第二张卡片"从底部滑出，**叠在整个 Tab 系统上面**。

### 关键代码解读

```tsx
// 这里"PlayerModal"只是一个路由名（门牌号），不是组件名
<Stack.Screen 
  name="PlayerModal"         // 门牌号：任何地方 navigate('PlayerModal') 都找到这里
  component={PlayerScreen}   // 对应的实际组件（房间内容）
  options={{ 
    presentation: 'modal',        // 关键：声明它是"模态"，而非普通页面跳转
    animation: 'slide_from_bottom' // 从底部滑入的动画
  }} 
/>
```

### Tab 图标的动态逻辑

```tsx
tabBarIcon: ({ color, focused }) => {
  // focused = 当前 Tab 是否被选中（true/false）
  // color 由 tabBarActiveTintColor 或 tabBarInactiveTintColor 自动决定
  let iconName = focused ? 'home' : 'home-outline'; // 选中用实心，未选中用线框
  return <Ionicons name={iconName} color={color} />;
}
```

---

## 第 2 章：两种"弹出层"模式（最核心的架构决策）

这是本项目中**最容易产生疑问**的地方：为什么有时候用 `navigate`，有时候用 `useState + Modal`？

### 对比表

| 对比维度 | 模式一：Navigator 跳转 | 模式二：useState + Modal |
|---------|----------------------|------------------------|
| **本项目实例** | PlayerScreen（木鱼沉浸页） | AppSettings（系统设置浮层） |
| **谁能打开它** | App 内**任何页面**都可以 | **只有一个**父组件能控制 |
| **是否有导航历史** | ✅ 有，系统返回按钮有效 | ❌ 没有，关闭即消失 |
| **状态归属** | 导航系统管理 | 父组件的 `useState` |
| **动画来源** | Navigator 的路由动画 | `<Modal>` 组件的 `animationType` |

### 选择原则（一句话）

> **"这个界面需要被多个地方打开，或者需要导航历史吗？"**
> - 是 → 用 Navigator（`navigate('路由名')`）
> - 否 → 用 `useState + Modal`（更轻量，更局部）

### 为什么 AppSettings 点击后还是从下往上弹？

这是个常见的误解。`useState` 只控制**显示/隐藏的时机**，动画效果是 `<Modal>` 自己的属性：

```tsx
<Modal 
  visible={visible}        // useState 控制这个 true/false
  animationType="slide"    // 这一行决定了"从底部滑入"——与 useState 无关
>
```

把 `animationType="slide"` 改成 `"fade"` 就会变成淡入淡出。

---

## 第 3 章：Props 与 State —— 数据所有权

### 核心判断法则

> **Props = 外部委托（别人控制）**
> **State = 内部决策（自己管理）**

判断一个数据该用哪个，问自己：**"这个数据的控制权在父组件手里，还是在这个组件自己手里？"**

```
AppSettings 组件中：

visible（Props）
  └── 控制权在 ProfileScreen 手里
      因为"要不要显示设置页"是 ProfileScreen 的齿轮按钮决定的
      AppSettings 自己无权决定自己出现

hapticsEnabled（State）
  └── 控制权在 AppSettings 自己手里
      因为这个 Switch 只影响设置页内部的 UI
      父组件 ProfileScreen 不需要知道它是开还是关
```

### 实际代码对照

```tsx
// ProfileScreen.tsx（父组件）
const [settingsVisible, setSettingsVisible] = useState(false); // 父组件持有"要不要显示"

<Pressable onPress={() => setSettingsVisible(true)}>  // 父组件决定打开
  <Ionicons name="settings-outline" />
</Pressable>

<AppSettings 
  visible={settingsVisible}                    // 把控制权"委托"给子组件
  onClose={() => setSettingsVisible(false)}    // 子组件想关闭，需要"回调"父组件
/>
```

```tsx
// AppSettings.tsx（子组件）
const [hapticsEnabled, setHapticsEnabled] = useState(true); // 自己管自己的 Switch

// 注意：AppSettings 不知道自己什么时候应该显示
// 它只能被动接受 visible 这个 Props
```

---

## 第 4 章：Safe Area —— 为什么 Modal 里要再包一层

### 问题背景

你会发现 `AppSettings` 和 `SettingsPanel` 里都有这种写法：

```tsx
<Modal visible={visible}>
  <SafeAreaProvider>       {/* ← 为什么这里还要再包一层？ */}
    <SafeAreaView>
      ...
    </SafeAreaView>
  </SafeAreaProvider>
</Modal>
```

### 根本原因

React Native 的 `<Modal>` 是通过**原生层直接渲染在屏幕最顶层**的，它在技术上**脱离了 React 的组件树**。

```
App.tsx
 └── SafeAreaProvider ← 这个的安全区域信息...
      └── NavigationContainer
           └── ... 所有页面都能感知到

但是：

<Modal> ← 原生层直接渲染，绕过了 React 组件树
  └── 这里感知不到外面的 SafeAreaProvider！
```

所以必须在 Modal 内部**重新声明一个 SafeAreaProvider**，给 Modal 里的内容重新建立安全区域感知能力。否则内容会被 iPhone 刘海遮住。

### 规范（强制）

只要用到 `<Modal>`，内部结构必须是：

```tsx
<Modal visible={visible} ...>
  <SafeAreaProvider>                         {/* 重新建立安全区域上下文 */}
    <SafeAreaView edges={['top', 'bottom']}>  {/* 应用安全区域边距 */}
      {/* 你的内容 */}
    </SafeAreaView>
  </SafeAreaProvider>
</Modal>
```

---

## 第 5 章：各组件速查（API 参考）

### WoodenFish

**路径**：`src/components/WoodenFish.tsx`
**角色**：核心交互组件，负责渲染木鱼 SVG 并响应点击

**Props**：无（状态内聚，自己管理自己）

| 内部 State | 类型 | 默认值 | 说明 |
|-----------|------|--------|------|
| `isPressed` | `boolean` | `false` | 是否处于按压状态，控制颜色和缩放 |

**Phase 2 计划**：替换为 Skia 实现 3D 光影；接入 `expo-haptics` 和 `expo-av`

---

### SettingsPanel

**路径**：`src/components/SettingsPanel.tsx`
**角色**：法器调音台，以半透明 Modal 覆盖播放器，仅在 `PlayerScreen` 内使用

| Props | 类型 | 说明 |
|-------|------|------|
| `visible` | `boolean` | 控制 Modal 显隐（由 PlayerScreen 的 useState 管理） |
| `onClose` | `() => void` | 点击"收起面板"时，通知父组件关闭 |

| 内部 State | 类型 | 默认值 |
|-----------|------|--------|
| `mantra` | `string` | `'功德 +1'` |
| `isEditingMantra` | `boolean` | `false` |
| `autoPlay` | `boolean` | `true` |
| `stopMode` | `string` | `'never'` |
| `selectedSound` | `string` | `'檀木'` |

---

### AppSettings

**路径**：`src/components/AppSettings.tsx`
**角色**：系统级全屏设置页，以 `transparent: false` 的 Modal 覆盖全局，仅在 `ProfileScreen` 内使用

| Props | 类型 | 说明 |
|-------|------|------|
| `visible` | `boolean` | 控制 Modal 显隐（由 ProfileScreen 的 useState 管理） |
| `onClose` | `() => void` | 点击"完成"时，通知父组件关闭 |

| 内部 State | 类型 | 默认值 |
|-----------|------|--------|
| `hapticsEnabled` | `boolean` | `true` |
| `healthSync` | `boolean` | `false` |

---

## 附录：三大 Screen 速查

| Screen | 路径 | 主要职责 |
|--------|------|---------|
| `HomeScreen` | `src/screens/HomeScreen.tsx` | 禅境首页，Hero 卡片点击后 `navigate('PlayerModal')` |
| `PlayerScreen` | `src/screens/PlayerScreen.tsx` | 全屏沉浸播放器，包含 WoodenFish 和 SettingsPanel |
| `ProfileScreen` | `src/screens/ProfileScreen.tsx` | 个人资料，修行统计、日历，以及 AppSettings 的宿主 |
