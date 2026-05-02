import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WoodenFish from '../components/WoodenFish';
import SettingsPanel from '../components/SettingsPanel';

export default function PlayerScreen() {
  const [instrumentPanelVisible, setInstrumentPanelVisible] = useState(false);
  const [strikes, setStrikes] = useState(0);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* 顶部栏：提供收起 (Minimize) 按钮 */}
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.iconBtn}
            accessibilityRole="button"
            accessibilityLabel="收起播放器"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-down" size={28} color="#A1A1A6" />
          </Pressable>
          <View style={styles.placeholder} />
        </View>

        {/* 计数区 */}
        <View style={styles.counterSection}>
          <Text style={styles.counterNumber}>{strikes}</Text>
          <Text style={styles.counterLabel}>STRIKES</Text>
        </View>

        {/* 核心木鱼交互区域与同心圆背景 */}
        <View style={styles.mainContent}>
          <View style={[styles.circleRing, { width: 260, height: 260 }]} />
          <View style={[styles.circleRing, { width: 330, height: 330 }]} />
          <WoodenFish />
        </View>

        {/* 底部信息与按钮区 */}
        <View style={styles.footerSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoCol}>
              <Text style={styles.infoValue}>自动</Text>
              <Text style={styles.infoTitle}>模式</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoCol}>
              <Text style={styles.infoValue}>0.5s</Text>
              <Text style={styles.infoTitle}>间隔</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoCol}>
              <Text style={styles.infoValue}>木鱼</Text>
              <Text style={styles.infoTitle}>乐器</Text>
            </View>
          </View>

          <Pressable style={styles.adjustBtn} onPress={() => setInstrumentPanelVisible(true)}>
            <Text style={styles.adjustBtnText}>— 调整法器 —</Text>
          </Pressable>
        </View>
      </View>

      {/* 底部法器/调音台面板 */}
      <SettingsPanel
        visible={instrumentPanelVisible}
        onClose={() => setInstrumentPanelVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000', // 沉浸态播放器必须是纯黑
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 10,
    height: 50,
  },
  iconBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  placeholder: {
    width: 44,
  },
  counterSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  counterNumber: {
    fontSize: 90,
    fontWeight: '200',
    color: '#333333',
    lineHeight: 100,
  },
  counterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444444',
    letterSpacing: 4,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 20,
  },
  circleRing: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#111111',
  },
  footerSection: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
  },
  infoCol: {
    alignItems: 'center',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: '#D1D1D6',
    fontWeight: '500',
    marginBottom: 6,
  },
  infoTitle: {
    fontSize: 12,
    color: '#555555',
    fontWeight: '400',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#333333',
  },
  adjustBtn: {
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#050505',
  },
  adjustBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 1,
  },
});
