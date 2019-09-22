import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useIsSubTabShow } from '../../commons/hooks';

const ContentSql = () => {
    const [copied, setCopied] = useState(false);
    const { content } = useSelector((state) => ({
        content: state.content
    }));

    const onCopy = useCallback(() => {
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }, []);

    const genSql = useCallback(() => {
        const { selected } = content;
        let def = '';

        // 開使比對原始資料
        if (selected.data.comments !== selected.data.ori_comments) {
            def = `comment on table ${selected.tableName} is '${selected.data.comments}';\n`;
        }

        for (const value of Object.values(selected.data.columns)) {
            if (value.comments !== value.ori_comments) {
                def += `comment on column ${selected.tableName}.${value.column_name} is '${value.comments}';\n`;
            }
        }

        return def;
    }, [content]);

    const { isTabShow } = useIsSubTabShow('columns');

    return (
        <div className="col-12 selected-table-columns" style={isTabShow()}>
            <CopyToClipboard onCopy={onCopy} text={genSql()}>
                <input type="button" className="btn btn-secondary mr-sm-2" value="複製" />
            </CopyToClipboard>
            <span className={copied ? 'copy-text copied' : 'copy-text'} id="copy">已複製</span>
            <pre className="col-12">{genSql()}</pre>
        </div>
    );
};

export default ContentSql;
