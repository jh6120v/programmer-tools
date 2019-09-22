import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../../containers/search';

const Header = () => (
    <>
        <header>
            <div className="title icon-db-schema col-7">
                <Link to="/">DB schema viewing tool</Link>
            </div>
            <Search />
        </header>
    </>
);

export default Header;
