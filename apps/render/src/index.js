const { createRoot, useEffect, useState } = wp.element;
import './main.css';
import { useFormManager } from 'shared';
import { interceptTaxonomyFormSubmission } from './utils/interceptTaxonomyFormSubmission';
import { useStandardAPI, useSaveAPI } from 'shared';

const fieldGroups = [
    {
        name: 'fg1',
        fields: [
            {
                name: 'test_field_1',
                type: 'text',
                placeholder: 'Test field 1...',
                required: true,
            },
        ],
        repeat: false,
    }
]

const FormRender = ( { formArgument, locationArgument } ) => {

    const [form, setForm] = useState(null);
    const standardAPI = useStandardAPI('form');
    const saveAPI = useSaveAPI();

    useEffect( () => {
       
        async function fetchData( formArgument, API ) {  
            const data = await standardAPI.getOne(formArgument);
            setForm(data.record);
        }
        fetchData( formArgument, standardAPI );

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
        saveAPI,
    }
    
    // Override field groups for testing.
    //formData.form.field_groups = fieldGroups;

    console.log(form)
    console.log(formData)

    const formSubmitHandler = (data) => {

        console.log('locationArgument:', locationArgument)

        if(locationArgument === 'post') {

        }

        console.log('Render formSubmitHandler.', data)
        saveAPI.save( locationArgument, null, formData.form, data );

    }

    return(
        <FormManagerProvider 
            formData={formData}
            formSubmitHandler={formSubmitHandler}
        >
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
    const formArgument     = element.getAttribute('data-form');
    const locationArgument = element.getAttribute('data-location');
    createRoot(element).render(<FormRender formArgument={formArgument} locationArgument={locationArgument} />);
});