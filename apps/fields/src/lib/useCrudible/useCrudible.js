import { useSDO } from '../../lib/useSDO/useSDO';
import Crudible from './Crudible';
import Manager from './Manager';
import Header from './Header';
import Footer from './Footer';
import DeleteScreen from './DeleteScreen';
import ViewScreen from './ViewScreen';
import Grid from './grid/Grid';

export function useCrudible( params = { sdoKey: null, recordId: 0, api: null } ) {

    const { sdo, AppForm } = useSDO( params.sdoKey );
    const sdoRoutes = {
        create: '/' + sdo.routeBase + '/create',
        edit: '/' + sdo.routeBase + '/edit',
        delete: '/' + sdo.routeBase + '/delete',
        view: '/' + sdo.routeBase + '/view',
    }

    function HeaderSDO() {
        return (
            <Header
                to={sdoRoutes.create} 
                buttonLabel={sdo.create.button.label}
                title={sdo.displayTitle}
            />
        );
    }

    function ViewScreenCompiled() {
        return(
            <ViewScreen 
                id={params.recordId}
                sdo={sdo}
                api={params.api}
            />
        );
    }

    return { 
        Crudible, 
        Manager, 
        Grid, 
        Header, 
        HeaderSDO, 
        Footer, 
        AppForm, 
        DeleteScreen, 
        ViewScreen: ViewScreenCompiled,
        sdo, 
        sdoRoutes 
    }

}