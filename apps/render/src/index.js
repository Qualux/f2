const { createRoot, render, useEffect, useState } = wp.element;
import './main.css';
import { useFormManager } from 'shared';
import { interceptTaxonomyFormSubmission } from './utils/interceptTaxonomyFormSubmission';
import { useStandardAPI, useSaveAPI, useFieldRender } from 'shared';

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

function Field({ attributes, childBlocks }) {

    return(
        <div className="f3-field">
            {renderChildBlocks(childBlocks)}
        </div>
    );

}

function Label({ attributes }) {

    return(
        <label>{attributes.text}</label>
    );

}

function Instructions({ attributes }) {

    return(
        <div class="f3-field-instructions">{attributes.text}</div>
    );

}

function Prepend({ attributes }) {

    return(
        <div class="f3-field-prepend">{attributes.text}</div>
    );

}

function Helper({ attributes }) {

    return(
        <div class="f3-helper">{attributes.text}</div>
    );

}

function FieldGroup({ attributes, childBlocks }) {

    return(
        <div class="f3-field-group">
            {renderChildBlocks(childBlocks)}
        </div>
    );

}

function Row({ attributes, childBlocks }) {

    return(
        <div class="f3-row" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {renderChildBlocks(childBlocks)}
        </div>
    );

}

function CoreGroup({ attributes, childBlocks }) {

    return(
        <div class="f3-row" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {renderChildBlocks(childBlocks)}
        </div>
    );

}

function SubmitButton({ attributes }) {

    return(
        <div class="f3-submit-button">
            <button>
                SAVE
            </button>
        </div>
    );

}

function renderChildBlocks(childBlocks) {

    console.log('childBlocks in renderChildBlocks:', childBlocks)
    const {FieldRender} = useFieldRender();

    return childBlocks.map((block, index) => {
        switch (block.name) {
            case 'f3/field-group':
                return <FieldGroup key={index} attributes={block.attributes} childBlocks={block.childBlocks} />;
            case 'f3/field':
                return <Field key={index} attributes={block.attributes} childBlocks={block.childBlocks} />;
            case 'f3/label':
                return <Label key={index} attributes={block.attributes} />;
            case 'f3/instructions':
                return <Instructions key={index} attributes={block.attributes} />;
            case 'f3/row':
                return <Row key={index} attributes={block.attributes} childBlocks={block.childBlocks} />;
            case 'f3/prepend':
                return <Prepend key={index} attributes={block.attributes} />;
            case 'f3/helper':
                return <Helper key={index} attributes={block.attributes} />;
            case 'core/group':
                return <CoreGroup key={index} attributes={block.attributes} childBlocks={block.childBlocks} />;
            case 'f3/submit-button':
                return <SubmitButton key={index} attributes={block.attributes} />;
            case 'f3/select-field':
                return <FieldRender field={{ type: 'select', name: 's1', choices: [
                    {
                        value: 1,
                        label: 'One',
                    },
                    {
                        value: 2,
                        label: 'Two',
                    }
                ] }} />;
            case 'f3/text-field':
                return <FieldRender field={{ type: 'text', name: 't1' }} />;
            default:
                return null;
        }
    });
}

const AttributeList = ({ items }) => (
    <ul>
        {items.map((item, index) => (
            <li key={index}>
                <strong>{item.name}</strong>
                {item.attributes && Object.entries(item.attributes).length > 0 && (
                    <ul>
                        {Object.entries(item.attributes).map(([attrName, attrValue]) => (
                            <li key={attrName}>{`${attrName}: ${attrValue}`}</li>
                        ))}
                    </ul>
                )}
                {item.childBlocks && item.childBlocks.length > 0 && <AttributeList items={item.childBlocks} />}
            </li>
        ))}
    </ul>
);

function TemplateApp({ childBlocks }) {

    const saveAPI = useSaveAPI();

    const { 
        FormManagerProvider, 
    } = useFormManager();

    const formData = {
        form: {
            field_groups: [
                {
                    title: 'fg1',
                    fields: [
                        {
                            type: 'text',
                            name: 'field_1'
                        }
                    ]
                }
            ]
        },
        recordId: 0,
        API: {},
    }

    function formSubmitHandler(data) {
        console.log('submitted form: ', data)
    }

    return (
        <div>
            <FormManagerProvider 
                formData={formData}
                formSubmitHandler={formSubmitHandler}
            >
                {renderChildBlocks(childBlocks)}
            </FormManagerProvider>
            <AttributeList items={childBlocks} />
        </div>
    );
}




const templateRenderEl = document.getElementById('f3-field-template');
if (templateRenderEl) {
    const childBlocksData = JSON.parse(templateRenderEl.getAttribute('data-child-blocks'));
    render(<TemplateApp childBlocks={childBlocksData} />, templateRenderEl);
}
