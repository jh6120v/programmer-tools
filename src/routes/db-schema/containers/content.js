import React from 'react';
import ContentEntity from './content/content-entity';
import ContentSql from './content/contenr-sql';
import ContentComments from './content/content-comments';
import ContentTable from './content/content-table';
import ContentSubTab from './content/content-sub-tab';

const Content = () => (
    <div className="col-12 selected-wrapper">
        <ContentSubTab />
        <ContentTable />
        <ContentComments />
        <ContentSql />
        <ContentEntity />
    </div>
);

export default Content;