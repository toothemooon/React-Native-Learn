import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
  Switch,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// 塔罗牌式的音色数据
const SOUNDS = [
  { id: '紫金', name: '紫金', locked: false, color: '#A08090' },
  { id: '白玉', name: '白玉', locked: false, color: '#C0D0C0' },
  { id: '檀木', name: '檀木', locked: false, color: '#A07050' },
  { id: '黄铜', name: '黄铜', locked: true, color: '#A09050' },
  { id: '赛博', name: '赛博', locked: true, color: '#5090A0' },
].map(s => ({
  ...s,
  verticalName: s.name.split('').join('\n')
}));

const RULER_TICKS = Array.from({ length: 11 });

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ visible, onClose }: Props) {
  const [mantra, setMantra] = useState('功德 +1');
  const [isEditingMantra, setIsEditingMantra] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [stopMode, setStopMode] = useState('never'); // 'never', 'count', 'time'
  const [selectedSound, setSelectedSound] = useState('檀木');

  // 频率假数据（Phase 1 纯 UI 阶段）
  const [intervalVal, setIntervalVal] = useState('0.5');

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <SafeAreaProvider>
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            
            {/* 顶部调音台标识 */}
          <View style={styles.header}>
            <View style={styles.headerLeft} />
            <Text style={styles.headerTitle}>法 器 配 置</Text>
            <View style={styles.headerIcons}>
              {/* 去除了系统级图标，保持绝对沉浸 */}
            </View>
          </View>

          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            
            {/* 1. 祈福铭牌区 */}
            <View style={styles.mantraSection}>
              <Text style={styles.sectionLabel}>祈福语 (Mantra)</Text>
              <View style={styles.mantraCard}>
                {isEditingMantra ? (
                  <TextInput
                    style={styles.mantraInput}
                    value={mantra}
                    onChangeText={setMantra}
                    onBlur={() => setIsEditingMantra(false)}
                    autoFocus
                    selectionColor="#FFF"
                    maxLength={10}
                  />
                ) : (
                  <Pressable onPress={() => setIsEditingMantra(true)}>
                    <Text style={styles.mantraText}>「 {mantra} 」</Text>
                  </Pressable>
                )}
              </View>
              <Text style={styles.mantraHint}>*点击修改祈福铭语*</Text>
            </View>

            {/* 2. 控制中枢 Bento Box */}
            <View style={styles.bentoGrid}>
              
              {/* 播放模式卡片 (50%宽度) */}
              <View style={styles.bentoCardHalf}>
                <Text style={styles.cardTitle}>播放模式</Text>
                <View style={styles.switchWrapper}>
                  <Text style={[styles.switchLabel, autoPlay && styles.switchLabelActive]}>
                    自动敲击
                  </Text>
                  <Switch
                    value={autoPlay}
                    onValueChange={setAutoPlay}
                    trackColor={{ false: '#222', true: '#E0E0E0' }}
                    thumbColor={autoPlay ? '#111' : '#666'}
                    ios_backgroundColor="#222"
                  />
                </View>
              </View>

              {/* 频率调节卡片 (50%宽度) */}
              <View style={[styles.bentoCardHalf, !autoPlay && { opacity: 0.3 }]}>
                <Text style={styles.cardTitle}>频率调节</Text>
                <Text style={styles.freqValue}>{intervalVal}s</Text>
                <View style={styles.rulerContainer}>
                  {/* 模拟刻度 */}
                  {RULER_TICKS.map((_, i) => (
                    <View key={i} style={[styles.rulerTick, i % 5 === 0 && styles.rulerTickLong]} />
                  ))}
                  {/* 模拟滑块指针 */}
                  <View style={styles.rulerThumb} />
                </View>
              </View>

              {/* 禅修目标卡片 (横跨两列，100%宽度) */}
              <View style={styles.bentoCardFull}>
                <Text style={styles.cardTitle}>禅修目标</Text>
                <View style={styles.targetRow}>
                  {['never', 'count', 'time'].map((mode, idx) => {
                    const topLabels = ['无', '计数', '时长'];
                    const btmLabels = ['(永不)', '', ''];
                    const isSelected = stopMode === mode;
                    return (
                      <Pressable
                        key={mode}
                        style={[styles.targetBtn, isSelected && styles.targetBtnActive]}
                        onPress={() => setStopMode(mode)}
                      >
                        <Text style={[styles.targetTextTop, isSelected && styles.targetTextActive]}>
                          {topLabels[idx]}
                        </Text>
                        {btmLabels[idx] ? (
                          <Text style={[styles.targetTextBtm, isSelected && styles.targetTextActive]}>
                            {btmLabels[idx]}
                          </Text>
                        ) : null}
                      </Pressable>
                    );
                  })}
                </View>
              </View>

            </View>

            {/* 3. 横向音色画廊 (Cover Flow) */}
            <View style={styles.gallerySection}>
              <Text style={styles.sectionLabel}>单行横向 Cover Flow (音色收藏室)</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.galleryContent}
              >
                {SOUNDS.map((s) => {
                  const isSelected = selectedSound === s.id;
                  return (
                    <Pressable
                      key={s.id}
                      onPress={() => setSelectedSound(s.id)}
                      disabled={s.locked}
                      accessibilityRole="button"
                      accessibilityLabel={`音色：${s.name}`}
                      accessibilityHint={s.locked ? "需要解锁" : "点击选择该音色"}
                      accessibilityState={{ selected: isSelected, disabled: s.locked }}
                      style={({ pressed }) => [
                        styles.galleryCard,
                        isSelected && styles.galleryCardActive,
                        s.locked && { opacity: 0.4 },
                        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }
                      ]}
                    >
                      {/* 背景柔光渲染 */}
                      <View style={[styles.galleryGlow, { backgroundColor: s.color }]} />
                      
                      {s.locked && (
                        <Ionicons name="cart" size={14} color="#666" style={styles.cartIcon} />
                      )}
                      {/* 竖向中文排版 */}
                      <Text style={[styles.galleryText, isSelected && styles.galleryTextActive]}>
                        {s.verticalName}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {/* 底部确认按钮 */}
            <View style={styles.footer}>
              <Pressable style={styles.doneBtn} onPress={onClose}>
                <Text style={styles.doneBtnText}>✓ 收起面板</Text>
              </Pressable>
            </View>

            </ScrollView>
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 12, 0.96)',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    width: 60,
  },
  headerTitle: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 4,
  },
  headerIcons: {
    width: 60, // 占位
  },
  scroll: {
    flex: 1,
  },
  sectionLabel: {
    color: '#888',
    fontSize: 13,
    marginBottom: 12,
    marginLeft: 20,
  },
  mantraSection: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  mantraCard: {
    backgroundColor: '#161618',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2C',
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mantraText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 2,
    textShadowColor: 'rgba(255,255,255,0.4)',
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 0 },
  },
  mantraInput: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 2,
    textAlign: 'center',
  },
  mantraHint: {
    color: '#555',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
  },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginTop: 24,
    gap: 12,
  },
  bentoCardHalf: {
    width: '48%',
    backgroundColor: '#161618',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2C',
    padding: 16,
  },
  bentoCardFull: {
    width: '100%',
    backgroundColor: '#161618',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2C',
    padding: 16,
  },
  cardTitle: {
    color: '#E0E0E0',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 16,
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#222',
    padding: 6,
    paddingLeft: 12,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#333',
  },
  switchLabel: {
    color: '#666',
    fontSize: 13,
    fontWeight: '500',
  },
  switchLabelActive: {
    color: '#FFF',
  },
  freqValue: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  rulerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 24,
    paddingHorizontal: 8,
    position: 'relative',
  },
  rulerTick: {
    width: 1,
    height: 8,
    backgroundColor: '#444',
  },
  rulerTickLong: {
    height: 14,
    backgroundColor: '#666',
  },
  rulerThumb: {
    position: 'absolute',
    left: '45%',
    bottom: -4,
    width: 2,
    height: 20,
    backgroundColor: '#FFF',
    shadowColor: '#FFF',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
  targetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  targetBtn: {
    flex: 1,
    backgroundColor: '#222',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  targetBtnActive: {
    backgroundColor: '#333',
    borderColor: '#555',
  },
  targetTextTop: {
    color: '#666',
    fontSize: 14,
  },
  targetTextBtm: {
    color: '#666',
    fontSize: 11,
    marginTop: 4,
  },
  targetTextActive: {
    color: '#E0E0E0',
  },
  gallerySection: {
    marginTop: 32,
  },
  galleryContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  galleryCard: {
    width: 80,
    height: 140,
    backgroundColor: '#161618',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2C',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  galleryCardActive: {
    borderColor: '#FFF',
    transform: [{ scale: 1.05 }],
  },
  galleryGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.15,
    filter: 'blur(10px)',
  },
  galleryText: {
    color: '#888',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 4,
    lineHeight: 24,
    textAlign: 'center',
    zIndex: 1,
  },
  galleryTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  cartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
  },
  footer: {
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 60,
  },
  doneBtn: {
    height: 54,
    backgroundColor: '#161618',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
  },
});
