export default function FieldListFilters({recordsPerPage, setRecordsPerPage, fieldTypeFilter, setFieldTypeFilter, searchFilter, setSearchFilter}) {

    return(
        <div className="my-8 bg-neutral-50 p-6">
            <h5 className="text-xs mb-6 pb-1 border-b border-solid text-neutral-400">
                RECORD FILTERS
            </h5>
            <div className="flex items-center gap-8">
                <div>
                    <h4 className="text-neutral-500 text-sm">
                        FIELD TYPE
                    </h4>
                    <select
                        className="w-52 border border-solid border-neutral-200"
                        onChange={ (e) => { setFieldTypeFilter(e.target.value) } }
                    >
                        <option value="text">Text</option>
                        <option value="select">Select</option>
                        <option value="number">Number</option>
                    </select>
                </div>
                <div>
                    <h4 className="text-neutral-500 text-sm">
                        SEARCH
                    </h4>
                    <input 
                        onKeyUp={ (e) => { setSearchFilter(e.target.value); } }
                        type="text" 
                        placeholder="Search by text..." 
                    />
                </div>
                <div>
                    <h4 className="text-neutral-500 text-sm">
                        RECORDS PER PAGE
                    </h4>
                    <select
                        className="w-52 border border-solid border-neutral-200"
                        onChange={ (e) => { setRecordsPerPage(e.target.value) } }
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
        </div>
    );

}