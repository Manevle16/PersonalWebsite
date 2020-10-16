import React from 'react';
import { render } from '@testing-library/react';
import Website from './Website';

describe('<Website />', () => {
  it('Renders correctly', () => {
    render(<Website />);
  });
});
