import {
  SWITCH_TAB_HOME,
  SWITCH_TAB_ABOUT,
  SWITCH_TAB_PROJECT,
  SWITCH_TAB_BLOG
} from '../actions/actionTypes/topMenuBarActionTypes';

const initialState = {
  currentTab: 'home'
};

export default (state = initialState, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case SWITCH_TAB_ABOUT:
    case SWITCH_TAB_HOME:
    case SWITCH_TAB_PROJECT:
    case SWITCH_TAB_BLOG:
      return {
        currentTab: payload
      };
    default:
      return state;
  }
};
