import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { noop } from 'lodash';
import { spy } from 'sinon';
import cookie from 'react-cookies';
import AccountDropdown from './AccountDropdown';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import initialStore from '../../../mock/store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const DEFAULT_PROPS = {
  checkIfLoggedIn: noop,
  isLoggedIn: false
};

function renderWithProps(props) {
  const container = mount(
    <Provider store={mockStore(initialStore)}>
      <AccountDropdown {...DEFAULT_PROPS} {...props} />{' '}
    </Provider>
  );

  return {
    container,
    getLinkByDataId: dataId => container.find(`a[data-id="${dataId}"]`)
  };
}

describe('AccountDropdown', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('should be defined', () => {
    renderWithProps({ isLoggedIn: true });
  });

  it('should call checkIfLoggedIn when userId and token cookies are present', () => {
    cookie.save('userId', 'mockId');
    cookie.save('token', 'mocktoken');
    const checkIfLoggedIn = spy();
    renderWithProps({ checkIfLoggedIn });
    expect(checkIfLoggedIn.calledOnce).toEqual(true);
  });

  it('Should show Modal when Sign in button is clicked', () => {
    const { getLinkByDataId, container } = renderWithProps();
    expect(
      container
        .find(`[data-id='SIGN_UP_MODAL']`)
        .at(0)
        .props().show
    ).toEqual(false);
    getLinkByDataId('SIGN_IN_MENU_BTN').simulate('click');
    expect(
      container
        .find(`[data-id='SIGN_UP_MODAL']`)
        .at(0)
        .props().show
    ).toEqual(true);
  });

  it('Should call handleSingInClose', () => {
    const container = shallow(<AccountDropdown {...DEFAULT_PROPS} />);
    container.instance().onClickSignIn();
    expect(container.state('showSignUp')).toBeTruthy();
    container.instance().handleSignInClose();
    expect(container.state('showSignUp')).toBeFalsy();
  });
});
