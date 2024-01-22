import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Provider from './UseContext/Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
    <Router>
      <App />
    </Router>
  </Provider>
);

reportWebVitals();
