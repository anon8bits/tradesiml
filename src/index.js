import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faPowerOff);

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('Domain:', process.env.REACT_APP_AUTH0_DOMAIN);
console.log('Client ID:', process.env.REACT_APP_AUTH0_CLIENTID);
root.render(
  <Auth0Provider
    domain="dev-igqjd2dbnlcr71c4.us.auth0.com"
    clientId="MLNzULVFltzdMt8ldLxybXYGX5QupIQc"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
