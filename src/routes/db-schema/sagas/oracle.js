import { call, put } from 'redux-saga/effects';
import { get } from 'idb-keyval';
import { getFileDataApi, getFileHashApi } from './api';
import {
    FILE_HASH, FIXED_LIST, FIXED_LIST_SELECT, ORIGINAL_DATA
} from '../../../constants';
import { spinnerShow, spinnerHide } from '../../../modules/spinner';
import {
    fetchSchemaData, fetchDataFromLocal, fetchSchemaDataSucc, fetchSchemaDataFail
} from '../modules/oracle';
import { IDBSet, IDBDelete } from '../../../modules/indexed-db';
import { initTab, setTab } from '../modules/fixed-list';
import { initSelected, updateSelected } from '../modules/content';

export function* oracleCheckData() {
    try {
        yield put(spinnerShow());

        const { hash } = yield call(getFileHashApi);
        yield put(fetchDataFromLocal({
            hash
        }));
    } catch (e) {
        yield put(spinnerHide());
    }
}

export function* oracleGetLocalData(action) {
    try {
        const hash = yield call(get, FILE_HASH);
        if (hash === action.payload.hash) {
            const origin = yield call(get, ORIGINAL_DATA);
            if (typeof origin === 'undefined') {
                throw new Error(`${ORIGINAL_DATA} table not found`);
            }

            yield put(fetchSchemaDataSucc({
                tables: origin
            }));

            const fixed = yield call(get, FIXED_LIST);
            if (typeof fixed !== 'undefined') {
                // transfer temp tab
                const fixedListMap = new Map();
                for (const val of fixed.fixedListMap.values()) {
                    fixedListMap.set(val.tableName, val);
                }

                const selected = yield call(get, FIXED_LIST_SELECT);

                // let selected = fixedListMap.get(select);
                yield put(updateSelected({
                    selected
                }));

                yield put(setTab({
                    fixedListMap,
                    fixedListSelect: fixed.fixedListSelect
                }));
            }

            yield put(spinnerHide());
        } else {
            throw new Error('file hash not match.');
        }
    } catch (e) {
        console.log(e);
        yield put(fetchSchemaData());
    }
}

export function* oracleGetData() {
    try {
        const response = yield call(getFileDataApi);

        yield put(IDBSet({
            key: ORIGINAL_DATA,
            value: response.data
        }));

        yield put(IDBSet({
            key: FILE_HASH,
            value: response.hash
        }));

        yield put(IDBDelete([FIXED_LIST, FIXED_LIST_SELECT]));

        yield put(fetchSchemaDataSucc({
            tables: response.data
        }));

        yield put(spinnerHide());
    } catch (e) {
        yield put(fetchSchemaDataFail());
    }
}

export function* oracleRenewData() {
    yield put(spinnerShow());
    yield put(initTab());
    yield put(initSelected());
    yield put(fetchSchemaData());
}

export function* initFixedList() {
    yield put(initSelected());
    yield put(IDBDelete([FIXED_LIST, FIXED_LIST_SELECT]));
}
