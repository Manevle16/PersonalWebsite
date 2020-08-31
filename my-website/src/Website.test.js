import React from 'react';
import { mount } from 'enzyme';
import Website from './Website';

describe('<Website />', () => {
  const renderWithProps = props => {
    const container = mount(<Website {...props} />);

    return {
      container
    };
  };

  it('Renders correctly', () => {
    renderWithProps();
  });
});
