import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useIsSubTabShow } from '../../commons/hooks';
import { updateSelected } from '../../modules/content';

const ContentEntity = () => {
    const [copied, setCopied] = useState(false);
    const { content } = useSelector((state) => ({
        content: state.content
    }));
    const useChangeEntityPK = () => {
        const dispatch = useDispatch();

        const onChange = useCallback((e) => {
            content.selected.entityPk = e.currentTarget.value;

            setCopied(false);

            dispatch(updateSelected({
                selected: content.selected
            }));
        }, [dispatch]);

        return { onChange };
    };

    const onCopy = () => {
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    const camelized = (str) => str.toLowerCase().replace(/_/g, ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+|_)/g, (match) => {
        if (+match === 0 || match === '_') return ''; // or if (/\s+/.test(match)) for white spaces
        return match.toUpperCase();
    });

    const previewEntity = () => {
        const { tableName } = content.selected;

        const cols = content.selected.data.columns;
        const { comments } = content.selected.data;
        const className = camelized(tableName);
        let fileHeader = '';
        const iden = '    ';
        const dataTypeTransfer = {
            VARCHAR2: 'string',
            DATE: 'date',
            NUMBER: 'int',
            CLOB: 'clob',
            BLOB: 'blob',
            RAW: 'raw'
        };

        for (const value of cols) {
            const dataType = typeof dataTypeTransfer[value.data_type] !== 'undefined' ? dataTypeTransfer[value.data_type] : value.data_type;
            fileHeader += `
${iden}/**
${iden} * ${value.comments.replace(/\r\n|\n/g, '')}
${iden} * @var ${dataType}
${iden} * @length ${value.data_length}
${iden} */
${iden}public $${value.column_name.toLowerCase()};\n`;
        }

        return `<?php \nnamespace XXX\\\\Entity;\n
/**
 * ${comments}
 */
class ${className} extends EntityBase
{
${fileHeader}
${iden}public function getPKFields()
${iden}{
${iden}${iden}return ['${content.selected.entityPk.toLowerCase()}'];
${iden}}
}`;
    };

    const { onChange } = useChangeEntityPK();
    const { isTabShow } = useIsSubTabShow();

    return (
        <div className="col-12 selected-table-entity" style={isTabShow('entity')}>
            <div className="form-inline">
                <select className="form-control col-2 mr-sm-2" onChange={onChange}>
                    <option value="">請選擇 Primary key</option>
                    {
                        content.selected.data.columns.map((val) => <option key={val.column_name}>{val.column_name}</option>)
                    }
                </select>
                <CopyToClipboard onCopy={onCopy} text={previewEntity()}>
                    <input type="button" className="btn btn-secondary mr-sm-2" value="複製" />
                </CopyToClipboard>
                <span id="copy" className={copied ? 'copy-text copied' : 'copy-text'}>已複製</span>
            </div>
            <pre className="col-12">{previewEntity()}</pre>
        </div>
    );
};

export default ContentEntity;
