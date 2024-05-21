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
    const { HeaderSDO, Grid, Footer, useSDO } = useCrudible();
    const sdo = useSDO();

    console.log('sdo in manager:')
    console.log(sdo)

    // Setup API.
    const api = SDO_StandardAPI;
    api.routeBase = sdo.routeBase;

    const {
        isLoading,
        data,
    } = useQuery({
        queryKey: ['f3_sdo_query', page, sortColumn, sortOrder, filterValues],
        queryFn: () => api.get(page, sortColumn, sortOrder, filterValues),
        placeholderData: keepPreviousData,
    });

    console.log('data in manager:')
    console.log(data)

    useEffect(() => {
        const initialFilterValues = Object.fromEntries(sdo.filters.map(filter => [filter.key, ''])); // Initialize all filters to empty string
        setFilterValues(initialFilterValues);
    }, []);

    if (isLoading && !data) {
        return(
            <>
                <HeaderSDO />
                <ScreenWrap>
                    <SkeletonList />
                </ScreenWrap>
            </>
        )
    }

    if( data === undefined ) {
        return(
            <>
                <HeaderSDO />
                <ScreenWrap>
                    <SkeletonList />
                </ScreenWrap>
            </>
        );
    }

    return(
        <>
            <HeaderSDO />
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