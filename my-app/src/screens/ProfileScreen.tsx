import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppSettings from '../components/AppSettings';

// 从 JourneyScreen 相同的 mock 数据读取（Phase 3 接入 Zustand 后统一来源）
const MOCK_RANK = '心无挂碍';
const MOCK_CONSECUTIVE_DAYS = 21;

export default function ProfileScreen() {
  const [settingsVisible, setSettingsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        {/* 顶部栏 */}
        {/* 齿轮 icon & 礼物 icon 已隐去 */}
        <View style={styles.header}>
          <View style={styles.placeholderLeft} />
          <Text style={styles.headerTitle}>我的</Text>
          <View style={styles.placeholderRight} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* 身份卡片（Identity Card） */}
          <View style={styles.identityCard}>
            {/* 头像占位 */}
            <View style={styles.avatarRing}>
              <Ionicons name="person-outline" size={36} color="rgba(255,255,255,0.35)" />
            </View>

            {/* 名称 + 段位简签 */}
            <Text style={styles.userName}>修行者</Text>
            <View style={styles.rankBadge}>
              <Text style={styles.rankBadgeText}>{MOCK_RANK}</Text>
            </View>

            {/* 迷你统计双格 */}
            <View style={styles.miniStatsRow}>
              <View style={styles.miniStatItem}>
                <Text style={styles.miniStatValue}>{MOCK_CONSECUTIVE_DAYS}</Text>
                <Text style={styles.miniStatLabel}>连续天数</Text>
              </View>
              <View style={styles.miniStatDivider} />
              <View style={styles.miniStatItem}>
                <Text style={styles.miniStatValue}>2h 34m</Text>
                <Text style={styles.miniStatLabel}>累计时长</Text>
              </View>
            </View>
          </View>

          {/* App 设置入口 */}
          <View style={styles.menuSection}>
            <Pressable
              style={styles.menuRow}
              onPress={() => setSettingsVisible(true)}
              accessibilityRole="button"
              accessibilityLabel="App 设置"
            >
              <Ionicons name="settings-outline" size={20} color="#888" />
              <Text style={styles.menuLabel}>App 设置</Text>
              <Ionicons name="chevron-forward" size={18} color="#555" style={{ marginLeft: 'auto' }} />
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* 系统设置全屏 Modal */}
      <AppSettings
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0D11' },
  safeArea:  { flex: 1 },
  scrollContent: { paddingBottom: 120 },

  // 顶部栏
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 32,
  },
  placeholderLeft: {
    width: 44, height: 44,
  },
  placeholderRight: {
    width: 44, height: 44,
  },
  iconBtn: {
    width: 44, height: 44,
    borderRadius: 22,
    backgroundColor: '#15171A',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '500', letterSpacing: 1 },

  // 身份卡片
  identityCard: {
    alignItems: 'center',
    marginHorizontal: 24,
    paddingVertical: 36,
    backgroundColor: '#15171A',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 24,
    gap: 8,
  },
  avatarRing: {
    width: 88, height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 8,
  },
  userName: { color: 'rgba(255,255,255,0.85)', fontSize: 20, fontWeight: '300', letterSpacing: 2 },
  rankBadge: {
    paddingHorizontal: 14, paddingVertical: 4,
    backgroundColor: 'rgba(212,255,89,0.08)',
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(212,255,89,0.2)',
  },
  rankBadgeText: { color: '#D4FF59', fontSize: 12, letterSpacing: 2, opacity: 0.85 },

  // 迎你统计双格
  miniStatsRow: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    width: '80%',
  },
  miniStatItem: { flex: 1, alignItems: 'center', gap: 4 },
  miniStatDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 2 },
  miniStatValue: { color: 'rgba(255,255,255,0.75)', fontSize: 17, fontWeight: '300', letterSpacing: 0.5 },
  miniStatLabel: { color: 'rgba(255,255,255,0.28)', fontSize: 11, letterSpacing: 1 },

  // 菜单区
  menuSection: {
    marginHorizontal: 24,
    backgroundColor: '#15171A',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 20,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    gap: 14,
  },
  menuLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 15, letterSpacing: 0.5 },
});
