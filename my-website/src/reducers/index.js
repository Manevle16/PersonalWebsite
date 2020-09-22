import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import topMenuBarReducer from './topMenuBarReducer';
import accountDropdownReducer from './accountDropdownReducer';
import config from '../config';

export default combineReducers({
  topMenuBar: topMenuBarReducer,
  accountDropdown: accountDropdownReducer,
  config,
});

//Config Selectors
export const getConfig = () => config;
export const getHostName = createSelector(getConfig, (config) => config.hostName);

//TopMenuBar Selectors
export const getTopMenuBar = (state) => state.topMenuBar;

export const getCurrentTab = createSelector(getTopMenuBar, (topMenuBar) => topMenuBar.currentTab);

//Account Dropdown Selectors
export const getAccountDropdown = (state) => state.accountDropdown;
export const getIsLoggedIn = createSelector(
  getAccountDropdown,
  (accountDropdown) => accountDropdown.isLoggedIn,
);
export const getError = createSelector(getAccountDropdown, (accountDropdown) => ({
  isError: accountDropdown.isError,
  errorBody: accountDropdown.errorBody,
}));
