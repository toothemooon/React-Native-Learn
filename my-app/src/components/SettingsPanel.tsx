import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COUNTDOWN_OPTIONS: string[] = ['1 min', '3 min', '5 min', '10 min', '15 min', '30 min'];
const COUNT_OPTIONS: string[] = ['10', '50', '100', '200', '500', '1000'];

type SoundItem = {
  id: string;
  locked: boolean;
  bold?: boolean;
};

const SOUNDS: SoundItem[] = [
  { id: '00', locked: false },
  { id: '01', locked: false },
  { id: '02', locked: false },
  { id: '03', locked: false },
  { id: '04', locked: false },
  { id: '05', locked: false },
  { id: '06', locked: true },
  { id: '07', locked: true },
  { id: '08', locked: true },
  { id: '09', locked: true },
  { id: '10', locked: true },
  { id: '11', locked: true },
  { id: '12', locked: true, bold: true },
];

type PlayMode = 'auto' | 'manual';
type StopMode = 'never' | 'count' | 'countdown';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ visible, onClose }: Props) {
  const [selectedSound, setSelectedSound] = useState<string>('00');
  const [playMode, setPlayMode] = useState<PlayMode>('auto');
  const [stopMode, setStopMode] = useState<StopMode>('never');
  const [selectedCountdown, setSelectedCountdown] = useState<string>('5 min');
  const [selectedCount, setSelectedCount] = useState<string>('100');

  return (
    <Modal visible={visible} transparent={false} animationType="slide">
      <SafeAreaView style={styles.safeArea}>
        {/* 顶部 ∞ 标识 */}
        <View style={styles.topBar}>
          <Text style={styles.infinityIcon}>∞</Text>
        </View>

        {/* 设置面板卡片 */}
        <View style={styles.panel}>
          {/* 顶栏：关闭按钮 + 悬浮文字输入 */}
          <View style={styles.headerRow}>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
            <TextInput
              style={styles.headerInput}
              placeholder="点击输入悬浮文字 如:功德 +1"
              placeholderTextColor="#555"
            />
          </View>

          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={true}
            indicatorStyle="white"
          >
            {/* 播放模式 */}
            <View style={styles.segmentBlock}>
              <Text style={styles.sectionLabel}>播放模式</Text>
              <View style={styles.segmentContainer}>
                {([{ key: 'auto', label: '自动' }, { key: 'manual', label: '手敲' }] as { key: PlayMode; label: string }[]).map((item) => (
                  <Pressable
                    key={item.key}
                    style={[styles.segmentBtn, playMode === item.key && styles.segmentBtnActive]}
                    onPress={() => setPlayMode(item.key)}
                  >
                    <Text style={[styles.segmentText, playMode === item.key && styles.segmentTextActive]}>
                      {item.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* 停止模式 */}
            {playMode === 'auto' && (
              <View style={styles.segmentBlock}>
                <Text style={styles.sectionLabel}>停止模式</Text>
                <View style={styles.segmentContainer}>
                  {([
                    { key: 'never', label: '永不' },
                    { key: 'count', label: '计数' },
                    { key: 'countdown', label: '倒计时' },
                  ] as { key: StopMode; label: string }[]).map((item) => (
                    <Pressable
                      key={item.key}
                      style={[styles.segmentBtn, stopMode === item.key && styles.segmentBtnActive]}
                      onPress={() => setStopMode(item.key)}
                    >
                      <Text style={[styles.segmentText, stopMode === item.key && styles.segmentTextActive]}>
                        {item.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                {/* 计数预选项 */}
                {stopMode === 'count' && (
                  <View style={styles.countdownRow}>
                    {COUNT_OPTIONS.map((opt, index) => (
                      <React.Fragment key={opt}>
                        <Pressable onPress={() => setSelectedCount(opt)}>
                          <Text style={[
                            styles.countdownOption,
                            selectedCount === opt && styles.countdownOptionActive,
                          ]}>
                            {opt}
                          </Text>
                        </Pressable>
                        {index < COUNT_OPTIONS.length - 1 && (
                          <Text style={styles.countdownDivider}>|</Text>
                        )}
                      </React.Fragment>
                    ))}
                  </View>
                )}

                {/* 倒计时时长选项 */}
                {stopMode === 'countdown' && (
                  <View style={styles.countdownRow}>
                    {COUNTDOWN_OPTIONS.map((opt, index) => (
                      <React.Fragment key={opt}>
                        <Pressable onPress={() => setSelectedCountdown(opt)}>
                          <Text style={[
                            styles.countdownOption,
                            selectedCountdown === opt && styles.countdownOptionActive,
                          ]}>
                            {opt}
                          </Text>
                        </Pressable>
                        {index < COUNTDOWN_OPTIONS.length - 1 && (
                          <Text style={styles.countdownDivider}>|</Text>
                        )}
                      </React.Fragment>
                    ))}
                  </View>
                )}
              </View>
            )}

            {/* 敲击间隔滑块 */}
            {playMode === 'auto' && (
              <View style={styles.sliderBlock}>
                <Text style={styles.sliderLabel}>敲击间隔 (0.5)s</Text>
                <View style={styles.sliderRow}>
                  <View style={styles.sliderThumb} />
                  <View style={styles.sliderTrack} />
                </View>
              </View>
            )}

            {/* 音色选择 */}
            <View style={styles.soundBlock}>
              <Text style={styles.sectionLabel}>音色</Text>
              <View style={styles.soundGrid}>
                {SOUNDS.map((s) => (
                  <Pressable
                    key={s.id}
                    style={[
                      styles.soundCell,
                      s.id === selectedSound && styles.soundCellSelected,
                    ]}
                    onPress={() => !s.locked && setSelectedSound(s.id)}
                  >
                    {s.locked && (
                      <View style={styles.buyBadge}>
                        <Text style={styles.buyText}>BUY</Text>
                      </View>
                    )}
                    <Text
                      style={[
                        styles.soundLabel,
                        s.bold && styles.soundLabelBold,
                      ]}
                    >
                      {s.id}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* 链接区 */}
            <View style={styles.linksSection}>
              <Pressable style={styles.menuRow}>
                <Text style={styles.menuText}>发表评论</Text>
              </Pressable>

              <Pressable style={styles.menuRow}>
                <Text style={styles.menuText}>分享此App</Text>
              </Pressable>

              <Pressable style={styles.menuRow}>
                <Text style={styles.menuText}>购买</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  topBar: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  infinityIcon: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  panel: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    marginHorizontal: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333',
  },
  closeBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '300',
  },
  headerInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    paddingVertical: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#555',
  },
  scroll: {
    flex: 1,
  },
  sliderBlock: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sliderLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 18,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  sliderThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderTrack: {
    flex: 1,
    height: 2,
    backgroundColor: '#444',
    marginLeft: -6,
  },
  soundBlock: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  sectionLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 14,
  },
  soundGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  soundCell: {
    width: 58,
    height: 58,
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  soundCellSelected: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  buyBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#3D8B3D',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderBottomLeftRadius: 4,
  },
  buyText: {
    color: '#FFFFFF',
    fontSize: 7,
    fontWeight: 'bold',
  },
  soundLabel: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  soundLabelBold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  linksSection: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  menuRow: {
    paddingVertical: 16,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#333',
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  segmentBlock: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    padding: 3,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentBtnActive: {
    backgroundColor: '#636366',
  },
  segmentText: {
    color: '#8E8E93',
    fontSize: 14,
  },
  segmentTextActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  countdownOption: {
    color: '#8E8E93',
    fontSize: 13,
    paddingHorizontal: 6,
  },
  countdownOptionActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  countdownDivider: {
    color: '#444',
    fontSize: 13,
  },
  footer: {
    color: '#555',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 24,
  },
});
