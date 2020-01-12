import {
  SWITCH_TAB_HOME,
  SWITCH_TAB_ABOUT,
  SWITCH_TAB_PROJECT,
  SWITCH_TAB_BLOG
} from './actionTypes/topMenuBarActionTypes';

export const switchTabHome = () => {
  return {
    type: SWITCH_TAB_HOME,
    payload: ''
  };
};

export const switchTabAbout = () => {
  return {
    type: SWITCH_TAB_ABOUT,
    payload: 'about'
  };
};

export const switchTabProject = () => {
  return {
    type: SWITCH_TAB_PROJECT,
    payload: 'projects'
  };
};

export const switchTabBlog = () => {
  return {
    type: SWITCH_TAB_BLOG,
    payload: 'blog'
  };
};
