import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ToastProvider } from 'react-toast-notifications';
import { DataProvider } from 'enhancers/useDatabase';
import { AuthProvider } from 'utils/authentication';

import CustomToast from 'components/CustomToast';

ReactDOM.render(
  <AuthProvider>
    <DataProvider>
      <ToastProvider
        placement="bottom-right"
        components={{ Toast: CustomToast }}
      >
        <App />
      </ToastProvider>
    </DataProvider>
  </AuthProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
