import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import './sass/main.scss';
import TopMenuBarWidget from './widgets/TopMenuBar/TopMenuBarWidget';

function Website() {
  document.body.style.backgroundColor = 'white';
  return (
    <Provider store={store}>
      <div className="website">
        <TopMenuBarWidget />
      </div>
    </Provider>
  );
}

export default Website;
