import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './sass/main.scss';
import TopMenuBarWidgetContainer from './widgets/TopMenuBar/containers/TopMenuBarContainer';
import UnderConstruction from './widgets/Common/UnderConstruction/UnderConstruction';

export default class Website extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPath: window.location.pathname,
    };
  }

  render() {
    return (
      <Provider store={store}>
        <div className='website'>
          <TopMenuBarWidgetContainer currentPath={this.state.currentPath} />
          <Router>
            <Switch>
              <Route exact path='/'>
                <UnderConstruction />
              </Route>
              <Route path='/projects'>
                <UnderConstruction />
              </Route>
              <Route path='/blog'>
                <UnderConstruction />
              </Route>
              <Route path='/about'>
                <UnderConstruction />
              </Route>
              <Route>This is not a page on the site</Route>
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}
