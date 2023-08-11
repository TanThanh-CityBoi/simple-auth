import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from "@react-oauth/google"
import { config } from './config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
        <App />   
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
