import { switchTabHome, switchTabAbout } from './topMenuBarActions';
import {
  SWITCH_TAB_HOME,
  SWITCH_TAB_ABOUT
} from './actionTypes/topMenuBarActionTypes';

describe('topMenuBarActions', () => {
  it('should correctly execute `switchTabHome`', () => {
    const result = switchTabHome();
    expect(result).toEqual({ type: SWITCH_TAB_HOME, payload: 'home' });
  });

  it('should correctly execute `switchTabAbout`', () => {
    const result = switchTabAbout();
    expect(result).toEqual({
      type: SWITCH_TAB_ABOUT,
      payload: 'about'
    });
  });
});
