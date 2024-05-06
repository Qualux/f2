import { useState } from 'react';
import {
    useQuery,
    keepPreviousData,
} from '@tanstack/react-query';
import { FieldAPI } from '../../../api/FieldAPI';
import { useCrudible } from '../../../lib/useCrudible';
import Field from './Field';
import FieldListFilters from './FieldListFilters';
import Pager from './Pager';

export default function FieldListOutput() {

    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [fieldTypeFilter, setFieldTypeFilter] = useState(0);
    const [searchFilter, setSearchFilter] = useState('');
    const [page, setPage] = useState(1);
    const [sortColumn, setSortColumn] = useState('ID');
    const [sortOrder, setSortOrder] = useState('DESC');

    const {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPlaceholderData,
    } = useQuery({
        queryKey: ['fields', page, sortColumn, sortOrder, recordsPerPage, fieldTypeFilter, searchFilter],
        queryFn: () => FieldAPI.get(page, sortColumn, sortOrder, recordsPerPage, fieldTypeFilter, searchFilter),
        placeholderData: keepPreviousData,
    });

    const { SortableHeader } = useCrudible();

    if (isLoading && !data) {
        return(
            <div>
                IS LOADING
            </div>
        )
    }

    return(
        <div className="max-w-3xl">
            <FieldListFilters 
                recordsPerPage={recordsPerPage}
                setRecordsPerPage={setRecordsPerPage}
                fieldTypeFilter={fieldTypeFilter}
                setFieldTypeFilter={setFieldTypeFilter}
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
            />
            <div className="grid grid-cols-4 gap-2">
                <SortableHeader 
                    label="ID"
                    columnKey="ID"
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />
                <SortableHeader 
                    label="Title"
                    columnKey="title"
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />
                <SortableHeader 
                    label="Type"
                    columnKey="field_type"
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />
                <div>&nbsp;</div>
                {data.fields.map( ( field, index ) =>
                    <Field key={index} field={field} index={index} />
                )}
            </div>
            <Pager 
                pageCount={data.max_num_pages}
                page={page}
                setPage={setPage}
            />
            <div className="flex gap-6 text-xs text-neutral-400">
                <div>
                    Pages Found: {data.max_num_pages}
                </div>
                <div>
                    Total Records: {data.found_posts}
                </div>
            </div>
        </div>
    );

}