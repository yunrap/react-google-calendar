import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-day-picker/style.css';
import './styles/global.scss';
import './styles/index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
