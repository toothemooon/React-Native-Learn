import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import PlayerScreen from '../screens/PlayerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { MainTabsParamList, RootStackParamList } from './types';

// 占位页
function JourneyScreen() {
  return <View style={styles.placeholder}><Text style={styles.text}>历程 (Journey)</Text></View>;
}

const Tab = createBottomTabNavigator<MainTabsParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

// 底层悬浮 3 向 Tab
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#D4FF59',
        tabBarInactiveTintColor: '#666',
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 11, marginBottom: 8, fontWeight: '500' },
        tabBarIcon: ({ color, focused }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'home-outline';
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Journey') iconName = focused ? 'leaf' : 'leaf-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          
          return <Ionicons name={iconName} size={24} color={color} style={{ marginTop: 8 }} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '禅境' }} />
      <Tab.Screen name="Journey" component={JourneyScreen} options={{ title: '历程' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: '我的' }} />
    </Tab.Navigator>
  );
}

// 根路由（生态 + 播放器 Modal）
export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen 
        name="PlayerModal" 
        component={PlayerScreen} 
        options={{ 
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }} 
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 30,
    left: 24,
    right: 24,
    height: 68,
    backgroundColor: 'rgba(21, 23, 26, 0.95)', // 半透明玻璃质感
    borderRadius: 34,
    borderTopWidth: 0,
    elevation: 0, // Android 去阴影
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#0B0D11',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#555',
    fontSize: 16,
    letterSpacing: 2,
  }
});
