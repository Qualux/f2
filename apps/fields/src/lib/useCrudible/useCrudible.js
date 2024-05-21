import { useContext } from 'react';
import Crudible from './Crudible';
import Manager from './Manager';
import Header from './Header';
import Footer from './Footer';
import DeleteScreen from './DeleteScreen';
import ViewScreen from './ViewScreen';
import Grid from './grid/Grid';
import systemSDO from '../../../../../data/system_sdos.json';
import { DomainContext } from '../../contexts';
import { useFetch } from '../../lib/useFetch';
import AppForm from './AppForm';
import { SDO_Context } from './SDO_Context';

export function useCrudible( params = { recordId: 0, api: null } ) {

    /*
     * Older SDO usage is to pass the sdoKey and pick the SDO from ssytemSDO (/data/system_sdos.json).
     * Newer usage passes the SDO from useCrudible, which gets it from the route. 
     */
    // OLD WAY TO LOAD SDO FROM JSON: sdo = systemSDO[ params.sdoKey ];

    const domain = useContext(DomainContext);
    const { postData } = useFetch();

    function useSDO() {
        const sdo = useContext(SDO_Context);
        return sdo;
    }

    const AppFormComponent = ( { recordId } ) => (
        <AppForm 
            postData={postData} 
            domain={domain} 
            recordId={recordId}
        />
    );

    function HeaderSDO({mode}) {
        return (
            <Header
                mode={mode}
            />
        );
    }

    function ViewScreenCompiled() {
        return(
            <ViewScreen 
                id={params.recordId}
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
        SDO_Context,
        useSDO,
    }

}