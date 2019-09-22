import rootSaga from './sagas';
import { history, store, sagaMiddleware } from '../../store';
import { injectReducer } from '../../store/reducers';
import contentReducer from './modules/content';
import fixedListReducer from './modules/fixed-list';
import oracleReducer from './modules/oracle';
import searchReducer from './modules/search';
import DBSchemaWrapper from './containers/layouts/db-schema-wrapper';

// reducer
injectReducer(history, store, [
    { key: 'search', reducer: searchReducer },
    { key: 'oracle', reducer: oracleReducer },
    { key: 'fixedList', reducer: fixedListReducer },
    { key: 'content', reducer: contentReducer }
]);

sagaMiddleware.run(rootSaga);

export default DBSchemaWrapper;