import { useContext } from 'react';
import Crudible from './Crudible';
import Manager from './Manager';
import Header from './Header';
import Footer from './Footer';
import DeleteScreen from './DeleteScreen';
import ViewScreen from './ViewScreen';
import Grid from './grid/Grid';
import AppForm from './AppForm';
import { SDO_Context } from './SDO_Context';

export function useCrudible( params = { recordId: 0, api: null } ) {

    function useSDO() {
        const sdo = useContext(SDO_Context);
        return sdo;
    }

    const AppFormComponent = ( { recordId } ) => (
        <AppForm 
            recordId={recordId}
        />
    );

    function HeaderComponent({mode}) {

        return (
            <Header />
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
        Header: HeaderComponent, 
        Footer, 
        AppForm: AppFormComponent, 
        DeleteScreen, 
        ViewScreen: ViewScreenCompiled,
        SDO_Context,
        useSDO,
    }

}