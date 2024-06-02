export default function SortableHeader({ label, columnKey, defaultSortOrder, sortColumn, setSortColumn, sortOrder, setSortOrder }) {

    const handleSortClick = () => {

        if (sortColumn === columnKey) {
            // Toggle sort order if the same column is clicked
            setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
        } else {
            // Set new sort column and default to ASC
            setSortColumn(columnKey);
            setSortOrder(defaultSortOrder);
        }
    };

    return (
        <div
            className={`cursor-pointer font-light text-sm text-neutral-400 px-2 py-1 ${
                sortColumn === columnKey ? 'text-blue-500' : ''
            }`}
            onClick={handleSortClick}
        >
            {label}
            {sortColumn === columnKey && (
                <span className="ml-1">{sortOrder === 'ASC' ? '▲' : '▼'}</span>
            )}
        </div>
    );
    
}