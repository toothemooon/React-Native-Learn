import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WoodenFish from './src/components/WoodenFish';
import SettingsPanel from './src/components/SettingsPanel';

export default function App() {
  const [settingsVisible, setSettingsVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 顶部导航栏 */}
        <View style={styles.header}>
          <Pressable onPress={() => setSettingsVisible(true)} style={styles.iconButton}>
            <Ionicons name="settings-sharp" size={32} color="#777777" />
          </Pressable>

          <Pressable onPress={() => console.log('切换模式')} style={styles.iconButton}>
            <Ionicons name="infinite" size={32} color="#FFFFFF" />
          </Pressable>
          
          {/* 为了居中对齐，右侧放一个空的等宽占位 view */}
          <View style={{ width: 44, height: 44 }} />
        </View>

        {/* 核心木鱼交互区域 */}
        <View style={styles.mainContent}>
          <WoodenFish />
        </View>

        <StatusBar style="light" />
      </View>

      <SettingsPanel
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
    </SafeAreaView>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    height: 60,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
