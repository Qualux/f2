const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType('f3/submit-button', {
    title: __('F3 Submit Button', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {
        text: {
            type: 'string',
            default: 'Save',
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
                <div class="f3-submit-button">
                    <button>
                        SAVE
                    </button>
                </div>
            </main>

        );
        
    },
    save: ({ attributes }) => {
        return null;
    },
});
