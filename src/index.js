import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import App from './containers/app/App';
import * as serviceWorker from './serviceWorker';
import store from './store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    // eslint-disable-next-line no-undef
    document.getElementById('root'),
);

serviceWorker.unregister();
