import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import './sass/main.scss';
import Video from './widgets/components/video';

function App() {
  document.body.style.backgroundColor = 'white';
  return (
    <Provider store={store}>
      <div className="App">
        <Video />
      </div>
    </Provider>
  );
}

export default App;
