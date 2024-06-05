const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody } = wp.components;
const { __ } = wp.i18n;
const { RichText } = wp.editor; // Import RichText component

registerBlockType('f3/instructions', {
    title: __('F3 Instructions', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {
        text: {
            type: 'string',
            source: 'html',
            selector: 'div',
            default: '',
        },
    },
    edit: ({ attributes, setAttributes }) => {

        const { text } = attributes;

        const onChangeText = (newText) => {
            setAttributes({ text: newText });
        };

        return(
            <div>
                <RichText
                    label={__('Text', 'f3')}
                    value={text}
                    onChange={onChangeText}
                />
                <InspectorControls>
                    <PanelBody title={__('Instruction Settings', 'f3')} initialOpen={true}>
                        {/* Additional settings can go here */}
                    </PanelBody>
                </InspectorControls>
            </div>
        );
        
    },
    save: ({ attributes }) => {
        return null;
    },
});
