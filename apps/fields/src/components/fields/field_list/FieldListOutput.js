import { useState } from 'react';
import {
    useQuery,
    keepPreviousData,
} from '@tanstack/react-query';
import { FieldAPI } from '../../../api/FieldAPI';
import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import Field from './Field';
import FieldListFilters from './FieldListFilters';

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

    const { Header, Grid, SortableHeader, Pager, Footer } = useCrudible();

    if (isLoading && !data) {
        return(
            <div>
                IS LOADING
            </div>
        )
    }

    return(
        <div className="max-w-3xl">
            <Header to="/fields/create" />
            <Grid 
                data={data} 
                page={page}
                setPage={setPage}
                sortColumn={sortColumn}
                setSortColumn={setSortColumn}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
            <h2 className="mt-8 font-bold text-3xl">---------- AFTER GRID ---------</h2>
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
            <Footer data={data} />
        </div>
    );

}