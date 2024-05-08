import { useState } from 'react';
import GridRow from './GridRow';
import SortableHeader from '../SortableHeader';
import Filters from '../Filters';
import Pager from '../Pager';

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
        setFilterValues
    }
) {

    return(
        <main>
            <Filters
                filters={filters}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
            />
            <ul className="grid grid-cols-4 gap-2">
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
                {data.fields.map( ( field, index ) =>
                    <GridRow key={index} field={field} index={index} routes={routes} />
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