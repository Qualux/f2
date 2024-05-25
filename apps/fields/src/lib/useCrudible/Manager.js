import { useState, useEffect, useContext } from 'react';
import {
    useQuery,
    keepPreviousData,
} from '@tanstack/react-query';
import { useCrudible } from './useCrudible';
import ScreenWrap from '../../components/global/ScreenWrap';
import SkeletonList from '../../components/global/SkeletonList';
import { SDO_StandardAPI } from '../../api/SDO_StandardAPI';

export default function Manager() {

    const [page, setPage] = useState(1);
    const [sortColumn, setSortColumn] = useState('ID');
    const [sortOrder, setSortOrder] = useState('DESC');
    const [filterValues, setFilterValues] = useState(null);
    const { Header, Grid, Footer, useSDO } = useCrudible();
    const sdo = useSDO();

    // Setup API.
    const api = SDO_StandardAPI;
    api.routeBase = sdo.routeBase;

    const {
        isLoading,
        data,
    } = useQuery({
        queryKey: ['f3_sdo_query_'+sdo.routeBase, page, sortColumn, sortOrder, filterValues],
        queryFn: () => api.get(page, sortColumn, sortOrder, filterValues),
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        const initialFilterValues = Object.fromEntries(sdo.filters.map(filter => [filter.key, ''])); // Initialize all filters to empty string
        setFilterValues(initialFilterValues);
    }, []);

    if (isLoading && !data) {
        return(
            <>
                <Header />
                <ScreenWrap>
                    <SkeletonList />
                </ScreenWrap>
            </>
        )
    }

    if( data === undefined ) {
        return(
            <>
                <Header />
                <ScreenWrap>
                    <SkeletonList />
                </ScreenWrap>
            </>
        );
    }

    return(
        <>
            <Header />
            <ScreenWrap>
                <Grid 
                    routes={sdo.routes}
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
            </ScreenWrap>
        </>
    );

}