import React from 'react';
import ReactDOM from 'react-dom';


import App from './App';
import { askForPermissionNotifications } from './config/FirebaseConfig';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
        <App />
, document.getElementById('root'));

serviceWorker.register();
//richiesta di attivazione delle notifiche
if(!localStorage.getItem('notToken')){
        askForPermissionNotifications()
}
