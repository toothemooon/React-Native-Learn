import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsPanel from '../SettingsPanel';

describe('SettingsPanel Component', () => {
  it('renders correctly when visible', () => {
    const { getByText } = render(
      <SettingsPanel visible={true} onClose={() => {}} />
    );
    expect(getByText('法 器 配 置')).toBeTruthy();
  });

  it('calls onClose when done button is pressed', () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <SettingsPanel visible={true} onClose={onCloseMock} />
    );

    const doneBtn = getByText('✓ 收起面板');
    fireEvent.press(doneBtn);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
