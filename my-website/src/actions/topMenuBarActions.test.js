import {
  switchTabHome,
  switchTabAbout,
  switchTabProject,
  switchTabBlog,
} from './topMenuBarActions';
import {
  SWITCH_TAB_HOME,
  SWITCH_TAB_ABOUT,
  SWITCH_TAB_PROJECT,
  SWITCH_TAB_BLOG,
} from './actionTypes/topMenuBarActionTypes';

describe('topMenuBarActions', () => {
  it('should correctly execute `switchTabHome`', () => {
    const result = switchTabHome();
    expect(result).toEqual({ type: SWITCH_TAB_HOME, payload: '' });
  });

  it('should correctly execute `switchTabAbout`', () => {
    const result = switchTabAbout();
    expect(result).toEqual({
      type: SWITCH_TAB_ABOUT,
      payload: 'about',
    });
  });

  it('should correctly execute `switchTabProject', () => {
    const result = switchTabProject();
    expect(result).toEqual({
      type: SWITCH_TAB_PROJECT,
      payload: 'projects',
    });
  });

  it('should correctly execute `switchTabBlog`', () => {
    const result = switchTabBlog();
    expect(result).toEqual({
      type: SWITCH_TAB_BLOG,
      payload: 'blog',
    });
  });
});
