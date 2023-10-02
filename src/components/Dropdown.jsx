import { useState, useEffect, useRef } from "react";
import { BiCaretDown } from "react-icons/bi";

const Dropdown = ({ options, onSelect, headerContent, dropdownClass }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        window.addEventListener("click", handleOutsideClick);

        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const dropdownStyle = {
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
    };

    return (
        <div className={`dropdown ${dropdownClass}`} ref={dropdownRef} >
            <div className="dropdown-header" onClick={toggleDropdown}>
                {headerContent(selectedOption)}
                <BiCaretDown />
            </div>
            <ul className="dropdown-options" style={dropdownStyle}>
                {options.map((option) => (
                    <li
                        key={option.value}
                        onClick={() => handleOptionClick(option)}
                        className='dropdown-item'
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default Dropdown;
