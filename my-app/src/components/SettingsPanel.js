import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Switch,
  Modal,
  SafeAreaView,
} from 'react-native';

const SOUNDS = [
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

export default function SettingsPanel({ visible, onClose }) {
  const [selectedSound, setSelectedSound] = useState('00');
  const [binarySwitch, setBinarySwitch] = useState(false);

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
            {/* 敲击间隔滑块 */}
            <View style={styles.sliderBlock}>
              <Text style={styles.sliderLabel}>敲击间隔 (0.5)s</Text>
              <View style={styles.sliderRow}>
                <View style={styles.sliderThumb} />
                <View style={styles.sliderTrack} />
              </View>
            </View>

            {/* 间隔偏差程度滑块 */}
            <View style={styles.sliderBlock}>
              <Text style={styles.sliderLabel}>间隔偏差程度 (1%)</Text>
              <View style={styles.sliderRow}>
                <View style={styles.sliderThumb} />
                <View style={styles.sliderTrack} />
              </View>
            </View>

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

            {/* 联系 & 链接区 */}
            <View style={styles.linksSection}>
              <Text style={styles.contactText}>
                {'联系作者:\nninerwong@outlook.com'}
              </Text>

              <Pressable style={styles.menuRow}>
                <Text style={styles.menuText}>发表评论</Text>
              </Pressable>

              <Pressable style={styles.menuRow}>
                <Text style={styles.menuText}>分享此App</Text>
              </Pressable>

              <Pressable style={styles.menuRow}>
                <Text style={styles.menuText}>购买</Text>
              </Pressable>

              <Pressable style={[styles.menuRow, styles.highlightRow]}>
                <Text style={styles.menuText}>作者的其他app</Text>
              </Pressable>

              <Pressable style={styles.menuRow}>
                <Text style={styles.menuText}>历史记录</Text>
              </Pressable>

              {/* 二进制代码开关 */}
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>
                  在悬浮文字后面显示绿色二进制代码
                </Text>
                <Switch
                  value={binarySwitch}
                  onValueChange={setBinarySwitch}
                  trackColor={{ false: '#3A3A3C', true: '#4CD964' }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>

            {/* 版权页脚 */}
            <Text style={styles.footer}>粤ICP备2024208142号-2A</Text>
            <View style={{ height: 30 }} />
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
  contactText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 4,
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
  highlightRow: {
    backgroundColor: '#7B4F2E',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#333',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333',
  },
  toggleLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
    marginRight: 12,
  },
  footer: {
    color: '#555',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 24,
  },
});
