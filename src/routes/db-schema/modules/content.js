import { createActionCreator } from '../../../commons/utils';
import { createReducer } from '../../../store/reducers';

// Actions
const actionCreator = createActionCreator('@@DB_SCHEMA/CONTENT');
const initSelected = actionCreator('INIT_SELECTED');
const updateSelected = actionCreator('UPDATE_SELECTED');

export {
    initSelected,
    updateSelected
};


// Reducers
const initialState = {
    selected: null
};

const handlers = {
    [initSelected.type]: (state) => ({
        ...state
    }),
    [updateSelected.type]: (state, { payload: { selected } }) => ({
        ...state,
        selected
    })
};

const reducers = createReducer(initialState, handlers);
export default reducers;
