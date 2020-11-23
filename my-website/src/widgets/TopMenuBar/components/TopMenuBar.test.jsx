import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TopMenuBar from './TopMenuBar';
import initialStore from '../../../mock/store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const DEFAULT_PROPS = {
  currentTab: '',
  currentPath: '/',
  switchTabHome: () => {},
  switchTabAbout: () => {},
  switchTabProject: () => {},
  switchTabBlog: () => {},
};

describe('<TopMenuBar />', () => {
  function renderWithProps(props) {
    const container = render(
      <Provider store={mockStore(initialStore)}>
        <TopMenuBar {...DEFAULT_PROPS} {...props} />
      </Provider>,
    );

    return {
      ...container,
    };
  }

  it('should be defined', () => {
    renderWithProps({ currentPath: '/blog' });
    renderWithProps({ currentPath: '/projects' });
  });

  // Test clicking of tabs
  it('should call switchTabHome when home tab clicked', () => {
    const switchTabHome = jest.fn();
    const { getByTestId } = renderWithProps({ switchTabHome });
    fireEvent.click(getByTestId('TOP_MENU_HOME_BTN'));
    expect(switchTabHome).toBeCalled();
  });

  it('should call switchTabAbout when about tab clicked', () => {
    const switchTabAbout = jest.fn();
    const { getByTestId } = renderWithProps({ switchTabAbout });
    fireEvent.click(getByTestId('TOP_MENU_ABOUT_BTN'));
    expect(switchTabAbout).toBeCalled();
  });

  it('should call switchTabProject when about tab clicked', () => {
    const switchTabProject = jest.fn();
    const { getByTestId } = renderWithProps({ switchTabProject });
    fireEvent.click(getByTestId('TOP_MENU_PROJECT_BTN'));
    expect(switchTabProject).toBeCalled();
  });

  it('should call switchTabBlog when about tab clicked', () => {
    const switchTabBlog = jest.fn();
    const { getByTestId } = renderWithProps({ switchTabBlog });
    fireEvent.click(getByTestId('TOP_MENU_BLOG_BTN'));
    expect(switchTabBlog).toBeCalled();
  });

  it('should set currentTab to about on mount', async () => {
    const switchTabAbout = jest.fn();
    renderWithProps({ currentPath: '/about', switchTabAbout });
    setTimeout(() => {
      expect(switchTabAbout).toBeCalled();
    }, 0);
  });
});
