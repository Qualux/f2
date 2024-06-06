const { registerBlockType, registerBlockVariation } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, SelectControl } = wp.components;
const { __ } = wp.i18n;
import { useFieldRender, useFormManager } from 'shared';

// Register the base block
registerBlockType('f3/text-field', {
    title: __('Text Field', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {
        fieldType: {
            type: 'string',
            default: 'text',
        },
        name: {
            type: 'string',
        },
    },
    edit: ({attributes, setAttributes}) => {

        const {FieldRender} = useFieldRender();

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

        const { 
            FormManagerProvider, 
        } = useFormManager();

        function formSubmitHandler(data) {
            console.log('submitted form: ', data)
        }

        const { name } = attributes;

        const onChangeName = (newName) => {
            setAttributes({ name: newName });
        };

        return (
            <main>
                <InspectorControls>
                    <PanelBody title={__('Field Settings', 'f3')} initialOpen={true}>
                        <TextControl
                            label={__('Name', 'f3')}
                            value={name}
                            onChange={onChangeName}
                        />
                    </PanelBody>
                </InspectorControls>
                <FormManagerProvider 
                    formData={formData}
                    formSubmitHandler={formSubmitHandler}
                >
                    <FieldRender 
                        field={
                            {
                                type: 'text',
                                name: 't1',
                            }                    
                        }
                    />
                </FormManagerProvider>
            </main>
        );
    },
    save: ({ attributes }) => {
        return null;
    },
});
