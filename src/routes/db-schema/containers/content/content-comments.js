import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelected } from '../../modules/content';
import { useIsSubTabShow } from '../../commons/hooks';

const ContentComments = () => {
    const useChangeTableComments = () => {
        const { content } = useSelector((state) => ({
            content: state.content
        }));

        const [value, setValue] = useState(content.selected.data.comments);
        const dispatch = useDispatch();

        const onChange = useCallback((e) => {
            setValue(e.currentTarget.value);

            content.selected.data.comments = e.currentTarget.value;

            dispatch(updateSelected({
                selected: content.selected
            }));
        }, [content.selected, dispatch]);

        return { value, onChange };
    };

    const { value, onChange } = useChangeTableComments();
    const { isTabShow } = useIsSubTabShow('comments');

    return (
        <div className="col-12 selected-table-comments" style={isTabShow()}>
            <textarea className="col-12" value={value} onChange={onChange} />
        </div>
    );
};

export default ContentComments;
