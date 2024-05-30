const { createRoot, useEffect, useState } = wp.element;
import './main.css';
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
                type: 'url',
                placeholder: 'https://google.com',
                required: true,
            },
            {
                name: 'test_field_3',
                type: 'checkbox',
                default_value: 'c',
                choices: [
                    {
                        value: 'a',
                        label: 'A'
                    },
                    {
                        value: 'b',
                        label: 'B'
                    },
                    {
                        value: 'c',
                        label: 'C'
                    }
                ]
            },
            {
                name: 'test_field_4',
                type: 'collection',
                default_value: [
                    {
                        value: 123,
                        label: 'Value 1'
                    },
                    {
                        value: 234,
                        label: 'Value 2'
                    }
                ]
            },
            {
                name: 'test_field_5',
                type: 'email',
                placeholder: 'Work email address...'
            },
            {
                name: 'test_field_6',
                type: 'range',
            },
            {
                name: 'test_field_7',
                type: 'true_false',
            },
            {
                name: 'test_field_8',
                type: 'textarea',
            },
            {
                name: 'test_field_9',
                type: 'number',
                placeholder: 10,
            },
            {
                name: 'test_field_10',
                type: 'file',
            },
            {
                name: 'test_field_11',
                type: 'image',
            },
            {
                name: 'test_field_12',
                type: 'post_type_select',
            },
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
        record: false,
        //record: {
            // test_field_3: [],
        //},
        API: API,
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