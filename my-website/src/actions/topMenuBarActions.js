import {
  SWITCH_TAB_HOME,
  SWITCH_TAB_ABOUT
} from './actionTypes/topMenuBarActionTypes';

export const switchTabHome = () => {
  return {
    type: SWITCH_TAB_HOME,
    payload: 'home'
  };
};

export const switchTabAbout = () => {
  return {
    type: SWITCH_TAB_ABOUT,
    payload: 'about'
  };
};
