import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
//import App from './App';

//Action Store
import { Provider } from 'react-redux';
import store from './reducers';



ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('app')
);
