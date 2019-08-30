import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash';
import { spy } from 'sinon';
import TopMenuBar from './TopMenuBar';

const DEFAULT_PROPS = {
  currentTab: 'home',
  switchTabHome: noop,
  switchTabAbout: noop
};

describe('<TopMenuBar />', () => {
  function renderWithProps(props) {
    const container = mount(<TopMenuBar {...DEFAULT_PROPS} {...props} />);

    return {
      container,
      getLinkByDataId: dataId => container.find(`a[data-id="${dataId}"]`)
    };
  }

  it('should be defined', () => {
    renderWithProps();
  });

  it('should call switchTabHome', () => {
    const switchTabHome = spy();
    const { getLinkByDataId } = renderWithProps({ switchTabHome });
    getLinkByDataId('TOP_MENU_HOME_BTN').simulate('click');
    expect(switchTabHome.called).toEqual(true);
  });

  it('should call switchTabAbout', () => {
    const switchTabAbout = spy();
    const { getLinkByDataId } = renderWithProps({ switchTabAbout });
    getLinkByDataId('TOP_MENU_ABOUT_BTN').simulate('click');
    expect(switchTabAbout.called).toEqual(true);
  });
});
