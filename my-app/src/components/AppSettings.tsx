import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, Switch } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function AppSettings({ visible, onClose }: Props) {
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [healthSync, setHealthSync] = useState(false);

  return (
    <Modal visible={visible} transparent={false} animationType="slide">
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>设置</Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>完成</Text>
            </Pressable>
          </View>

          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            
            {/* 体验配置 */}
            <Text style={styles.sectionTitle}>体验</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.rowLeft}>
                  <View style={[styles.iconBox, { backgroundColor: '#FF9500' }]}>
                    <Ionicons name="phone-portrait-outline" size={16} color="#FFF" />
                  </View>
                  <Text style={styles.rowText}>全局物理震动</Text>
                </View>
                <Switch 
                  value={hapticsEnabled} 
                  onValueChange={setHapticsEnabled}
                  trackColor={{ false: '#333', true: '#32D74B' }}
                />
              </View>
              <View style={styles.divider} />
              <View style={styles.row}>
                <View style={styles.rowLeft}>
                  <View style={[styles.iconBox, { backgroundColor: '#FF3B30' }]}>
                    <Ionicons name="heart" size={16} color="#FFF" />
                  </View>
                  <Text style={styles.rowText}>Apple Health 冥想同步</Text>
                </View>
                <Switch 
                  value={healthSync} 
                  onValueChange={setHealthSync}
                  trackColor={{ false: '#333', true: '#32D74B' }} 
                />
              </View>
            </View>

            {/* 支持与购买 */}
            <Text style={styles.sectionTitle}>支持</Text>
            <View style={styles.card}>
              <Pressable style={styles.row}>
                <Text style={styles.rowText}>恢复购买</Text>
                <Ionicons name="chevron-forward" size={18} color="#666" />
              </Pressable>
              <View style={styles.divider} />
              <Pressable style={styles.row}>
                <Text style={styles.rowText}>分享给朋友</Text>
                <Ionicons name="share-outline" size={18} color="#666" />
              </Pressable>
              <View style={styles.divider} />
              <Pressable style={styles.row}>
                <Text style={styles.rowText}>去 App Store 评价</Text>
                <Ionicons name="star-outline" size={18} color="#666" />
              </Pressable>
            </View>

            {/* 关于 */}
            <Text style={styles.sectionTitle}>关于</Text>
            <View style={styles.card}>
              <Pressable style={styles.row}>
                <Text style={styles.rowText}>隐私政策</Text>
                <Ionicons name="chevron-forward" size={18} color="#666" />
              </Pressable>
              <View style={styles.divider} />
              <Pressable style={styles.row}>
                <Text style={styles.rowText}>服务条款</Text>
                <Ionicons name="chevron-forward" size={18} color="#666" />
              </Pressable>
            </View>

            <Text style={styles.versionText}>WoodenFish v1.0.0</Text>

          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1E',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  closeBtn: {
    paddingVertical: 4,
  },
  closeText: {
    color: '#0A84FF', // iOS 蓝
    fontSize: 16,
    fontWeight: '500',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  sectionTitle: {
    color: '#888',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 12,
    marginTop: 24,
  },
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowText: {
    color: '#FFF',
    fontSize: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#333',
    marginLeft: 56, // 刚好对齐文字
  },
  versionText: {
    color: '#555',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
});
