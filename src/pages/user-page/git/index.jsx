import React, { useState } from 'react';
import Dropdown from '../../../components/Dropdown';

const Git = () => {
    const statusOptions = [
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
        { value: "postponed", label: "Postponed" },
    ];
    const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);

    const handleOptionSelect = (option) => {
        setSelectedStatus(option);
        console.log('Selected Priority:', option.label);
    };

    return (
        <div>
            <Dropdown
                options={statusOptions}
                onSelect={(option) => handleOptionSelect(option)}
                headerContent={(selectedOption) => (
                    selectedOption ? selectedOption.label : selectedStatus.label
                )}
            />
        </div>
    );
}

export default Git;
