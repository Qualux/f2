const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
//import ServerSideRender from '@wordpress/server-side-render';
const ServerSideRender = wp.serverSideRender;
const { PanelBody, SelectControl } = wp.components;
const { __ } = wp.i18n;

const availableFields = [
    { label: 'Test Field 1', value: 'test_field_1' },
    { label: 'Test Field 2', value: 'test_field_2' },
    { label: 'Test Field 3', value: 'test_field_3' },
];

registerBlockType('f3/dynamic-image-field', {
    title: __('Dynamic Image Field', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {
        selectedField: {
            type: 'string',
            default: availableFields[0].value,
        },
    },
    edit: ({ attributes, setAttributes }) => {

        const { selectedField } = attributes;

        const onChangeField = (newField) => {
            setAttributes({ selectedField: newField });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Field Settings', 'f3')} initialOpen={true}>
                        <SelectControl
                            label={__('Select Field', 'f3')}
                            value={selectedField}
                            options={availableFields}
                            onChange={onChangeField}
                        />
                    </PanelBody>
                </InspectorControls>
                <ServerSideRender
                    block="f3/dynamic-text-field"
                    attributes={attributes}
                />
            </>
        );
    },
    save: ({ attributes }) => {
        return null
    },
});
