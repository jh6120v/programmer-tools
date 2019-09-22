import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Oracle from '../oracle';

const DbSchemaWrapper = () => (
    <div className="wrapper route-animate">
        <Header />
        <Oracle />
        <Footer />
    </div>
);

export default DbSchemaWrapper;
