const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType('f3/label', {
    title: __('F3 Label', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {
        text: {
            type: 'string',
            default: 'Label',
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
                    <PanelBody title={__('Label Settings', 'f3')} initialOpen={true}>
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
