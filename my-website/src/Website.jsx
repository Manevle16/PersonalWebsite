import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './sass/main.scss';
import TopMenuBarWidgetContainer from './widgets/TopMenuBar/containers/TopMenuBarContainer';

export default class Website extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="website">
          <TopMenuBarWidgetContainer currentPath={window.location.pathname} />
          <Router>
            <Route exact path="/" />
            <Route path="/about" />
          </Router>
        </div>
      </Provider>
    );
  }
}
