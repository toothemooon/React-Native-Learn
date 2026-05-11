import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../navigation/types';

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* 假装这里有一个动态深空/暗林背景 */}
      <View style={styles.bgOverlay} />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* 顶部问候语 */}
          <View style={styles.header}>
            <Text style={styles.greeting}>夜深了</Text>
            <Text style={styles.subGreeting}>开启今晚的静心之旅</Text>
          </View>

          {/* Hero 卡片 (Daily Zen) */}
          <Pressable 
            style={({ pressed }) => [
              styles.heroCard,
              {
                transform: [{ scale: pressed ? 0.98 : 1 }],
                opacity: pressed ? 0.9 : 1,
              }
            ]}
            onPress={() => navigation.navigate('PlayerModal')}
            accessibilityRole="button"
            accessibilityLabel="今日推荐：檀木与夏雨"
            accessibilityHint="点击开始沉浸式禅修"
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTag}>今日推荐 · Daily Zen</Text>
              <Text style={styles.heroTitle}>檀木与夏雨</Text>
              <Text style={styles.heroDesc}>专注敲击 5 分钟，让纷扰随着雨声褪去</Text>
              <View style={styles.playBtn}>
                <Ionicons name="play" size={14} color="#D4FF59" />
                <Text style={styles.playBtnText}>开始沉浸</Text>
              </View>
            </View>
          </Pressable>

          {/* 最近使用 */}
          <Text style={styles.sectionTitle}>近期修行</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            <View style={styles.recentCard}>
              <Ionicons name="medical-outline" size={28} color="#A08090" />
              <Text style={styles.recentText}>紫金钵</Text>
            </View>
            <View style={styles.recentCard}>
              <Ionicons name="leaf-outline" size={28} color="#C0D0C0" />
              <Text style={styles.recentText}>白玉木鱼</Text>
            </View>
            <View style={styles.recentCard}>
              <Ionicons name="moon-outline" size={28} color="#5090A0" />
              <Text style={styles.recentText}>赛博赛博</Text>
            </View>
          </ScrollView>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D11', // 深沉暗夜蓝 (Dark Zen)
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  greeting: {
    color: '#E0E0E0',
    fontSize: 34,
    fontWeight: '300',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subGreeting: {
    color: '#888',
    fontSize: 15,
    letterSpacing: 1,
  },
  heroCard: { 
    height: 260, 
    backgroundColor: '#15171A', 
    borderRadius: 24, 
    padding: 24, 
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  heroContent: {
    gap: 8,
  },
  heroTag: {
    color: '#D4FF59',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  heroTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '500',
    letterSpacing: 2,
  },
  heroDesc: {
    color: '#888',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  playBtn: {
    backgroundColor: 'rgba(212, 255, 89, 0.1)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(212, 255, 89, 0.3)',
  },
  playBtnText: {
    color: '#D4FF59',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 40,
    marginBottom: 16,
    letterSpacing: 1,
  },
  hScroll: {
    gap: 16,
    paddingRight: 24,
  },
  recentCard: {
    width: 130,
    height: 130,
    backgroundColor: '#15171A',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    justifyContent: 'space-between',
  },
  recentText: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
  }
});
