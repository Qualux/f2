import { useState, useEffect, useContext } from 'react';
import {
    useQuery,
    keepPreviousData,
} from '@tanstack/react-query';
import { useCrudible } from 'shared';
import { ScreenWrap } from 'shared';
import { SkeletonList } from 'shared';
import { useStandardAPI } from 'shared';

export default function Manager() {

    const [page, setPage] = useState(1);
    const [sortColumn, setSortColumn] = useState('ID');
    const [sortOrder, setSortOrder] = useState('DESC');
    const [filterValues, setFilterValues] = useState(null);
    const { Header, Grid, Footer, useSDO } = useCrudible();
    const sdo = useSDO();
    const API = useStandardAPI(sdo.route_base);

    const {
        isLoading,
        data,
    } = useQuery({
        queryKey: ['f3_sdo_query_'+sdo.route_base, page, sortColumn, sortOrder, filterValues],
        queryFn: () => API.get(page, sortColumn, sortOrder, filterValues),
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