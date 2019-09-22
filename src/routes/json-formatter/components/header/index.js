import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <>
        <header>
            <div className="title icon-json-formatter col-7">
                <Link to="/">Json formatter</Link>
            </div>
        </header>
    </>
);

export default Header;
