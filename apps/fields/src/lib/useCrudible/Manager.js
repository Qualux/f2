import { useState, useEffect } from 'react';
import {
    useQuery,
    keepPreviousData,
} from '@tanstack/react-query';
import { useCrudible } from './useCrudible';

export default function Manager( {sdoKey, api} ) {

    const [page, setPage] = useState(1);
    const [sortColumn, setSortColumn] = useState('ID');
    const [sortOrder, setSortOrder] = useState('DESC');
    const [filterValues, setFilterValues] = useState(null);

    const {
        isLoading,
        data,
    } = useQuery({
        queryKey: ['f2_sdo_query', page, sortColumn, sortOrder, filterValues],
        queryFn: () => api.get(page, sortColumn, sortOrder, filterValues),
        placeholderData: keepPreviousData,
    });

    const { HeaderSDO, Grid, Footer, sdo, sdoRoutes } = useCrudible({
        sdoKey
    });

    useEffect(() => {
        const initialFilterValues = Object.fromEntries(sdo.filters.map(filter => [filter.key, ''])); // Initialize all filters to empty string
        setFilterValues(initialFilterValues);
    }, []);

    if (isLoading && !data) {
        return(
            <div>
                IS LOADING
            </div>
        )
    }

    return(
        <div className="max-w-3xl my-2">
            <HeaderSDO />
            <Grid 
                routes={sdoRoutes}
                data={data} 
                columns={sdo.columns}
                page={page}
                setPage={setPage}
                sortColumn={sortColumn}
                setSortColumn={setSortColumn}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                filters={sdo.filters}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
            />
            <Footer data={data} />
        </div>
    );

}