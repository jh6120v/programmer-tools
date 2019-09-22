import PropTypes from 'prop-types';
import React from 'react';

const Spinner = ({ show }) => {
    const showIt = (showState) => {
        const classAry = ['loading'];

        if (showState === true) {
            classAry.push('show');
        } else {
            classAry.push('hide');
        }

        return classAry.join(' ');
    };

    return (
        <>
            <div id="loading" className={showIt(show)}>資料處理中，請稍候...</div>
        </>
    );
};

export default Spinner;

Spinner.propTypes = {
    show: PropTypes.bool.isRequired
};
