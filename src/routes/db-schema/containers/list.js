import React from 'react';
import { useSelector } from 'react-redux';
import { useFixedListTools } from '../commons/hooks';

const List = () => {
    const { oracle, search } = useSelector((state) => ({
        oracle: state.oracle,
        search: state.search
    }));

    const { select } = useFixedListTools();

    const filteredSearch = (keywords) => {
        const valueArr = Object.values(oracle.tables);

        return valueArr.filter((data) => {
            const field = ['comments', 'table_name'];
            let flag = false;

            field.forEach((key) => {
                if (data[key].toLowerCase().indexOf(keywords.toLowerCase()) !== -1) {
                    flag = true;
                }
            });

            return flag;
        }).map((p) => {
            if (keywords === '') return p;

            const cache = JSON.parse(JSON.stringify(p));
            cache.filterName = `${cache.table_name} ${cache.comments}`;

            const regex = new RegExp(keywords, 'i');
            const match = cache.filterName.match(regex);
            if (match) {
                cache.filterName = cache.filterName.replace(regex, `<span class='highlight'>${match[0]}</span>`);
            }

            return cache;
        });
    };

    return (
        <div className="output-area">
            {
                filteredSearch(search.keywords).map((val) => (
                    <div key={val.table_name} className="item col-12">
                        {
                            typeof val.filterName !== 'undefined'
                                ? (
                                    <a
                                        onClick={() => select(val.table_name)}
                                        dangerouslySetInnerHTML={{ __html: `▪ ${val.filterName}` }}
                                        className="ellipsis"
                                    />
                                )
                                : (
                                    <a
                                        onClick={() => select(val.table_name)}
                                        className="ellipsis"
                                    >
                                    ▪
                                        {' '}
                                        {val.table_name}
                                        {' '}
                                        {val.comments}
                                    </a>
                                )
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default List;
