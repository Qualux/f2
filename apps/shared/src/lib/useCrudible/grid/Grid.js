import { createContext, useContext } from 'react';
import GridRow from './GridRow';
import SortableHeader from '../SortableHeader';
import Filters from '../Filters';
import Pager from '../Pager';

const GridRowContext = createContext( { index: null, id: null } );

export function useGridRowContext() {
    return useContext(GridRowContext);
}

export default function Grid(
    { 
        routes,
        data, 
        columns, 
        page, 
        setPage, 
        sortColumn, 
        setSortColumn, 
        sortOrder, 
        setSortOrder, 
        filters, 
        filterValues, 
        setFilterValues,
        controls,
    }
) {


    // Columns length sets the grid-cols-* class.
    // grid-cols-1, grid-cols-2, grid-cols-3, grid-cols-4, grid-cols-5, grid-cols-6.
    let gridSizeClass = '';
    switch( columns.length ) {
        case 2:
            gridSizeClass = 'grid-cols-2';
            break;
        case 3:
            gridSizeClass = 'grid-cols-3';
            break;
        case 4:
            gridSizeClass = 'grid-cols-4';
            break;
        case 5:
            gridSizeClass = 'grid-cols-5';
            break;
        case 6:
            gridSizeClass = 'grid-cols-6';
            break;
    }
    const gridClasses = `grid ${gridSizeClass} gap-2`;

    return(
        <main>
            <Filters
                filters={filters}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
            />
            <ul className={gridClasses}>
                {columns.map(column => (
                    <SortableHeader
                        key={column.columnKey}
                        label={column.label}
                        columnKey={column.columnKey}
                        sortColumn={sortColumn}
                        setSortColumn={setSortColumn}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />
                ))}
                {data.records.map( ( record, index ) =>
                    <GridRowContext.Provider 
                        key={index}
                        value={{ index: index, id: record.id }}
                    >
                        <GridRow 
                            record={record} 
                            routes={routes} 
                            columns={columns}
                            controls={controls}
                        />
                    </GridRowContext.Provider>
                    
                )}
            </ul>
            <Pager 
                pageCount={data.max_num_pages}
                page={page}
                setPage={setPage}
            />
        </main>
    );

}