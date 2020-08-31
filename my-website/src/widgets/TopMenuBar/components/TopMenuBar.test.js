import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { noop } from 'lodash';
import { spy } from 'sinon';
import TopMenuBar from './TopMenuBar';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import initialStore from '../../../mock/store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const DEFAULT_PROPS = {
  currentTab: '',
  currentPath: '/',
  switchTabHome: noop,
  switchTabAbout: noop,
  switchTabProject: noop,
  switchTabBlog: noop
};

describe('<TopMenuBar />', () => {
  function renderWithProps(props) {
    const container = mount(
      <Provider store={mockStore(initialStore)}>
        <TopMenuBar {...DEFAULT_PROPS} {...props} />
      </Provider>
    );

    return {
      container,
      getLinkByDataId: dataId => container.find(`a[data-id="${dataId}"]`)
    };
  }

  it('should be defined', () => {
    renderWithProps({ currentPath: '/blog' });
    renderWithProps({ currentPath: '/projects' });
  });

  //Test clicking of tabs
  it('should call switchTabHome when home tab clicked', () => {
    const switchTabHome = spy();
    const { getLinkByDataId } = renderWithProps({ switchTabHome });
    getLinkByDataId('TOP_MENU_HOME_BTN').simulate('click');
    expect(switchTabHome.called).toEqual(true);
  });

  it('should call switchTabAbout when about tab clicked', () => {
    const switchTabAbout = spy();
    const { getLinkByDataId } = renderWithProps({ switchTabAbout });
    getLinkByDataId('TOP_MENU_ABOUT_BTN').simulate('click');
    expect(switchTabAbout.called).toEqual(true);
  });

  it('should call switchTabProject when about tab clicked', () => {
    const switchTabProject = spy();
    const { getLinkByDataId } = renderWithProps({ switchTabProject });
    getLinkByDataId('TOP_MENU_PROJECT_BTN').simulate('click');
    expect(switchTabProject.called).toEqual(true);
  });

  it('should call switchTabBlog when about tab clicked', () => {
    const switchTabBlog = spy();
    const { getLinkByDataId } = renderWithProps({ switchTabBlog });
    getLinkByDataId('TOP_MENU_BLOG_BTN').simulate('click');
    expect(switchTabBlog.called).toEqual(true);
  });

  it('should set currentTab to about on mount', () => {
    const { container } = renderWithProps({ currentPath: '/about' });
    setTimeout(() => {
      expect(container.prop('currentTab')).toEqual('about');
    }, 0);
  });
});
