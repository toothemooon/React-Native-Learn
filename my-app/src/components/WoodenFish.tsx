import React, { useState, useRef } from 'react';
import { Pressable, StyleSheet, Animated, View } from 'react-native';
import Svg, { Path, Defs, RadialGradient, Stop, Circle } from 'react-native-svg';

export default function WoodenFish() {
  const [isPressed, setIsPressed] = useState(false);
  
  // 水波纹动画 (Ripple Animation)
  const rippleScale = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    setIsPressed(true);
    
    // 重置并触发涟漪动画
    rippleScale.setValue(0);
    rippleOpacity.setValue(0.4);
    Animated.parallel([
      Animated.timing(rippleScale, {
        toValue: 2.5,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(rippleOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <View style={styles.wrapper}>
      {/* 涟漪背景层 */}
      <Animated.View style={[
        styles.ripple,
        {
          transform: [{ scale: rippleScale }],
          opacity: rippleOpacity,
        }
      ]} pointerEvents="none" />
      
      {/* 木鱼交互层 */}
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel="敲击木鱼"
        accessibilityHint="点击以敲击木鱼"
        style={({ pressed }) => [
          styles.container,
          { transform: [{ scale: pressed ? 0.96 : 1 }] },
        ]}
      >
        <Svg width="220" height="220" viewBox="0 0 220 220">
          <Defs>
            {/* 更自然的高级黑/深灰色光影渐变 */}
            <RadialGradient id="woodGrad" cx="50%" cy="25%" r="75%">
              <Stop offset="0%" stopColor={isPressed ? "#8A8A8E" : "#4A4A4C"} />
              <Stop offset="50%" stopColor={isPressed ? "#636366" : "#2C2C2E"} />
              <Stop offset="100%" stopColor={isPressed ? "#3A3A3C" : "#1C1C1E"} />
            </RadialGradient>
          </Defs>
          
          {/* 底部物理阴影 */}
          <Path
            d="M 30 110 C 30 50, 190 50, 190 110 C 190 170, 30 170, 30 110 Z"
            fill="rgba(0,0,0,0.6)"
            transform={isPressed ? "translate(0, 2) scale(0.98)" : "translate(0, 10)"}
          />

          {/* 木鱼主腔体 - 更圆润对称的鹅卵石/圆钵造型 */}
          <Path
            d="M 25 110 C 25 35, 195 35, 195 110 C 195 185, 25 185, 25 110 Z"
            fill="url(#woodGrad)"
          />

          {/* 开口刻痕：居中且弧度更平缓，带末端圆孔 */}
          <Path
            d="M 55 125 Q 110 110, 165 125"
            stroke="#0A0A0B"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          {/* 刻痕两端的经典小圆孔 */}
          <Circle cx="55" cy="125" r="6" fill="#0A0A0B" />
          <Circle cx="165" cy="125" r="6" fill="#0A0A0B" />
        </Svg>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  ripple: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  }
});
