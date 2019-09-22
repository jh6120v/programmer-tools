import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelected } from '../../modules/content';

const ContentTable = () => {
    const { content } = useSelector((state) => ({
        content: state.content
    }));
    const dispatch = useDispatch();

    const changeColumnComments = (e) => {
        content.selected.data.columns[e.currentTarget.id].comments = e.currentTarget.value;

        dispatch(updateSelected({
            selected: content.selected
        }));
    };

    return (
        <div className="col-12 selected-table-content">
            <table className="table table-striped table-hover table-lg">
                <thead>
                    <tr>
                        <th className="text-center c_no">No.</th>
                        <th className="c_name">欄位</th>
                        <th className="c_pk">PK</th>
                        <th className="c_kind">資料類別</th>
                        <th className="c_length">長度</th>
                        <th>註解</th>
                        <th className="text-center c_null">Null</th>
                        <th className="c_default">Default</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        content.selected.data.columns.map((val) => (
                            <tr key={val.column_id}>
                                <td className="text-center">{val.column_id}</td>
                                <td>{val.column_name}</td>
                                <td>{val.constraint_type.join()}</td>
                                <td>{val.data_type}</td>
                                <td>{val.data_length}</td>
                                <td>
                                    <textarea
                                        id={val.column_id}
                                        className="form-control"
                                        rows={2}
                                        value={val.comments}
                                        onChange={changeColumnComments}
                                    />
                                </td>
                                <td className="text-center c_null">{val.nullable === 'N' ? '' : 'v'}</td>
                                <td className="c_default">{val.data_default}</td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th className="text-center">No.</th>
                        <th>欄位</th>
                        <th>PK</th>
                        <th>資料類別</th>
                        <th>長度</th>
                        <th>註解</th>
                        <th className="text-center">Null</th>
                        <th>Default</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default ContentTable;
