import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './sass/main.scss';
import TopMenuBarWidgetContainer from './widgets/TopMenuBar/containers/TopMenuBarContainer';

export default class Website extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPath: window.location.pathname
    };
  }
  render() {
    console.log(this.state);
    return (
      <Provider store={store}>
        <div className='website'>
          <TopMenuBarWidgetContainer currentPath={this.state.currentPath} />
          <Router>
            <Route exact path='/' />
            <Route path='/projects' />
            <Route path='/blog' />
            <Route path='/about' />
          </Router>
        </div>
      </Provider>
    );
  }
}
