import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { useNavigation } from '@react-navigation/native';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Mock safe area view
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock Ionicons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('HomeScreen', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  it('renders greeting text correctly', () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText('夜深了')).toBeTruthy();
    expect(getByText('开启今晚的静心之旅')).toBeTruthy();
    expect(getByText('今日推荐 · Daily Zen')).toBeTruthy();
  });

  it('navigates to PlayerModal when hero card is pressed', () => {
    const { getByText } = render(<HomeScreen />);

    const heroCard = getByText('今日推荐 · Daily Zen');
    fireEvent.press(heroCard);

    expect(mockNavigate).toHaveBeenCalledWith('PlayerModal');
  });
});
