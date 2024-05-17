import { useContext } from 'react';
import systemSDO from '../../../../../data/system_sdos.json';
import { useFetch } from '../../lib/useFetch';
import { DomainContext } from '../../contexts';
import AppForm from './AppForm';

export function useSDO( sdoKey ) {

    const domain = useContext(DomainContext);
    const { postData } = useFetch();
    const sdo = systemSDO[ sdoKey ];

    const AppFormComponent = ( { api, recordId } ) => (
        <AppForm 
            sdo={sdo} 
            postData={postData} 
            domain={domain} 
            api={api}
            recordId={recordId}
        />
    );

    return { sdo, AppForm: AppFormComponent }

}