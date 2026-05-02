import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WoodenFish from '../WoodenFish';

describe('WoodenFish Component', () => {
  it('renders correctly and responds to press', () => {
    const { getByTestId } = render(<WoodenFish />);

    const pressable = getByTestId('wooden-fish-pressable');
    expect(pressable).toBeTruthy();

    fireEvent(pressable, 'pressIn');
    fireEvent(pressable, 'pressOut');
  });
});
