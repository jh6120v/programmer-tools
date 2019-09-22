import React from 'react';
import { useSelector } from 'react-redux';
import ContentEntity from './content/content-entity';
import ContentSql from './content/contenr-sql';
import ContentComments from './content/content-comments';
import ContentTable from './content/content-table';
import ContentSubTab from './content/content-sub-tab';

const Content = () => {
    const { content } = useSelector((state) => ({
        content: state.content
    }));

    return (
        <div className="col-12 selected-wrapper">
            <ContentSubTab />
            {content.selected.subTabShow.content ? <ContentTable /> : null}
            {content.selected.subTabShow.comments ? <ContentComments /> : null}
            {content.selected.subTabShow.columns ? <ContentSql /> : null}
            {content.selected.subTabShow.entity ? <ContentEntity /> : null}
        </div>
    );
};

export default Content;
