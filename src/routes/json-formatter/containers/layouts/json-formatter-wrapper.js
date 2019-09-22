import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import JsonFormatter from '../json-formatter';

const JsonFormatterWrapper = () => (
    <div className="wrapper route-animate">
        <Header />
        <JsonFormatter />
        <Footer />
    </div>
);

export default JsonFormatterWrapper;
