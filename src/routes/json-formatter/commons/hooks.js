import { useCallback } from 'react';
import { set } from 'idb-keyval';
import { JSON_INPUT_DATA } from '../../../constants';

export const useEdit = (setValue) => (
    useCallback((data) => {
        set(JSON_INPUT_DATA, JSON.stringify(data.updated_src, null, '    ')).then();
        setValue(JSON.stringify(data.updated_src, null, '    '));
    }, [setValue])
);

export const useCompact = () => (
    useCallback((value, setValue) => {
        const compactJson = JSON.stringify(JSON.parse(value));
        setValue(compactJson);
        set(JSON_INPUT_DATA, compactJson).then();
    }, [])
);

export const useIndent = () => (
    useCallback((value, setValue) => {
        const indentJson = JSON.stringify(JSON.parse(value), null, '    ');
        setValue(indentJson);
        set(JSON_INPUT_DATA, indentJson).then();
    }, [])
);
