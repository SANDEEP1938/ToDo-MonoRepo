import React from 'react';
import { render } from '@testing-library/react-native';
import TodoInput from './TodoInput';

describe('TodoInput', () => {
  it('should render successfully', () => {
    const { root } = render(< TodoInput />);
    expect(root).toBeTruthy();
  });
});
