import {
    useQuery
} from '@tanstack/react-query';
import { useCrudible } from './useCrudible';
import { useFormManager } from '../../lib/useFormManager/useFormManager';
import { SDO_StandardAPI } from '../../api/SDO_StandardAPI';

export default function AppForm( { recordId = 0 } ) {

    const { useSDO } = useCrudible();
    const sdo = useSDO();
    const { FormProvider, Form, Fields, SubmitButton } = useFormManager();

    // Setup API.
    const api = SDO_StandardAPI;
    api.route_base = sdo.route_base;

    const { data } = useQuery({
        queryKey: ['record', recordId],
        queryFn: () => api.getOne(recordId),
        enabled: !!recordId, // Only run query if recordId is available
    });

    let record = {}
    if( data ) {
        record = data.record;
    }

    const formData = {
        form: {
            field_groups: sdo.field_groups,  
        },
        record,
        api,
    }

    return(
        <FormProvider formData={formData}>
            <Form>
                <Fields />
                <SubmitButton />
            </Form>
        </FormProvider>
    );

}