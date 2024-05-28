const { createRoot, useEffect, useState } = wp.element;
import { useFormManager } from 'shared';
import { interceptTaxonomyFormSubmission } from './utils/interceptTaxonomyFormSubmission';
import { useStandardAPI } from 'shared';

const fieldGroups = [
    {
        name: 'fg1',
        fields: [
            {
                name: 'test_field_1',
                type: 'text',
                placeholder: 'Test field 1...',
                default_value: 'Ten 10',
                required: true,
            },
            {
                name: 'test_field_2',
                type: 'text',
                placeholder: 'Test field 2...',
                default_value: 'Seven 7',
            },
            {
                name: 'test_field_3',
                type: 'text',
                placeholder: 'Test field 3...',
                default_value: 'Seven 33333',
            }
        ],
        repeat: false,
    }
]

const FormRender = ( { formArgument } ) => {

    const [form, setForm] = useState(null);
    const API = useStandardAPI('form');

    useEffect( () => {
       
        async function fetchData( formArgument, API ) {  
            const data = await API.getOne(formArgument);
            setForm(data.record);
        }
        fetchData( formArgument, API );

    }, [])

    const { 
        FormManagerProvider, 
        Form, 
        Fields, 
        SubmitButton, 
        FormComplete 
    } = useFormManager();

    const validateFormData = () => {
        return false;
    };

    

    // interceptTaxonomyFormSubmission(validateFormData);

    if( ! form ) {
        return(
            <main>
                Form loading...
            </main>
        ) 
    }

    const formData = {
        form,
        record: {},
        api: API,
    }
    formData.form.field_groups = fieldGroups;

    console.log(form)
    console.log(formData)

    

    return(
        <FormManagerProvider formData={formData}>
            <Form>
                <span>formArg: {formArgument}</span>
                <span>form.id: {form.id}</span>
                <Fields />
                <SubmitButton />
            </Form>
            <FormComplete />
        </FormManagerProvider>
    );

};

document.querySelectorAll('.f3-form').forEach(element => {
    const formArgument = element.getAttribute('data-form');
    createRoot(element).render(<FormRender formArgument={formArgument} />);
});