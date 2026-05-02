import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import Svg, { Path, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';


// ── Mock 数据（Phase 3 接入 Zustand 后替换）────────────────────────────────
const MOCK_RANK = '心无挂碍';
const MOCK_RANK_LEVEL = 3;
const MOCK_TOTAL_MINUTES = 154;
const MOCK_CONSECUTIVE_DAYS = 21;



function formatMinutes(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} 分钟`;
  if (m === 0) return `${h} 小时`;
  return `${h} 小时 ${m} 分`;
}

// ── 盘坐人像（扩大版，含光晕）────────────────────────────────────────────
function MeditatingFigure() {
  const cx = 140;
  return (
    <Svg width={340} height={365} viewBox="0 0 280 300">
      <Defs>
        <RadialGradient id="halo" cx="50%" cy="32%" r="38%">
          <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.10} />
          <Stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </RadialGradient>
      </Defs>

      {/* 氤氲光晕（最底层） */}
      <Circle cx={cx} cy={90} r={110} fill="url(#halo)" />

      {/* 气息线 */}
      <Path d="M 112 76 Q 90 50 102 20" stroke="rgba(255,255,255,0.09)" strokeWidth={1} fill="none" strokeDasharray="3 8" strokeLinecap="round" />
      <Path d="M 140 64 Q 140 36 143 8"  stroke="rgba(255,255,255,0.06)" strokeWidth={1} fill="none" strokeDasharray="2 9" strokeLinecap="round" />
      <Path d="M 168 76 Q 190 50 178 20" stroke="rgba(255,255,255,0.09)" strokeWidth={1} fill="none" strokeDasharray="3 8" strokeLinecap="round" />

      {/* 头部 */}
      <Circle cx={cx} cy={90} r={20} stroke="rgba(255,255,255,0.22)" strokeWidth={1.2} fill="none" />

      {/* 肩膀 */}
      <Path d="M 72 136 Q 140 122 208 136" stroke="rgba(255,255,255,0.20)" strokeWidth={1.2} fill="none" strokeLinecap="round" />

      {/* 左/右身体 */}
      <Path d="M 72 136 Q 64 178 80 202"  stroke="rgba(255,255,255,0.14)" strokeWidth={1.2} fill="none" strokeLinecap="round" />
      <Path d="M 208 136 Q 216 178 200 202" stroke="rgba(255,255,255,0.14)" strokeWidth={1.2} fill="none" strokeLinecap="round" />

      {/* 盘腿 */}
      <Path d="M 64 206 Q 140 194 216 206" stroke="rgba(255,255,255,0.20)" strokeWidth={1.2} fill="none" strokeLinecap="round" />
      <Path d="M 80 202 Q 70 216 86 224"   stroke="rgba(255,255,255,0.14)" strokeWidth={1.2} fill="none" strokeLinecap="round" />
      <Path d="M 200 202 Q 210 216 194 224" stroke="rgba(255,255,255,0.14)" strokeWidth={1.2} fill="none" strokeLinecap="round" />

      {/* 莲座三重弧 */}
      <Path d="M 100 230 Q 140 218 180 230" stroke="rgba(255,255,255,0.14)" strokeWidth={1} fill="none" strokeLinecap="round" />
      <Path d="M 84 240 Q 140 226 196 240"  stroke="rgba(255,255,255,0.10)" strokeWidth={1} fill="none" strokeLinecap="round" />
      <Path d="M 68 250 Q 140 234 212 250"  stroke="rgba(255,255,255,0.07)" strokeWidth={1} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

// ── 主屏幕 ────────────────────────────────────────────────────────────────
export default function JourneyScreen() {
  const isFocused = useIsFocused();

  // 呼吸
  const breathScale = useRef(new Animated.Value(1)).current;
  // 入场
  const entryScale   = useRef(new Animated.Value(0.96)).current;
  const figureOpacity = useRef(new Animated.Value(0)).current;
  const rankOpacity   = useRef(new Animated.Value(0)).current;
  const statsOpacity  = useRef(new Animated.Value(0)).current;

  // 呼吸循环（始终运行）
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathScale, { toValue: 1.015, duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(breathScale, { toValue: 1.0,   duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [breathScale]);

  // 入场动画（每次 Tab 聚焦触发）
  useEffect(() => {
    if (!isFocused) return;
    figureOpacity.setValue(0); entryScale.setValue(0.96);
    rankOpacity.setValue(0); statsOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(figureOpacity, { toValue: 1,   duration: 650, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(entryScale,   { toValue: 1,   duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(rankOpacity,  { toValue: 1,   duration: 500, delay: 150, useNativeDriver: true }),
      Animated.timing(statsOpacity, { toValue: 1,   duration: 500, delay: 260, useNativeDriver: true }),
    ]).start();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

          {/* ① 段位 */}
          <Animated.View style={[styles.rankSection, { opacity: rankOpacity }]}>
            <Text style={styles.rankText}>{MOCK_RANK}</Text>
            <Text style={styles.rankLevel}>第 {MOCK_RANK_LEVEL} 境</Text>
          </Animated.View>

          {/* ② 人像（呼吸 × 入场 两个 scale 叠加） */}
          <Animated.View style={[
            styles.figureSection,
            { opacity: figureOpacity, transform: [{ scale: breathScale }, { scale: entryScale }] },
          ]}>
            <MeditatingFigure />
          </Animated.View>

          {/* ③ 统计（主次分布，绑定段位叙事） */}
          <Animated.View style={[styles.statsSection, { opacity: statsOpacity }]}>
            <Text style={styles.statsPrimary}>
              {MOCK_CONSECUTIVE_DAYS}
              <Text style={styles.statsPrimaryUnit}> 天</Text>
            </Text>
            <Text style={styles.statsPrimaryLabel}>连续禅修</Text>
            <Text style={styles.statsSecondary}>累计 · {formatMinutes(MOCK_TOTAL_MINUTES)}</Text>
          </Animated.View>

        </ScrollView>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0D11' },
  safe:      { flex: 1 },
  content:   { paddingBottom: 120 },

  rankSection:  { alignItems: 'center', paddingTop: 28, paddingBottom: 2, gap: 4 },
  rankText:     { color: 'rgba(255,255,255,0.35)', fontSize: 12, letterSpacing: 5, fontWeight: '300' },
  rankLevel:    { color: 'rgba(255,255,255,0.18)', fontSize: 11, letterSpacing: 2, fontWeight: '300' },

  figureSection: { alignItems: 'center', paddingVertical: 4 },

  statsSection: {
    alignItems: 'center',
    paddingVertical: 24,
    marginHorizontal: 24,
    marginBottom: 32,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    gap: 4,
  },
  statsPrimary:      { color: 'rgba(255,255,255,0.85)', fontSize: 64, fontWeight: '200', letterSpacing: -2, lineHeight: 72 },
  statsPrimaryUnit:  { fontSize: 22, fontWeight: '300', letterSpacing: 0 },
  statsPrimaryLabel: { color: 'rgba(255,255,255,0.30)', fontSize: 11, letterSpacing: 3, fontWeight: '300' },
  statsSecondary:    { color: 'rgba(255,255,255,0.22)', fontSize: 13, letterSpacing: 1, fontWeight: '300', marginTop: 8 },
});
