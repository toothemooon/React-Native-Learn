import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppSettings from '../components/AppSettings';

export default function ProfileScreen() {
  const [settingsVisible, setSettingsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* 顶部栏 */}
        <View style={styles.header}>
          <Pressable onPress={() => setSettingsVisible(true)} style={styles.iconBtn}>
            <Ionicons name="settings-outline" size={24} color="#888" />
          </Pressable>
          <Text style={styles.headerTitle}>个人资料</Text>
          <Pressable style={styles.iconBtn}>
            <Ionicons name="gift-outline" size={24} color="#D4FF59" />
          </Pressable>
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>我的连续记录</Text>
          
          {/* 数据统计看板 */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Ionicons name="glasses-outline" size={32} color="#E0E0E0" />
              <Text style={styles.statLabel}>总计</Text>
              <Text style={styles.statValue}>0 个连续记录</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Ionicons name="options-outline" size={32} color="#E0E0E0" />
              <Text style={styles.statLabel}>最长</Text>
              <Text style={styles.statValue}>0 天</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={32} color="#E0E0E0" />
              <Text style={styles.statLabel}>目前</Text>
              <Text style={styles.statValue}>0 天</Text>
            </View>
          </View>

          {/* 冥想日历 (Mock) */}
          <View style={styles.calendarCard}>
            <View style={styles.calHeader}>
              <Ionicons name="chevron-back" size={20} color="#888" />
              <Text style={styles.calMonth}>四月</Text>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </View>
            <View style={styles.calGrid}>
              {['一', '二', '三', '四', '五', '六', '日'].map(d => (
                <Text key={d} style={styles.calDayLabel}>{d}</Text>
              ))}
              {/* 填充空白 */}
              <View style={styles.calDayBox} />
              <View style={styles.calDayBox} />
              {/* 模拟当月天数 */}
              {[...Array(30)].map((_, i) => {
                const isToday = i === 29;
                return (
                  <View key={i} style={[styles.calDayBox, isToday && styles.calDayActive]}>
                    <Text style={[styles.calDayText, isToday && styles.calDayTextActive]}>{i + 1}</Text>
                  </View>
                );
              })}
            </View>
            
            <Pressable style={styles.shareBtn}>
              <Ionicons name="share-outline" size={16} color="#D4FF59" />
              <Text style={styles.shareBtnText}>分享我的连续记录</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* 隐藏的系统设置全屏页，由左上角齿轮唤出 */}
      <AppSettings 
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D11', // Dark Zen
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 24,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#15171A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    color: '#E0E0E0',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
    letterSpacing: 1,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#15171A',
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginVertical: 8,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
  },
  statValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  calendarCard: {
    backgroundColor: '#15171A',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 120, // 避开 Bottom Tabs
  },
  calHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  calMonth: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  calGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    justifyContent: 'flex-start',
    marginBottom: 24,
  },
  calDayLabel: {
    width: '13%',
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginBottom: 12,
  },
  calDayBox: {
    width: '13%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
  },
  calDayActive: {
    backgroundColor: '#D4FF59',
    shadowColor: '#D4FF59',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  calDayText: {
    color: '#888',
    fontSize: 14,
  },
  calDayTextActive: {
    color: '#0B0D11',
    fontWeight: '700',
  },
  shareBtn: {
    flexDirection: 'row',
    backgroundColor: 'rgba(212, 255, 89, 0.1)',
    borderRadius: 99,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(212, 255, 89, 0.3)',
  },
  shareBtnText: {
    color: '#D4FF59',
    fontSize: 14,
    fontWeight: '600',
  }
});
