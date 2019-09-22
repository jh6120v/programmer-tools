import React from 'react';
import { useSelector } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import Spinner from '../components/spinner';
import rootSaga from '../sagas';
import { store, history, sagaMiddleware } from '../store';
import { injectReducer } from '../store/reducers';
import spinnerReducer from '../modules/spinner';
import Routes from '../routes';

injectReducer(history, store, [
    { key: 'spinner', reducer: spinnerReducer }
]);

const App = () => {
    const spinner = useSelector((state) => state.spinner);
    return (
        <>
            <Spinner show={spinner.isShow} />
            <ConnectedRouter history={history}>
                <Routes />
            </ConnectedRouter>
        </>
    );
};

sagaMiddleware.run(rootSaga);

export default hot(App);
