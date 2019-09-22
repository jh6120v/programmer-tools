import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reFetchSchemaData } from '../modules/oracle';
import { useFilterTables } from '../commons/hooks';
import List from './list';

const Search = () => {
    const [toggle, setToggle] = useState(false);
    const { search } = useSelector((state) => ({
        search: state.search
    }));

    const dispatch = useDispatch();
    const node = useRef();

    const handleClick = (e) => {
        if (node.current.contains(e.target)) {
            setToggle(true);
            return;
        }
        // outside click
        setToggle(false);
    };

    const { value, onChange } = useFilterTables(search.keyword);

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    return (
        <div id="search" className="input-group col-5 no-gutters" ref={node}>
            <input
                type="text"
                id="keywords"
                className="form-control"
                placeholder="🔎  查詢相關資料表名稱或說明"
                autoComplete="off"
                value={value}
                onChange={onChange}
            />
            <div className="input-group-append">
                <span className="input-group-text" id="addon2">
                    <a onClick={() => dispatch(reFetchSchemaData())}>更新</a>
                </span>
                <span className="input-group-text" id="addon2">
                    <a>儲存</a>
                </span>
            </div>
            {
                toggle ? <List /> : null
            }
        </div>
    );
};

export default Search;
