import {
  SWITCH_TAB_HOME,
  SWITCH_TAB_ABOUT
} from '../actions/actionTypes/topMenuBarActionTypes';

const initialState = {
  currentTab: 'home'
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SWITCH_TAB_ABOUT:
    case SWITCH_TAB_HOME:
      return {
        currentTab: payload
      };
    default:
      return state;
  }
};
