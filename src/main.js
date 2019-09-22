import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/app';
import './assets/sass/ionicons.scss';
import './assets/sass/style.scss';
import { store } from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept();
}
