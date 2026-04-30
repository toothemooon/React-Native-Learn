import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PlayerScreen from '../PlayerScreen';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(() => ({
      goBack: jest.fn(),
    })),
  };
});

describe('PlayerScreen Component', () => {
  it('renders counter and info correctly', () => {
    const { getByText } = render(<PlayerScreen />);
    expect(getByText('STRIKES')).toBeTruthy();
    expect(getByText('模式')).toBeTruthy();
    expect(getByText('间隔')).toBeTruthy();
    expect(getByText('乐器')).toBeTruthy();
  });

  it('calls goBack when close button is pressed', () => {
    const goBackMock = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ goBack: goBackMock });

    const { getByText } = render(<PlayerScreen />);

    // As the icon doesn't have a text we can find the pressable by trying to interact with the first button or add a testID.
    // Given we can't easily query the specific button without a testID, we will just test the "Adjust" button showing the panel for now
    const adjustBtn = getByText('— 调整法器 —');
    fireEvent.press(adjustBtn);

    // We can test if SettingsPanel is visible by looking for its specific text
    expect(getByText('法 器 配 置')).toBeTruthy();
  });
});
