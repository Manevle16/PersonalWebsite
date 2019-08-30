import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import './sass/main.scss';
import TopMenuBarWidgetContainer from './widgets/TopMenuBar/containers/TopMenuBarContainer';

export default class Website extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="website">
          <TopMenuBarWidgetContainer />
        </div>
      </Provider>
    );
  }
}
