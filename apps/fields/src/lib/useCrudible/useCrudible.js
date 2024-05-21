import { useContext } from 'react';
import Crudible from './Crudible';
import Manager from './Manager';
import Header from './Header';
import Footer from './Footer';
import DeleteScreen from './DeleteScreen';
import ViewScreen from './ViewScreen';
import Grid from './grid/Grid';
import { SDO_Context } from './SDO_Context';
import systemSDO from '../../../../../data/system_sdos.json';
import { DomainContext } from '../../contexts';
import { useFetch } from '../../lib/useFetch';
import AppForm from './AppForm';

export function useCrudible( params = { sdoKey: null, sdoDefinition: null, recordId: 0, api: null } ) {

    /*
     * Older SDO usage is to pass the sdoKey and pick the SDO from ssytemSDO (/data/system_sdos.json).
     * Newer usage passes the SDO from useCrudible, which gets it from the route. 
     */
    let sdo = null;
    if( ! params.sdoDefinition ) {
        sdo = systemSDO[ params.sdoKey ];
    } else {
        sdo = params.sdoDefinition;
    }

    /* Generate the route data from the SDO routeBase. */
    const sdoRoutes = {
        dashboard: '/' + sdo.routeBase,
        create: '/' + sdo.routeBase + '/create',
        edit: '/' + sdo.routeBase + '/edit',
        delete: '/' + sdo.routeBase + '/delete',
        view: '/' + sdo.routeBase + '/view',
    }
    sdo.routes = sdoRoutes;

    const domain = useContext(DomainContext);
    const { postData } = useFetch();

    const AppFormComponent = ( { api, recordId } ) => (
        <AppForm 
            sdo={sdo} 
            postData={postData} 
            domain={domain} 
            api={api}
            recordId={recordId}
        />
    );

    

    function SDO( {children} ) {

        return(
            <SDO_Context.Provider value={sdo}>
                {children}
            </SDO_Context.Provider>
        );

    }

    function HeaderSDO({mode}) {
        return (
            <Header
                to={sdoRoutes.create} 
                buttonLabel={sdo.create.button.label}
                title={sdo.displayTitle}
                mode={mode}
                dashboardRoute={sdoRoutes.dashboard}
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
        AppForm: AppFormComponent, 
        DeleteScreen, 
        ViewScreen: ViewScreenCompiled,
        sdo, 
        sdoRoutes,
        SDO, 
        SDO_Context
    }

}