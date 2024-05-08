import { useState } from 'react';

const filters = [
    { key: 'field_type', label: 'FIELD TYPE', type: 'select', options: [
        { value: 'text', label: 'Text' },
        { value: 'select', label: 'Select' },
        { value: 'number', label: 'Number' },
    ]},
    { key: 'search', label: 'SEARCH', type: 'text' },
    { key: 'recordsPerPage', label: 'RECORDS PER PAGE', type: 'select', options: [
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
    ]},
];

const initialFilterValues = Object.fromEntries(filters.map(filter => [filter.key, ''])); // Initialize all filters to empty string

export default function Filters() {

    const [filterValues, setFilterValues] = useState(initialFilterValues);

    const setFilterValue = (key, value) => {
        setFilterValues(prevValues => ({
            ...prevValues,
            [key]: value,
        }));
    };

    return(
        <div className="my-8 bg-neutral-50 p-6">
            <h5 className="text-xs mb-6 pb-1 border-b border-solid text-neutral-400">
                RECORD FILTERS
            </h5>
            <div className="filters">
                {filters.map(filter => (
                    <div key={filter.key}>
                        <h4 className="text-neutral-500 text-sm">{filter.label}</h4>
                        <Filter
                            filter={filter}
                            value={filterValues[filter.key]}
                            onChange={value => setFilterValue(filter.key, value)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

}



// Define TextFilter and SelectFilter components
const TextFilter = ({ value, onChange }) => (
    <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search by text..."
    />
);

const SelectFilter = ({ value, options, onChange }) => (
    <select
        value={value}
        onChange={e => onChange(e.target.value)}
    >
        {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
    </select>
);

const Filter = ({ filter, value, onChange }) => {
    if (filter.type === 'text') {
        return <TextFilter value={value} onChange={onChange} />;
    } else if (filter.type === 'select') {
        return <SelectFilter value={value} options={filter.options} onChange={onChange} />;
    }
    return null;
};