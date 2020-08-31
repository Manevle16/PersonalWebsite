import { SWITCH_TAB_ABOUT } from '../actions/actionTypes/topMenuBarActionTypes';
import topMenuBarReducer from './topMenuBarReducer';

describe('topMenuBarReducer', () => {
  it('should return default state', () => {
    const result = topMenuBarReducer(undefined, {});
    expect(result).toEqual({ currentTab: '' });
  });

  it('should return correct payload on switching tab', () => {
    const result = topMenuBarReducer(null, {
      type: SWITCH_TAB_ABOUT,
      payload: 'mock'
    });
    expect(result).toEqual({ currentTab: 'mock' });
  });
});
