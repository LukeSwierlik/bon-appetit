import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Router } from 'react-router-dom';
import './styles.less';

import App from './app/app';
import store from './app/+state';
import { Provider } from 'react-redux';
import { historyRouter } from './app/router/history';

const app = (
    <Provider store={store}>
        <Router history={historyRouter}>
            <App/>
        </Router>
    </Provider>
);

ReactDOM.render(
    app,
    document.getElementById('root')
);
