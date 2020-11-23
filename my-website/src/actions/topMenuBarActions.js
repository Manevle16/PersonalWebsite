import {
  SWITCH_TAB_HOME,
  SWITCH_TAB_ABOUT,
  SWITCH_TAB_PROJECT,
  SWITCH_TAB_BLOG,
} from './actionTypes/topMenuBarActionTypes';

export const switchTabHome = () => ({
  type: SWITCH_TAB_HOME,
  payload: '',
});

export const switchTabAbout = () => ({
  type: SWITCH_TAB_ABOUT,
  payload: 'about',
});

export const switchTabProject = () => ({
  type: SWITCH_TAB_PROJECT,
  payload: 'projects',
});

export const switchTabBlog = () => ({
  type: SWITCH_TAB_BLOG,
  payload: 'blog',
});
