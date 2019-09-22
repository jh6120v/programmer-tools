import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FixedList from './fixed-list';
import Content from './content';
import { checkFileStatus } from '../modules/oracle';

const Oracle = () => {
    const { content } = useSelector((state) => ({
        content: state.content
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        // componentDidMount
        dispatch(checkFileStatus());
    }, [dispatch]);

    return (
        <section>
            <div className="row">
                <div id="selected-table-content" className="col-12">
                    <FixedList />
                    {content.selected ? <Content /> : null}
                </div>
            </div>
        </section>
    );
};

export default Oracle;
