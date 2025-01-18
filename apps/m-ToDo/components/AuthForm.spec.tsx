import React from 'react';
import { render } from '@testing-library/react-native';
import AuthForm from './AuthForm';

describe('AuthForm', () => {
  it('should render successfully', () => {
    const { root } = render(< AuthForm />);
    expect(root).toBeTruthy();
  });
});
