import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initTab, setTab } from '../modules/fixed-list';
import { updateSelected } from '../modules/content';
import { setSearchKey } from '../modules/search';
import { IDBSet } from '../../../modules/indexed-db';
import { getNewFixedObj } from './helper';
import { FIXED_LIST, FIXED_LIST_SELECT } from '../../../constants';

export const useFilterTables = (initialValue = '') => {
    const dispatch = useDispatch();

    const [value, setValue] = useState(initialValue);
    const onChange = useCallback((e) => {
        setValue(e.currentTarget.value);

        dispatch(setSearchKey({
            keywords: e.currentTarget.value
        }));
    }, [dispatch]);

    return { value, onChange };
};

export const useFixedListTools = () => {
    const { oracle, fixedList } = useSelector((state) => ({
        oracle: state.oracle,
        fixedList: state.fixedList
    }));

    const dispatch = useDispatch();

    const select = (tableName) => {
        let fixedObj;

        const selected = fixedList.fixedListMap.get(tableName);
        if (typeof selected !== 'undefined') {
            fixedObj = selected;
        } else {
            // 選擇的table不在tab list裡面，檢查是否有非固定tab
            for (const val of fixedList.fixedListMap.values()) {
                console.log(val);
                // 找非固定的tab(只會有一個)
                if (val.isFixed === false) {
                    fixedList.fixedListMap.delete(val.tableName);

                    break;
                }
            }

            fixedObj = getNewFixedObj();
            fixedObj.tableName = tableName;
            fixedObj.isFixed = false;
            fixedObj.subTabShow.content = true;
            fixedObj.data = oracle.tables[tableName];
        }

        fixedList.fixedListMap.set(tableName, fixedObj);
        fixedList.fixedListSelect = tableName;

        dispatch(setTab(fixedList));
        dispatch(updateSelected({
            selected: fixedObj
        }));
        dispatch(IDBSet({
            key: FIXED_LIST_SELECT,
            value: fixedObj
        }));
        dispatch(IDBSet({
            key: FIXED_LIST,
            value: fixedList
        }));
    };

    const remove = (tableName) => {
        fixedList.fixedListMap.delete(tableName);

        const { size } = fixedList.fixedListMap;
        if (size > 0) {
            const selected = fixedList.fixedListMap.values().next().value;

            dispatch(setTab({
                fixedListMap: fixedList.fixedListMap,
                fixedListSelect: selected.tableName
            }));

            dispatch(updateSelected({
                selected
            }));
        } else {
            dispatch(initTab());

            dispatch(updateSelected({
                selected: null
            }));
        }
    };

    return { select, remove };
};

export const useIsSubTabShow = () => {
    const { content } = useSelector((state) => ({
        content: state.content
    }));

    const isTabShow = useCallback((contentName) => ({
        display: content.selected.subTabShow[contentName] === true ? 'block' : 'none'
    }), [content.selected.subTabShow]);

    return { isTabShow };
};
