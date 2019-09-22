import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelected } from '../../modules/content';
import { setTab } from '../../modules/fixed-list';

const ContentSubTab = () => {
    const { content, fixedList } = useSelector((state) => ({
        content: state.content,
        fixedList: state.fixedList
    }));
    const dispatch = useDispatch();

    const subTabList = [
        {
            name: '資料欄',
            tag: 'content',
            icon: 'ion-ios-document'
        },
        {
            name: '資料表說明',
            tag: 'comments',
            icon: 'ion-ios-clipboard'
        },
        {
            name: '變動SQL',
            tag: 'columns',
            icon: 'ion-ios-paper'
        },
        {
            name: 'Entity',
            tag: 'entity',
            icon: 'ion-ios-settings'
        }
    ];

    const subTabIsSelected = (subTabName, iconName) => {
        const classAry = ['nav-link', 'icon', iconName];

        if (content.selected.subTabShow[subTabName]) {
            classAry.push('active');
        }

        return classAry.join(' ');
    };

    const selectSubTab = (subTabName) => {
        const { selected } = content;

        for (const key of Object.keys(selected.subTabShow)) {
            selected.subTabShow[key] = false;
        }

        selected.subTabShow[subTabName] = true;

        dispatch(updateSelected({
            selected
        }));
    };

    const fixedIt = () => {
        const { selected } = content;

        selected.isFixed = true;
        dispatch(updateSelected({
            selected
        }));

        fixedList.fixedListMap.set(selected.tableName, selected);
        dispatch(setTab(fixedList));
    };

    return (
        <ul className="nav nav-pills selected-table-utils">
            {
                subTabList.map((val) => (
                    <li key={val.tag} className="nav-item">
                        <a
                            className={subTabIsSelected(val.tag, val.icon)}
                            onClick={() => selectSubTab(val.tag)}
                        >
                            {' '}
                            {val.name}
                        </a>
                    </li>
                ))
            }
            {
                content.selected.isFixed === false
                    ? (
                        <li className="nav-item">
                            <a
                                className="nav-link icon ion-ios-hammer"
                                onClick={() => fixedIt()}
                            >
                                固定
                            </a>
                        </li>
                    )
                    : null
            }
        </ul>
    );
};

export default ContentSubTab;
