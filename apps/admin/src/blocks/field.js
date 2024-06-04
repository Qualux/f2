const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType('f3/field', {
    title: __('F3 Field', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {
        name: {
            type: 'string',
        },
    },
    edit: ({ attributes, setAttributes }) => {

        const { name } = attributes;

        const onChangeName = (newName) => {
            setAttributes({ name: newName });
        };

        return(

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
