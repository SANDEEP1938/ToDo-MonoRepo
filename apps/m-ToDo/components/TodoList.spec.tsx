import React from 'react';
import { render } from '@testing-library/react-native';
import TodoList from './TodoList';

describe('TodoList', () => {
  it('should render successfully', () => {
    const { root } = render(< TodoList />);
    expect(root).toBeTruthy();
  });
});
