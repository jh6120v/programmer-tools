import React from 'react';
import { useSelector } from 'react-redux';
import { useFixedListTools } from '../commons/hooks';

const FixedList = () => {
    const { fixedList } = useSelector((state) => ({
        fixedList: state.fixedList
    }));

    const { select, remove } = useFixedListTools();

    const isSelected = (tableName) => {
        const classAry = ['nav-link', 'icon', 'ion-ios-pricetags'];

        if (fixedList.fixedListSelect === tableName) {
            classAry.push('active');
        }

        return classAry.join(' ');
    };

    return (
        fixedList.fixedListMap.size > 0
            ? (
                <>
                    <ul className="nav nav-tabs fixed-table col-12">
                        {
                            [...fixedList.fixedListMap.values()].map((val) => (
                                <li key={val.tableName} className="nav-item">
                                    <a className={isSelected(val.tableName)}>
                                        <span
                                            className="text"
                                            onClick={() => select(val.tableName)}
                                        >
                                            {val.tableName}
                                        </span>
                                        {val.isFixed === true ? (
                                            <span
                                                className=" icon ion-ios-close-circle"
                                                onClick={() => remove(val.tableName)}
                                            />
                                        ) : null}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </>
            )
            : null
    );
};

export default FixedList;
