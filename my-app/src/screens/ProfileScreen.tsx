import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// 禅师的一些智慧语录（用于自动回复）
const ZEN_REPLIES = [
  '分心是自然的。注意到自己分心的那一刻，本身就是觉察。',
  '吸气，呼气。觉察身体的紧绷，然后轻轻释放它。',
  '每一声木鱼都是当下，声起，声落，无需强求，无需计数。',
  '烦恼即是菩提。在嘈杂的世界中，守住心中的这一方净土。',
  '修行不在于坐禅多久，而在于每一个当下的专注与安详。',
  '让思维像水中的波纹一样，自然升起，也自然散去。',
];

interface Message {
  id: string;
  sender: 'master' | 'user';
  text: string;
  subtext: string;
}

export default function ProfileScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'master',
      text: '今晚敲了 3 次，比昨天更专注了。每一声都是当下，不必计数。',
      subtext: '禅师 · 会话结束后',
    },
    {
      id: '2',
      sender: 'user',
      text: '我有时候会分心……',
      subtext: '你',
    },
    {
      id: '3',
      sender: 'master',
      text: '分心是自然的。注意到自己分心的那一刻，本身就是觉察。下次分心时，不用责怪，轻轻回来就好。',
      subtext: '禅师',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      subtext: '你',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // 滚动到底部
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

    // 模拟禅师回复
    setTimeout(() => {
      const randomReply = ZEN_REPLIES[Math.floor(Math.random() * ZEN_REPLIES.length)];
      const masterMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'master',
        text: randomReply,
        subtext: '禅师',
      };
      setMessages((prev) => [...prev, masterMsg]);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          {/* 顶部栏（AI 禅师头像及状态） */}
          <View style={styles.header}>
            <View style={styles.avatarRing}>
              <Text style={styles.avatarEmoji}>🧘</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>AI 禅师</Text>
              <Text style={styles.headerSubtitle}>随时倾听 · 当下即答</Text>
            </View>
          </View>

          {/* 聊天消息区 */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.chatArea}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.chatContent}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map((item) => {
              const isMaster = item.sender === 'master';
              return (
                <View
                  key={item.id}
                  style={[
                    styles.messageRow,
                    isMaster ? styles.messageRowMaster : styles.messageRowUser,
                  ]}
                >
                  <View
                    style={[
                      styles.bubble,
                      isMaster ? styles.bubbleMaster : styles.bubbleUser,
                    ]}
                  >
                    <Text style={[styles.bubbleText, isMaster ? styles.textMaster : styles.textUser]}>
                      {item.text}
                    </Text>
                  </View>
                  <Text style={[styles.subtext, isMaster ? styles.subtextMaster : styles.subtextUser]}>
                    {item.subtext}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          {/* 底部输入框 */}
          <View style={styles.inputDock}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="问问禅师..."
              placeholderTextColor="#555555"
              selectionColor="#D4FF59"
            />
            <Pressable 
              style={[
                styles.sendBtn,
                !inputText.trim() && { opacity: 0.5 }
              ]} 
              onPress={handleSend}
              accessibilityRole="button"
              accessibilityLabel="发送"
              disabled={!inputText.trim()}
              accessibilityState={{ disabled: !inputText.trim() }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="send" size={16} color="#D4FF59" />
            </Pressable>
          </View>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D11', // 深空暗夜蓝
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  avatarRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#15171A',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: '#888888',
    fontSize: 12,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 140, // 确保底部输入栏和 TabBar 不会遮挡最后一句话
    gap: 20,
  },
  messageRow: {
    maxWidth: '82%',
  },
  messageRowMaster: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageRowUser: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  bubbleMaster: {
    backgroundColor: '#15171A',
    borderLeftWidth: 3,
    borderLeftColor: '#D4FF59', // 禅师标志性的极细左绿条
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  bubbleUser: {
    backgroundColor: '#1A1C1E',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  textMaster: {
    color: '#E0E0E0',
  },
  textUser: {
    color: '#D1D1D6',
  },
  subtext: {
    fontSize: 11,
    color: '#555555',
    marginTop: 6,
  },
  subtextMaster: {
    marginLeft: 4,
  },
  subtextUser: {
    marginRight: 4,
  },
  inputDock: {
    position: 'absolute',
    bottom: 96, // 刚好浮在底部 Tab 导航之上
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#0B0D11',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#15171A',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 20,
    color: '#FFFFFF',
    fontSize: 15,
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#15171A',
    borderWidth: 1,
    borderColor: 'rgba(212, 255, 89, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
