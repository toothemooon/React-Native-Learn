import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import MilestoneList, { Milestone } from '../components/MilestoneList';

// ─── Mock 数据（MVP 阶段 hardcode，Phase 3 替换为 Zustand store）─────────────
const MOCK_RANK = '心无挂碍';
const MOCK_RANK_LEVEL = 3;
const MOCK_TOTAL_MINUTES = 154; // 2h 34min
const MOCK_CONSECUTIVE_DAYS = 21;

const MOCK_MILESTONES: Milestone[] = [
  { id: '1', title: '首次禅修',      subtitle: '踏上修行之路',  unlocked: true },
  { id: '2', title: '累计 30 分钟', subtitle: '初燃香火',      unlocked: true },
  { id: '3', title: '连续 7 天',    subtitle: '七日定心',      unlocked: false },
  { id: '4', title: '累计 1 小时',  subtitle: '点亮心灯',      unlocked: false },
  { id: '5', title: '连续 21 天',   subtitle: '廿一日不断',    unlocked: false },
  { id: '6', title: '累计 10 小时', subtitle: '入定之门',      unlocked: false },
];

// ─── 工具函数：分钟转为可读时长 ────────────────────────────────────────────
function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} 分钟`;
  if (m === 0) return `${h} 小时`;
  return `${h} 小时 ${m} 分`;
}

// ─── 盘坐人像 SVG 组件 ────────────────────────────────────────────────────
function MeditatingFigure() {
  return (
    <Svg width={220} height={250} viewBox="0 0 220 250">
      {/* 气息线：飘散虚线，象征呼吸与气 */}
      <Path
        d="M 88 62 Q 72 42 82 18"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={1}
        fill="none"
        strokeDasharray="3 7"
        strokeLinecap="round"
      />
      <Path
        d="M 110 52 Q 110 30 113 8"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={1}
        fill="none"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />
      <Path
        d="M 132 62 Q 148 42 138 18"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={1}
        fill="none"
        strokeDasharray="3 7"
        strokeLinecap="round"
      />

      {/* 头部：细圆 */}
      <Circle
        cx={110}
        cy={74}
        r={15}
        stroke="rgba(255,255,255,0.22)"
        strokeWidth={1.2}
        fill="none"
      />

      {/* 肩膀：宽缓贝塞尔弧线 */}
      <Path
        d="M 58 112 Q 110 100 162 112"
        stroke="rgba(255,255,255,0.20)"
        strokeWidth={1.2}
        fill="none"
        strokeLinecap="round"
      />

      {/* 左侧身体 */}
      <Path
        d="M 58 112 Q 52 145 64 164"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth={1.2}
        fill="none"
        strokeLinecap="round"
      />

      {/* 右侧身体 */}
      <Path
        d="M 162 112 Q 168 145 156 164"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth={1.2}
        fill="none"
        strokeLinecap="round"
      />

      {/* 盘腿底线 */}
      <Path
        d="M 52 168 Q 110 160 168 168"
        stroke="rgba(255,255,255,0.20)"
        strokeWidth={1.2}
        fill="none"
        strokeLinecap="round"
      />

      {/* 左膝 */}
      <Path
        d="M 64 164 Q 56 174 68 180"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth={1.2}
        fill="none"
        strokeLinecap="round"
      />

      {/* 右膝 */}
      <Path
        d="M 156 164 Q 164 174 152 180"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth={1.2}
        fill="none"
        strokeLinecap="round"
      />

      {/* 莲座：三重半弧，由上到下渐淡渐宽 */}
      <Path
        d="M 78 186 Q 110 178 142 186"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth={1}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M 66 194 Q 110 184 154 194"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth={1}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M 54 202 Q 110 190 166 202"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth={1}
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ─── 主屏幕 ──────────────────────────────────────────────────────────────
export default function JourneyScreen() {
  const breathAnim = useRef(new Animated.Value(1)).current;

  // 呼吸动画：每 4.4 秒完成一次吸-呼，幅度 1.5%，极为克制
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathAnim, {
          toValue: 1.015,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(breathAnim, {
          toValue: 1.0,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [breathAnim]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ① 顶层：段位区 */}
          <View style={styles.rankSection}>
            <Text style={styles.rankText}>{MOCK_RANK}</Text>
            <Text style={styles.rankLevel}>第 {MOCK_RANK_LEVEL} 境</Text>
          </View>

          {/* ② 中层：盘坐人像 + 呼吸动画 */}
          <View style={styles.figureSection}>
            <Animated.View
              style={{ transform: [{ scale: breathAnim }] }}
            >
              <MeditatingFigure />
            </Animated.View>
          </View>

          {/* ③ 底层：数据指标双卡片 */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {formatMinutes(MOCK_TOTAL_MINUTES)}
              </Text>
              <Text style={styles.statLabel}>累计禅修时长</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{MOCK_CONSECUTIVE_DAYS} 天</Text>
              <Text style={styles.statLabel}>连续禅修</Text>
            </View>
          </View>

          {/* ④ 成就区：MilestoneList 组件 */}
          <MilestoneList milestones={MOCK_MILESTONES} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D11',
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // 避开悬浮 Bottom Tabs
  },

  // ── 段位区 ──
  rankSection: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 4,
    gap: 4,
  },
  rankText: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 12,
    letterSpacing: 5,
    fontWeight: '300',
  },
  rankLevel: {
    color: 'rgba(255,255,255,0.18)',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '300',
  },

  // ── 人像区 ──
  figureSection: {
    alignItems: 'center',
    paddingVertical: 4,
  },

  // ── 统计卡片 ──
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: '#15171A',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    paddingVertical: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginVertical: 4,
  },
  statValue: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 1,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
    letterSpacing: 1,
  },
});
