import { createActionCreator } from '../../../commons/utils';
import { createReducer } from '../../../store/reducers';

// Actions
const actionCreator = createActionCreator('@@DB_SCHEMA/SEARCH');
const setSearchKey = actionCreator('SEARCH_KEY_SET');

export { setSearchKey };


// Reducers
const initialState = {
    keywords: ''
};

const handlers = {
    [setSearchKey.type]: (state, { payload: { keywords } }) => ({
        ...state,
        keywords
    })
};

const reducers = createReducer(initialState, handlers);
export default reducers;