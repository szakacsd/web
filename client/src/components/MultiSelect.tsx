import React from 'react';
import Select from 'react-select';

interface Option {
    label: string;
    value: string;
}

interface MultiSelectProps {
    options: Option[];
    onChange: (selectedOptions: Option[]) => void;
    value: Option[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, onChange, value }) => {
    return (
        <Select
            isMulti
            options={options}
            onChange={(selectedOptions) => onChange(selectedOptions as Option[])}
            value={value}
        />
    );
};

export default MultiSelect;
