export default function Filters({filters, filterValues, setFilterValues}) {

    const setFilterValue = (key, value) => {
        setFilterValues(prevValues => ({
            ...prevValues,
            [key]: value,
        }));
    };

    return(
        <div className="my-0 bg-neutral-600/10 py-6 px-5 rounded-t-md">
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
        <h4 className="mt-0 mb-1 p-0 text-neutral-500 text-sm font-light">{label}</h4>
        <input
            className="w-full max-w-52 !bg-white/10 border border-white/20 border-solid py-1 px-1 !text-neutral-300 text-sm placeholder:text-neutral-500"
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
        />
    </div>
);

const SelectFilter = ({ label, value, options, onChange }) => (
    <div>
        <h4 className="mt-0 mb-1 p-0 text-neutral-500 text-sm font-light">{label}</h4>
        <select
            className="w-full max-w-52 !bg-white/10 border border-white/20 border-solid py-1 px-1 !text-neutral-500 hover:!text-neutral-500"
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