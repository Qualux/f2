import { useState } from 'react';
import { NavLink } from "react-router-dom";
import SortableHeader from './SortableHeader';
import Filters from './Filters';
import Pager from './Pager';
import DeleteButton from './DeleteButton';

const columns = [
    { label: 'ID', columnKey: 'ID' },
    { label: 'Title', columnKey: 'title' },
    { label: 'Type', columnKey: 'field_type' },
    { label: '', columnKey: '' },
];

function GridRow({field, index}) {

    /* Invalid field_type property. @TODO this property should be valid prior to response from API P/R. */
    if( field.field_type?.value ) {
        return null;
    }

    return(
        <>
            <div className="font-medium text-xs text-zinc-800 px-2 py-1">
                {field.id}
            </div>
            <div className="font-medium text-xs px-2 py-1">
                {field.field_title}
            </div>
            <div className="font-medium text-xs px-2 py-1">
                {field.field_type}
            </div>
            <div className="flex justify-end grow gap-3 items-center">
                <NavLink
                    to={`/fields/view/${field.id}`}
                    className="font-semibold text-zinc-100 text-xs bg-neutral-900 py-1 px-6 rounded transition-colors hover:bg-sky-700"
                    >
                    VIEW
                </NavLink>
                <NavLink
                    to={`/fields/edit/${field.id}`}
                    className="font-semibold text-zinc-100 text-xs bg-neutral-900 py-1 px-6 rounded transition-colors hover:bg-sky-700"
                    >
                    EDIT
                </NavLink>
                <DeleteButton field={field} />
            </div>
        </>
    );

}

export default function Grid({data, page, setPage, sortColumn, setSortColumn, sortOrder, setSortOrder}) {

    return(
        <main>
            <Filters />
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
                    <GridRow key={index} field={field} index={index} />
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