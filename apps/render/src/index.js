const { createRoot, render, useEffect, useState } = wp.element;
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



/* 
 * Block Template Render Experiment 
 *
 */

function Field({ attributes }) {

    return(
        <input type="text" placeholder={attributes.name} />
    );

}

function Label({ attributes }) {

    return(
        <label>{attributes.text}</label>
    );

}

function TemplateApp({ childBlocks }) {
    return (
        <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 600 }}>
                Attribute List
            </h2>
            <ul>
                {childBlocks.map((block, index) => (
                    <li key={index}>
                        <strong>{block.name}</strong>
                        <ul>
                            {Object.entries(block.attributes).map(([attrName, attrValue]) => (
                                <li key={attrName}>{`${attrName}: ${attrValue}`}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            {childBlocks.map((block, index) => {
                switch (block.name) {
                    case 'f3/field':
                        return <Field key={index} attributes={block.attributes} />;
                    case 'f3/label':
                        return <Label key={index} attributes={block.attributes} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
}


const templateRenderEl = document.getElementById('f3-field-template');
if (templateRenderEl) {
    const childBlocksData = JSON.parse(templateRenderEl.getAttribute('data-child-blocks'));
    render(<TemplateApp childBlocks={childBlocksData} />, templateRenderEl);
}
