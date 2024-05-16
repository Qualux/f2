import { useState } from 'react';
import {
    useQuery,
    keepPreviousData,
} from '@tanstack/react-query';
import { FieldAPI } from '../../api/FieldAPI';
import { useCrudible } from '../../lib/useCrudible/useCrudible';

// @TODO set the routes for view, edit, delete, create and pass these into Grid/Crudible.

/* Setup route paths. */
const routes = {
    edit: '/fields/edit',
    view: '/fields/view',
    delete: '/fields/delete',
    create: '/fields/create',
}

/* Columns and filters definition. */

const columns = [
    { label: 'ID', columnKey: 'ID', recordKey: 'id', },
    { label: 'Title', columnKey: 'title', recordKey: 'field_title', },
    { label: 'Type', columnKey: 'field_type', recordKey: 'field_type', },
    { label: '', columnKey: 'controls' },
];

const filters = [
    { key: 'field_type', label: 'FIELD TYPE', type: 'select', options: [
        { value: '', label: 'Any' },
        { value: 'text', label: 'Text' },
        { value: 'checkbox', label: 'Checkbox' },
        { value: 'select', label: 'Select' },
        { value: 'number', label: 'Number' },
    ]},
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
export default function FieldDashboard() {

    const { Crudible } = useCrudible({
        sdoKey: 'field'
    });

    return(
        <Crudible>
            <FieldManager />
        </Crudible>
    );

}

// @TODO move most of this component into Crudible because it is generic/dynamic and can be reused for FG and other manager apps.
function FieldManager() {

    const [page, setPage] = useState(1);
    const [sortColumn, setSortColumn] = useState('ID');
    const [sortOrder, setSortOrder] = useState('DESC');
    const [filterValues, setFilterValues] = useState(initialFilterValues);

    const {
        isLoading,
        data,
    } = useQuery({
        queryKey: ['fields', page, sortColumn, sortOrder, filterValues],
        queryFn: () => FieldAPI.get(page, sortColumn, sortOrder, filterValues),
        placeholderData: keepPreviousData,
    });

    const { Header, Grid, Footer } = useCrudible({
        sdoKey: 'field'
    });

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
                buttonLabel="Create Field"
                title="F3 FIELD MANAGER"
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