const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType('f3/prepend', {
    title: __('F3 Field Prepend', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {
        text: {
            type: 'string',
        },
    },
    edit: ({ attributes, setAttributes }) => {

        const { text } = attributes;

        const onChangeText = (newText) => {
            setAttributes({ text: newText });
        };

        return(

            <main>
                <InspectorControls>
                    <PanelBody title={__('Prepend Settings', 'f3')} initialOpen={true}>
                        <TextControl
                            label={__('Text', 'f3')}
                            value={text}
                            onChange={onChangeText}
                        />
                    </PanelBody>
                </InspectorControls>
                <label>{text}</label>
            </main>

        );
        
    },
    save: ({ attributes }) => {
        return null;
    },
});
