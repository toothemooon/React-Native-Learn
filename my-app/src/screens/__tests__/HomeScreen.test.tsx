import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(() => ({
      navigate: jest.fn(),
    })),
  };
});

describe('HomeScreen Component', () => {
  it('renders greeting texts correctly', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('夜深了')).toBeTruthy();
    expect(getByText('开启今晚的静心之旅')).toBeTruthy();
  });

  it('navigates to PlayerModal when hero card is pressed', () => {
    const navigateMock = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: navigateMock });

    const { getByText } = render(<HomeScreen />);
    const heroCardText = getByText('开始沉浸');

    fireEvent.press(heroCardText);
    expect(navigateMock).toHaveBeenCalledWith('PlayerModal');
  });
});
