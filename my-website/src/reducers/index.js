import { combineReducers } from 'redux';
import topMenuBarReducer from './topMenuBarReducer';
import { createSelector } from 'reselect';

export default combineReducers({
  topMenuBar: topMenuBarReducer
});

//TopMenuBar Selectors
export const getTopMenuBar = state => state.topMenuBar;
export const getCurrentTab = createSelector(
  getTopMenuBar,
  topMenuBar => topMenuBar.currentTab
);
