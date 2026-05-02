import React from 'react';
import { Animated } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import WoodenFish from '../WoodenFish';

describe('WoodenFish Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<WoodenFish />);
    expect(getByTestId('wooden-fish-pressable')).toBeDefined();
  });

  it('triggers ripple animation on pressIn', () => {
    // Spy on Animated.timing
    const timingSpy = jest.spyOn(Animated, 'timing');
    const parallelSpy = jest.spyOn(Animated, 'parallel');

    const { getByTestId } = render(<WoodenFish />);
    const pressable = getByTestId('wooden-fish-pressable');

    fireEvent(pressable, 'pressIn');

    // Verify Animated.parallel is called
    expect(parallelSpy).toHaveBeenCalled();

    // Verify Animated.timing is called with expected parameters for ripple scale and opacity
    const scaleTimingCall = timingSpy.mock.calls.find(
      (call) => call[1].toValue === 2.5
    );
    expect(scaleTimingCall).toBeDefined();
    expect(scaleTimingCall?.[1]).toMatchObject({
      duration: 400,
      useNativeDriver: true,
    });

    const opacityTimingCall = timingSpy.mock.calls.find(
      (call) => call[1].toValue === 0
    );
    expect(opacityTimingCall).toBeDefined();
    expect(opacityTimingCall?.[1]).toMatchObject({
      duration: 400,
      useNativeDriver: true,
    });
  });

  it('updates visual state on pressOut', () => {
    const { getByTestId } = render(<WoodenFish />);
    const pressable = getByTestId('wooden-fish-pressable');
    const shadowPath = getByTestId('shadow-path');

    // Initial state: matrix represents translate(0, 10)
    expect(shadowPath.props.matrix).toEqual([1, 0, 0, 1, 0, 10]);

    // PressIn to set isPressed to true
    fireEvent(pressable, 'pressIn');

    // Verify pressed state: matrix represents translate(0, 2) scale(0.98)
    // Scale 0.98 is [0.98, 0, 0, 0.98, 0, 2]
    expect(shadowPath.props.matrix).toEqual([0.98, 0, 0, 0.98, 0, 2]);

    // PressOut to set isPressed to false
    fireEvent(pressable, 'pressOut');

    // Verify released state: back to translate(0, 10)
    expect(shadowPath.props.matrix).toEqual([1, 0, 0, 1, 0, 10]);
  });
});
