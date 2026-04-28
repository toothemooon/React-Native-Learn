import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function WoodenFish() {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={({ pressed }) => [
        styles.container,
        { transform: [{ scale: pressed ? 0.95 : 1 }] },
      ]}
    >
      <Svg width="200" height="200" viewBox="0 0 200 200">
        {/* 用一个简单的矢量图形模拟木鱼。按下变成纯白，松开变成暗灰 */}
        <Path
          d="M20 120 C20 40 180 30 190 100 C200 170 120 190 80 180 C40 170 20 150 20 120 Z"
          fill={isPressed ? '#FFFFFF' : '#3A3A3C'}
        />
        {/* 中间的开口刻痕，保持为黑色，透出背景 */}
        <Path
          d="M50 110 C80 95 140 110 180 105"
          stroke="#000000"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
