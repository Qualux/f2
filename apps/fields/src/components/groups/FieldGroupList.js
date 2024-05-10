import { useState } from 'react';
import {
    useQuery,
    keepPreviousData,
} from '@tanstack/react-query';
import { useFieldGroupCollection } from '../../lib/useFieldGroupCollection';
import { NavLink } from "react-router-dom";
import { FieldGroupAPI } from '../../api/FieldGroupAPI';
import { useCrudible } from '../../lib/useCrudible/useCrudible';

/* Setup route paths. */
const routes = {
    edit: '/groups/edit',
    view: '/groups/view',
    delete: '/groups/delete',
    create: '/groups/create',
}

/* Columns and filters definition. */

const columns = [
    { label: 'ID', columnKey: 'ID', recordKey: 'id' },
    { label: 'Title', columnKey: 'title', recordKey: 'title' },
];

const filters = [
    { key: 'search', label: 'SEARCH', placeholder: 'Search by field title...', type: 'text' },
    { key: 'records_per_page', label: 'RECORDS PER PAGE', type: 'select', options: [
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
    ]},
];

const initialFilterValues = Object.fromEntries(filters.map(filter => [filter.key, ''])); // Initialize all filters to empty string

/* Wrapper component that uses Crudible to set React Query context provider. */
export default function FieldGroupList() {

    const { Crudible } = useCrudible();

    return(
        <Crudible>
            <FieldGroupManager />
        </Crudible>
    );

}


function FieldGroupManager() {

    const [page, setPage] = useState(1);
    const [sortColumn, setSortColumn] = useState('ID');
    const [sortOrder, setSortOrder] = useState('DESC');
    const [filterValues, setFilterValues] = useState(initialFilterValues);

    const {
        isLoading,
        data,
    } = useQuery({
        queryKey: ['fields', page, sortColumn, sortOrder, filterValues],
        queryFn: () => FieldGroupAPI.get(page, sortColumn, sortOrder, filterValues),
        placeholderData: keepPreviousData,
    });

    const { Header, Grid, Footer } = useCrudible();

    if (isLoading && !data) {
        return(
            <div>
                IS LOADING
            </div>
        )
    }

    return(
        <div className="max-w-3xl">
            <Header 
                to={routes.create} 
                buttonLabel="Create Field Group"
                title="F2 FIELD GROUP MANAGER"
            />
            <Grid 
                routes={routes}
                data={data} 
                columns={columns}
                page={page}
                setPage={setPage}
                sortColumn={sortColumn}
                setSortColumn={setSortColumn}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                filters={filters}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
            />
            <Footer data={data} />
        </div>
    );

}