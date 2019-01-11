import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import ourPromise from './middleware/promise';
import logger from './middleware/logger';

import App from './components/app';

const store = createStore(rootReducer, {}, applyMiddleware(logger, ourPromise));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
