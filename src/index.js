import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { HashRouter } from 'react-router-dom';

let safeStorage;
try {
  safeStorage = window.localStorage;
  safeStorage.setItem("test", "ok");
  window.safeStorage = safeStorage;
} catch {
  safeStorage = {
    getItem: () => null,
    setItem: () => { },
    removeItem: () => { },
  };
  window.safeStorage = safeStorage;
  console.warn("localStorage is disabled or not accessible (using safe fallback)");
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HashRouter basename='/'>
      <App />
    </HashRouter>
  </Provider>
);

reportWebVitals();