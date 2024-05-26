import AppTemplate from '../components/global/AppTemplate';
import { useFormManager } from '../lib/useFormManager/useFormManager';
import { SDO_StandardAPI } from '../api/SDO_StandardAPI';

const api = SDO_StandardAPI;
api.route_base = 'options-page';

const formData = {
    form: {
        field_groups: [
            {
                name: 'fg1',
                fields: [
                    {
                        name: 'test_field_1',
                        type: 'text',
                        placeholder: 'Test field 1...',
                        field_default_value: 'Ten 10',
                        field_required: true,
                    },
                    {
                        name: 'test_field_2',
                        type: 'text',
                        placeholder: 'Test field 2...',
                        field_default_value: 'Seven 7',
                    }
                ],
                repeat: true,
            }
        ]
    },
    record: {
        id: 0,
        type: 'PostRecord',
        test_field_1: 'Thirteen 13',
        test_field_2: 'Fiver 55555',
    },
    api,
}

export default function Test() {

    const { FormProvider, Form, Fields, SubmitButton, FormComplete } = useFormManager();

    return(
        <AppTemplate>
            <h2 className="mb-8 text-neutral-200 font-semibold">FORM TEST</h2>
            <FormProvider formData={formData}>
                <Form>
                    <Fields />
                    <SubmitButton />
                </Form>
                <FormComplete />
            </FormProvider>
        </AppTemplate>
    )
}