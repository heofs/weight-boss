import React from 'react';
import ReactDOM from 'react-dom';

import { DataProvider } from 'enhancers/useAPI';
import { AuthProvider } from 'utils/authentication';
import { ToastProvider } from 'react-toast-notifications';

import Snack from 'components/SnackBar';
import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <AuthProvider>
    <DataProvider>
      <ToastProvider
        autoDismiss
        placement="bottom-right"
        components={{ Toast: Snack }}
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
