import { createActionCreator } from '../../../commons/utils';
import { createReducer } from '../../../store/reducers';

// Actions
const actionCreator = createActionCreator('@@DB_SCHEMA/ORACLE');
const fetchSchemaData = actionCreator('FETCH_ORACLE_SCHEMA_DATA');
const fetchSchemaDataSucc = actionCreator('FETCH_ORACLE_SCHEMA_DATA_SUCC');
const fetchSchemaDataFail = actionCreator('FETCH_ORACLE_SCHEMA_DATA_FAIL');
const checkFileStatus = actionCreator('CHECK_FILE_STATUS');
const fetchDataFromLocal = actionCreator('FETCH_DATA_FROM_LOCAL');
const reFetchSchemaData = actionCreator('RE_FETCH_ORACLE_SCHEMA_DATA');

export {
    fetchSchemaData,
    fetchSchemaDataSucc,
    fetchSchemaDataFail,
    checkFileStatus,
    fetchDataFromLocal,
    reFetchSchemaData
};


// Reducer
const initialState = {
    tables: {}
};

const handlers = {
    [fetchSchemaDataSucc.type]: (state, { payload: { tables } }) => ({
        ...state,
        tables
    })
};

const reducers = createReducer(initialState, handlers);
export default reducers;