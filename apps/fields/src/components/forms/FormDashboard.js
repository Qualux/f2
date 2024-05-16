import { useState }  from 'react';
import {
    useQuery,
    keepPreviousData,
} from '@tanstack/react-query';
import { FormAPI } from '../../api/FormAPI';
import { useCrudible } from '../../lib/useCrudible/useCrudible';

/* Setup route paths. */
const routes = {
    edit: '/forms/edit',
    view: '/forms/view',
    delete: '/forms/delete',
    create: '/forms/create',
}

/* Columns and filters definition. */

const columns = [
    { label: 'ID', columnKey: 'ID', recordKey: 'id', },
    { label: 'Title', columnKey: 'title', recordKey: 'title', },
    { label: '', columnKey: 'controls' },
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


export default function FormDashboard() {

    const { Crudible } = useCrudible({
        sdoKey: 'form'
    });

    return(
        <main>
            <Crudible>
                <FormManager />
            </Crudible>
        </main>
    );

}

function FormManager() {

    const [page, setPage] = useState(1);
    const [sortColumn, setSortColumn] = useState('ID');
    const [sortOrder, setSortOrder] = useState('DESC');
    const [filterValues, setFilterValues] = useState(initialFilterValues);

    const {
        isLoading,
        data,
    } = useQuery({
        queryKey: ['f3_forms', page, sortColumn, sortOrder, filterValues],
        queryFn: () => FormAPI.get(page, sortColumn, sortOrder, filterValues),
        placeholderData: keepPreviousData,
    });

    const { Header, Grid, Footer, sdo, sdoRoutes } = useCrudible({
        sdoKey: 'form'
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
                to={sdoRoutes.create} 
                buttonLabel="Create Form"
                title="F3 FORMS MANAGER"
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
                sdo={sdo}
                sdoRoutes={sdoRoutes}
            />
            <Footer data={data} />
        </div>
    );

}