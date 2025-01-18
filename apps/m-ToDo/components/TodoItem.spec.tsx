import React from 'react';
import { render } from '@testing-library/react-native';
import TodoItem from './TodoItem';

describe('TodoItem', () => {
  it('should render successfully', () => {
    const { root } = render(< TodoItem />);
    expect(root).toBeTruthy();
  });
});
