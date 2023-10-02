import React, { useState, useEffect, useRef } from "react";

const ContextMenu = ({ options, onSelect, triggerContent, customClass }) => {
    const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
    const contextMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
                closeContextMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const openContextMenu = (event) => {
        event.preventDefault();
        if (isContextMenuVisible) {
            closeContextMenu();
            return;
        }
        setIsContextMenuVisible(true);
    };

    const closeContextMenu = () => {
        setIsContextMenuVisible(false);
    };

    const handleOptionSelect = (option) => {
        onSelect(option);
        closeContextMenu();
    };

    return (
        <div className={`context__menu ${customClass ? customClass : ''}`}>
            <div className="context__menu-trigger" onClick={openContextMenu}>
                {triggerContent}
            </div>

            {isContextMenuVisible && (
                <div ref={contextMenuRef} className="context__menu-option">
                    {options.map((option) => (
                        <div
                            className="context__option-item"
                            key={option.value}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ContextMenu;
