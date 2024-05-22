import AppTemplate from '../components/global/AppTemplate';

import { useFormManager } from '../lib/useFormManager/useFormManager';

const form = {
    field_groups: [
        {
            fields: [
                {
                    field_name: 'test_field_1',
                    field_type: 'text',
                    field_placeholder: 'Test field 1...',
                }
            ]
        }
    ]
}

export default function Test() {

    const { useFormContext, FormProvider, Form, Fields, SubmitButton } = useFormManager();

    return(
        <AppTemplate>
            <h2 className="mb-8 text-neutral-200 font-semibold">FORM TEST</h2>
            <FormProvider form={form}>
                <Form>
                    <input className="border border-solid" type="text" placeholder="Test field 1..."/>
                    <Fields />
                    <SubmitButton />
                </Form>
            </FormProvider>
        </AppTemplate>
    )
}