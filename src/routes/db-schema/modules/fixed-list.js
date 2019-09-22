import { createActionCreator } from '../../../commons/utils';
import { createReducer } from '../../../store/reducers';

// Actions
const actionCreator = createActionCreator('@@DB_SCHEMA/FIXED_LIST');
const setTab = actionCreator('SET_TAB');
// const delTab = actionCreator('DEL_TAB');
const initTab = actionCreator('INIT_TAB');

export {
    setTab,
    initTab
};


// Reducers
const initialState = {
    fixedListMap: new Map(),
    fixedListSelect: ''
};

const handlers = {
    [setTab.type]: (state, { payload }) => ({
        ...state,
        fixedListMap: new Map([...state.fixedListMap, ...payload.fixedListMap]),
        fixedListSelect: payload.fixedListSelect
    }),
    [initTab.type]: (state) => ({
        ...state
    })
};

const reducers = createReducer(initialState, handlers);
export default reducers;
