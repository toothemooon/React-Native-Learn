import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  unlocked: boolean;
}

interface Props {
  milestones: Milestone[];
}

export default function MilestoneList({ milestones }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>修 行 足 迹</Text>
      <View style={styles.list}>
        {milestones.map((item, index) => (
          <View key={item.id}>
            <View style={styles.row}>
              {/* 状态图标 */}
              <View style={[styles.iconBox, item.unlocked && styles.iconBoxUnlocked]}>
                <Ionicons
                  name={item.unlocked ? 'checkmark' : 'lock-closed-outline'}
                  size={14}
                  color={item.unlocked ? '#D4FF59' : 'rgba(255,255,255,0.2)'}
                />
              </View>

              {/* 文字区 */}
              <View style={styles.textGroup}>
                <Text
                  style={[
                    styles.milestoneTitle,
                    !item.unlocked && styles.milestoneTitleLocked,
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={styles.milestoneSubtitle}>{item.subtitle}</Text>
              </View>

              {/* 已达成 badge */}
              {item.unlocked && (
                <Text style={styles.unlockedBadge}>已达成</Text>
              )}
            </View>

            {/* Hairline 分割线 */}
            {index < milestones.length - 1 && (
              <View style={styles.divider} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.3)',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 14,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxUnlocked: {
    backgroundColor: 'rgba(212, 255, 89, 0.08)',
    borderColor: 'rgba(212, 255, 89, 0.2)',
  },
  textGroup: {
    flex: 1,
    gap: 3,
  },
  milestoneTitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  milestoneTitleLocked: {
    color: 'rgba(255,255,255,0.3)',
  },
  milestoneSubtitle: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  unlockedBadge: {
    color: '#D4FF59',
    fontSize: 11,
    letterSpacing: 0.5,
    opacity: 0.7,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginLeft: 42,
  },
});
