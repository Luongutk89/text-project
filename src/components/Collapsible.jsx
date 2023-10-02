import React, { useState, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';

function Collapsible({ title, totalVocabulary, children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [maxHeight, setMaxHeight] = useState(0);
    const collapsibleContentRef = useRef(null);

    const toggleCollapse = () => {
        const subMenu = collapsibleContentRef.current;
        setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
        setMaxHeight(!isCollapsed ? subMenu.scrollHeight : 0);
    };

    return (
        <div className="collapsible__container">
            <div className="collapsible__header" onClick={toggleCollapse}>
                <div className='header__left'>
                    <h3 className='header__left-title'>{title}</h3>
                    <span className='header__left-total'>Tổng số từ vựng: {totalVocabulary}</span>
                </div>
                <FiChevronDown className={`icon__collapse ${isCollapsed ? 'active' : ''}`} />
            </div>
            <div
                className="collapsible__content"
                ref={collapsibleContentRef}
                style={{ maxHeight: `${maxHeight}px` }}
            >
                {children}
            </div>
        </div>
    );
}

export default Collapsible;
