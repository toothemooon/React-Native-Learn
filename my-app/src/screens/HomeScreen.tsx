import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../navigation/types';

// 环境音数据
const AMBIENT_SOUNDS = [
  { id: 'rain', name: '夏日雨声', icon: '🌧️' },
  { id: 'forest', name: '深山林间', icon: '🌲' },
  { id: 'stream', name: '溪水流声', icon: '🌊' },
  { id: 'temple', name: '寺院早晨', icon: '🕯️' },
  { id: 'night', name: '静夜无声', icon: '🌙' },
  { id: 'more', name: '更多', icon: '➕' },
];

// 法器数据
const INSTRUMENTS = [
  { id: 'muyu', name: '木鱼', icon: '🪵' },
  { id: 'bowl', name: '颂钵', icon: '🔔' },
  { id: 'qing', name: '磬', icon: '🎵' },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedSound, setSelectedSound] = useState('rain');
  const [selectedInstrument, setSelectedInstrument] = useState('muyu');

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView 
          style={styles.scroll} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 顶部问候语 */}
          <View style={styles.header}>
            <Text style={styles.greeting}>夜深了</Text>
            <Text style={styles.subGreeting}>开启今晚的静心之旅</Text>
          </View>

          {/* 环境音模块 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>环境音</Text>
            <View style={styles.grid}>
              {AMBIENT_SOUNDS.map((sound) => {
                const isSelected = selectedSound === sound.id;
                return (
                  <Pressable
                    key={sound.id}
                    style={({ pressed }) => [
                      styles.card,
                      isSelected && styles.cardActive,
                      sound.id === 'more' && styles.cardMore,
                      pressed && { opacity: 0.8, transform: [{ scale: 0.95 }] }
                    ]}
                    onPress={() => {
                      if (sound.id !== 'more') {
                        setSelectedSound(sound.id);
                      }
                    }}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    accessibilityLabel={sound.name}
                  >
                    <Text style={[styles.cardIcon, isSelected && styles.cardIconActive]}>
                      {sound.icon}
                    </Text>
                    <Text style={[styles.cardName, isSelected && styles.cardNameActive]}>
                      {sound.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* 法器模块 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>法器</Text>
            <View style={styles.instrumentsRow}>
              {INSTRUMENTS.map((inst) => {
                const isSelected = selectedInstrument === inst.id;
                return (
                  <Pressable
                    key={inst.id}
                    style={({ pressed }) => [
                      styles.card,
                      styles.cardInstrument,
                      isSelected && styles.cardActive,
                      pressed && { opacity: 0.8, transform: [{ scale: 0.95 }] }
                    ]}
                    onPress={() => setSelectedInstrument(inst.id)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    accessibilityLabel={inst.name}
                  >
                    <Text style={styles.cardIcon}>{inst.icon}</Text>
                    <Text style={[styles.cardName, isSelected && styles.cardNameActive]}>
                      {inst.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* 开始禅修按钮 */}
          <Pressable 
            style={({ pressed }) => [
              styles.ctaButton,
              pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }
            ]}
            onPress={() => navigation.navigate('PlayerModal')}
            accessibilityRole="button"
            accessibilityLabel="开始禅修"
            accessibilityHint="点击进入禅修播放器页面"
          >
            <Text style={styles.ctaText}>开始禅修</Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D11', // 深空暗夜蓝
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 130, // 避开悬浮 TabBar
  },
  header: {
    marginTop: 40,
    marginBottom: 32,
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
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    color: '#888',
    fontSize: 13,
    letterSpacing: 1.5,
    marginBottom: 12,
    fontWeight: '400',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  instrumentsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    backgroundColor: '#15171A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: 96,
    flex: 1,
    minWidth: '29%', // 保证一行3个
    gap: 8,
  },
  cardActive: {
    borderColor: 'rgba(212, 255, 89, 0.4)',
    backgroundColor: 'rgba(212, 255, 89, 0.03)',
  },
  cardMore: {
    // 更多卡片稍微暗色
    opacity: 0.8,
  },
  cardInstrument: {
    minWidth: '29%',
    flex: 1,
  },
  cardIcon: {
    fontSize: 22,
    textAlign: 'center',
  },
  cardIconActive: {
    // 激活态图标微调
  },
  cardName: {
    color: '#888',
    fontSize: 13,
    fontWeight: '400',
  },
  cardNameActive: {
    color: '#D4FF59',
    fontWeight: '500',
  },
  ctaButton: {
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(212, 255, 89, 0.3)',
    backgroundColor: 'rgba(212, 255, 89, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#D4FF59',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
  },
});
