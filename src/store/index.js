import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './reducers';

export const history = createBrowserHistory();
export const sagaMiddleware = createSagaMiddleware();

export function ConfigureStore(initialState = {}) {
    // ======================================================
    // Store Enhancers
    // ======================================================
    let composeEnhancer;
    if (process.env.NODE_ENV === 'development') {
        composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    } else {
        composeEnhancer = compose;
    }

    const store = createStore(
        createRootReducer(history, {}), // root reducer with router state
        initialState,
        composeEnhancer(
            applyMiddleware(
                routerMiddleware(history),
                sagaMiddleware
            )
        )
    );

    store.asyncReducers = {};

    return store;
}

export const store = ConfigureStore();

// To unsubscribe, invoke `store.unsubscribeHistory()` anytime
// store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

if (module.hot) {
    module.hot.accept('./reducers', () => {
        const reducers = require('./reducers').default;
        store.replaceReducer(reducers(store.asyncReducers));
    });
}
