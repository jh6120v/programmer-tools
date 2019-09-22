import { takeEvery, all } from 'redux-saga/effects';
import {
    checkFileStatus, fetchSchemaData, reFetchSchemaData, fetchDataFromLocal
} from '../modules/oracle';
import { initTab } from '../modules/fixed-list';
import {
    initFixedList,
    oracleCheckData,
    oracleGetData,
    oracleGetLocalData,
    oracleRenewData
} from './oracle';

function* watchOracleCheckFile() {
    yield takeEvery(checkFileStatus.type, oracleCheckData);
}

function* watchOracleGetFile() {
    yield takeEvery(fetchSchemaData.type, oracleGetData);
}

function* watchOracleRenewData() {
    yield takeEvery(reFetchSchemaData.type, oracleRenewData);
}

function* watchInitFixedList() {
    yield takeEvery(initTab.type, initFixedList);
}

function* watchOracleGetLocalData() {
    yield takeEvery(fetchDataFromLocal.type, oracleGetLocalData);
}

export default function* rootSaga() {
    yield all([
        watchOracleCheckFile(),
        watchOracleGetFile(),
        watchOracleRenewData(),
        watchInitFixedList(),
        watchOracleGetLocalData()
    ]);
}