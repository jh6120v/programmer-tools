import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className="wrapper route-animate home">
        <div className="function-area">
            <div className="title">工程師小工具</div>
            <div className="item col-6 col-sm-4 col-md-2">
                <Link to="/db-schema" className="icon icon-dbSchema-oracle col-12" />
                <span className="name col-12">DB Schema</span>
            </div>
            <div className="item col-6 col-sm-4 col-md-2">
                <Link to="/json-formatter" className="icon json-formatter col-12" />
                <span className="name col-12">Json Formatter</span>
            </div>
        </div>
    </div>
);

export default Home;
