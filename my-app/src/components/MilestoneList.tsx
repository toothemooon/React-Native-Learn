import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

export interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  /** unlocked = 已达成 | in-progress = 进行中（显示进度环）| distant = 远未开启（极淡留白） */
  status: 'unlocked' | 'in-progress' | 'distant';
  progress?: { current: number; total: number; remaining: number; unit: string };
}

interface Props {
  milestones: Milestone[];
}

// ── 进度圆环 ──────────────────────────────────────────────────────────────
const R = 10;
const SIZE = 28;
const C = 2 * Math.PI * R;

function ProgressRing({ current, total }: { current: number; total: number }) {
  const filled = (C * Math.min(current, total)) / total;
  const cx = SIZE / 2;
  return (
    <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      <Circle cx={cx} cy={cx} r={R} stroke="rgba(255,255,255,0.07)" strokeWidth={1.5} fill="none" />
      <Circle
        cx={cx} cy={cx} r={R}
        stroke="rgba(212,255,89,0.55)"
        strokeWidth={1.5}
        fill="none"
        strokeDasharray={`${filled} ${C}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cx})`}
      />
    </Svg>
  );
}

// ── 主组件 ────────────────────────────────────────────────────────────────
export default function MilestoneList({ milestones }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>修 行 足 迹</Text>
      <View style={styles.list}>
        {milestones.map((item, index) => (
          <View key={item.id}>
            <View style={styles.row}>

              {/* 图标区：三态 */}
              {item.status === 'unlocked' && (
                <View style={styles.iconBoxUnlocked}>
                  <Ionicons name="checkmark" size={14} color="#D4FF59" />
                </View>
              )}
              {item.status === 'in-progress' && item.progress && (
                <ProgressRing current={item.progress.current} total={item.progress.total} />
              )}
              {item.status === 'distant' && (
                <View style={styles.iconPlaceholder} />
              )}

              {/* 文字区 */}
              <View style={styles.textGroup}>
                <Text style={[styles.title, item.status === 'distant' && styles.titleDim]}>
                  {item.title}
                </Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>

              {/* 右侧状态 */}
              {item.status === 'unlocked' && (
                <Text style={styles.badgeUnlocked}>已达成</Text>
              )}
              {item.status === 'in-progress' && item.progress && (
                <Text style={styles.badgeProgress}>
                  还差 {item.progress.remaining} {item.progress.unit}
                </Text>
              )}
            </View>

            {index < milestones.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 24, marginBottom: 24 },
  sectionTitle: {
    color: 'rgba(255,255,255,0.28)',
    fontSize: 11,
    letterSpacing: 4,
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    backgroundColor: '#15171A',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 20,
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, gap: 14 },

  // Icon states
  iconBoxUnlocked: {
    width: SIZE, height: SIZE,
    borderRadius: 8,
    backgroundColor: 'rgba(212,255,89,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(212,255,89,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  iconPlaceholder: { width: SIZE, height: SIZE },

  // Text
  textGroup: { flex: 1, gap: 3 },
  title: { color: 'rgba(255,255,255,0.75)', fontSize: 14, letterSpacing: 0.5 },
  titleDim: { color: 'rgba(255,255,255,0.25)' },
  subtitle: { color: 'rgba(255,255,255,0.25)', fontSize: 12, letterSpacing: 0.5 },

  // Right badges
  badgeUnlocked: { color: '#D4FF59', fontSize: 11, opacity: 0.7 },
  badgeProgress: { color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: 0.5 },

  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.04)', marginLeft: 42 },
});
