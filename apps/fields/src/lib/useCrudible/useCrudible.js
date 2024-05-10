import { useSDO } from '../../lib/useSDO/useSDO';
import Crudible from './Crudible';
import Header from './Header';
import Footer from './Footer';
import Grid from './grid/Grid';

export function useCrudible( params = { sdoKey: null } ) {

    const { sdo, AppForm } = useSDO( params.sdoKey );
    const sdoRoutes = {
        create: sdo.routeBase + '/create',
    }

    return { Crudible, Grid, Header, Footer, AppForm, sdo, sdoRoutes }

}