import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import WoodenFish from './src/components/WoodenFish';
import SettingsPanel from './src/components/SettingsPanel';

export default function App() {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [strikes, setStrikes] = useState(0);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* 顶部栏：时间交给系统状态栏，右上角设置按钮 */}
          <View style={styles.header}>
            <View /> {/* 左侧占位 */}
            <Pressable onPress={() => setSettingsVisible(true)} style={styles.settingsBtn}>
              <Ionicons name="settings-outline" size={22} color="#A1A1A6" />
            </Pressable>
          </View>

          {/* 计数区 */}
          <View style={styles.counterSection}>
            <Text style={styles.counterNumber}>{strikes}</Text>
            <Text style={styles.counterLabel}>STRIKES</Text>
          </View>

          {/* 核心木鱼交互区域与同心圆背景 */}
          <View style={styles.mainContent}>
            {/* 背景同心圆 */}
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

            <Pressable style={styles.adjustBtn} onPress={() => setSettingsVisible(true)}>
              <Text style={styles.adjustBtnText}>— 调整设置 —</Text>
            </Pressable>
          </View>

          <StatusBar style="light" />
        </View>

        <SettingsPanel
          visible={settingsVisible}
          onClose={() => setSettingsVisible(false)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
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
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  counterNumber: {
    fontSize: 90,
    fontWeight: '200',
    color: '#333333', // 极简暗灰
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
    borderColor: '#111111', // 极暗的同心圆
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
