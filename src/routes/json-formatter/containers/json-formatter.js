import React, { useCallback, useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import { get, set } from 'idb-keyval';
import AceEditor from 'react-ace';
import { getJson } from '../commons/helper';
import { JSON_INPUT_DATA } from '../../../constants';
import 'brace/mode/json';
import 'brace/theme/github';
import { useCompact, useEdit, useIndent } from '../commons/hooks';

const JsonFormatter = () => {
    const [jsonVal, setJsonVal] = useState({});
    const [collapse, setCollapse] = useState(false);

    const indent = useIndent();
    const compact = useCompact();

    const useFormat = () => {
        const [value, setValue] = useState('');

        const onChange = useCallback((newValue) => {
            setValue(newValue);

            if (newValue !== '') {
                const [isSuccess, output] = getJson(newValue);

                setJsonVal(output);
                if (isSuccess) {
                    set(JSON_INPUT_DATA, newValue).then();
                }
            } else {
                setJsonVal({});
                set(JSON_INPUT_DATA, '').then();
            }
        }, []);

        return { value, setValue, onChange };
    };

    const collapseOn = useCallback(() => setCollapse(false), []);
    const collapseClose = useCallback(() => setCollapse(true), []);

    const { value, setValue, onChange } = useFormat();
    const edit = useEdit(setValue);

    useEffect(() => {
        get(JSON_INPUT_DATA).then((data) => {
            if (data !== '') {
                setJsonVal(JSON.parse(data));
                setValue(data);
            }
        });
    }, [setValue]);

    return (
        <section>
            <div className="row json-formatter">
                <div className="col-6 input">
                    <div className="tools">
                        <span className="ion-md-code" onClick={() => indent(value, setValue)} title="展開" />
                        <span className="ion-md-code-working" onClick={() => compact(value, setValue)} title="壓縮" />
                    </div>
                    <AceEditor
                        mode="json"
                        theme="github"
                        placeholder="請輸入 json 資料"
                        value={value}
                        onChange={onChange}
                        className="before-format"
                        width="100%"
                        height="calc(100% - 30px)"
                        name="UNIQUE_ID_OF_DIV"
                        showPrintMargin={false}
                        editorProps={{ $blockScrolling: true }}
                    />
                </div>
                <div className="col-6 output">
                    <div className="tools">
                        <span className="ion-md-code" onClick={() => collapseOn()} title="展開" />
                        <span className="ion-md-code-working" onClick={() => collapseClose()} title="壓縮" />
                    </div>
                    <ReactJson
                        src={jsonVal}
                        iconStyle="square"
                        collapsed={collapse}
                        onEdit={edit}
                        onAdd={edit}
                        onDelete={edit}
                    />
                </div>
            </div>
        </section>
    );
};

export default JsonFormatter;
