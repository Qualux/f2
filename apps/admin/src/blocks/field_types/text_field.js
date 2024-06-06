const { registerBlockType, registerBlockVariation } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, SelectControl } = wp.components;
const { __ } = wp.i18n;

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
