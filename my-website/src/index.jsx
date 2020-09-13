import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Website from './Website.jsx';
import ReactGA from 'react-ga';

//Add google analytics
ReactGA.initialize('UA-177838466-1');
ReactGA.pageview(window.location.pathname + window.location.search);

document.body.style.backgroundColor = '#FFD2BC';
ReactDOM.render(<Website />, document.getElementById('root'));
