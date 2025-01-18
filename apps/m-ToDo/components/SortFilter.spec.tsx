import React from 'react';
import { render } from '@testing-library/react-native';
import SortFilter from './SortFilter';

describe('SortFilter', () => {
  it('should render successfully', () => {
    const { root } = render(< SortFilter />);
    expect(root).toBeTruthy();
  });
});
