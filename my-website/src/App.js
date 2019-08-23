import React from 'react';
import './sass/main.scss';
import Video from './components/video';

function App() {
    document.body.style.backgroundColor = "white";
  return (
    <div className="App">
        <Video />
    </div>
  );
}

export default App;
