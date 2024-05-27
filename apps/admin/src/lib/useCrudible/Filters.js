export default function Filters({filters, filterValues, setFilterValues}) {

    const setFilterValue = (key, value) => {
        setFilterValues(prevValues => ({
            ...prevValues,
            [key]: value,
        }));
    };

    return(
        <div className="my-8 bg-neutral-50 py-3 px-2">
            <div className="flex items-center gap-8 flex-wrap">
                {filters.map(filter => (
                    <div 
                        key={filter.key}
                        className="basis-1/4"
                    >
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
const TextFilter = ({ label, placeholder, value, onChange }) => (
    <div>
        <h4 className="text-neutral-400 text-xs text-medium">{label}</h4>
        <input
            className="w-full max-w-52 border border-neutral-800 border-solid py-1 px-1 text-sm text-medium placeholder:text-neutral-300"
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
        />
    </div>
);

const SelectFilter = ({ label, value, options, onChange }) => (
    <div>
        <h4 className="text-neutral-400 text-xs text-medium">{label}</h4>
        <select
            className="w-full max-w-52 border border-neutral-800 border-solid py-1 px-1"
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

const Filter = ({ filter, value, onChange }) => {
    if (filter.type === 'text') {
        return <TextFilter label={filter.label} placeholder={filter.placeholder} value={value} onChange={onChange} />;
    } else if (filter.type === 'select') {
        return <SelectFilter label={filter.label} value={value} options={filter.options} onChange={onChange} />;
    }
    return null;
};