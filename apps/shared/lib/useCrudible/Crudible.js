import { useContext } from 'react';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { SDO_Context } from './SDO_Context';

export default function Crudible( {children, sdo} ) {

    const queryClient = new QueryClient();

    /* Generate the route data from the SDO route_base. */
    const sdoRoutes = {
        dashboard: '/' + sdo.route_base,
        create: '/' + sdo.route_base + '/create',
        edit: '/' + sdo.route_base + '/edit',
        delete: '/' + sdo.route_base + '/delete',
        view: '/' + sdo.route_base + '/view',
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