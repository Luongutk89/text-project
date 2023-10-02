import React, { useState, useEffect, useRef } from 'react';

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [lineWidth, setLineWidth] = useState(0);
    const [linePosition, setLinePosition] = useState(0);
    const menuRef = useRef(null);

    useEffect(() => {
        handleTabClick(0);
    }, []);

    const handleTabClick = (index) => {
        const menuItem = menuRef.current.childNodes[index];
        const menuWidth = menuItem.offsetWidth;
        const menuPosition = menuItem.offsetLeft - 20;

        setLineWidth(menuWidth);
        setLinePosition(menuPosition);
        setActiveTab(index);
    };

    return (
        <div className="tabs__container">
            <div ref={menuRef} className="list__tabs">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={index === activeTab ? 'active tab__item' : 'tab__item'}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.title}
                    </button>
                ))}
                <div className="line" style={{ width: `${lineWidth}px`, transform: `translateX(${linePosition}px)` }} />
            </div>
            <div className="tab__content">
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export default Tabs;
