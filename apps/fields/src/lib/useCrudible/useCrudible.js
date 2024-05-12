import { useSDO } from '../../lib/useSDO/useSDO';
import Crudible from './Crudible';
import Manager from './Manager';
import Header from './Header';
import Footer from './Footer';
import DeleteScreen from './DeleteScreen';
import Grid from './grid/Grid';

export function useCrudible( params = { sdoKey: null } ) {

    const { sdo, AppForm } = useSDO( params.sdoKey );
    const sdoRoutes = {
        create: '/' + sdo.routeBase + '/create',
        edit: '/' + sdo.routeBase + '/edit',
        delete: '/' + sdo.routeBase + '/delete',
        view: '/' + sdo.routeBase + '/view',
    }

    return { Crudible, Manager, Grid, Header, Footer, AppForm, DeleteScreen, sdo, sdoRoutes }

}