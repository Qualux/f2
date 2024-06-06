const { registerBlockType, registerBlockVariation } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, SelectControl } = wp.components;
const { __ } = wp.i18n;

// Register the base block
registerBlockType('f3/field', {
    title: __('F3 Field', 'f3'),
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
                <input type="text" placeholder={name} />
            </main>
        );
    },
    save: ({ attributes }) => {
        return null;
    },
});

// Register the select field variation
registerBlockVariation(
    'f3/field', 
    {
        name: 'select-field', // Machine-readable identifier without spaces or special characters
        title: __('Select Field', 'f3'), // Display name for the block variation
        attributes: {
            fieldType: 'select'
        },
        isActive: ['fieldType']
    }
);
