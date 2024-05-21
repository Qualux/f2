import { useContext } from 'react';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { SDO_Context } from './SDO_Context';

export default function Crudible( {children, sdo} ) {

    const queryClient = new QueryClient();

    /* Generate the route data from the SDO routeBase. */
    const sdoRoutes = {
        dashboard: '/' + sdo.routeBase,
        create: '/' + sdo.routeBase + '/create',
        edit: '/' + sdo.routeBase + '/edit',
        delete: '/' + sdo.routeBase + '/delete',
        view: '/' + sdo.routeBase + '/view',
    }
    sdo.routes = sdoRoutes;

    return(
        <SDO_Context.Provider value={sdo}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SDO_Context.Provider>
    );

}