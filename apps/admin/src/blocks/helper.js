const { registerBlockType } = wp.blocks;
const { InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody } = wp.components;
const { __ } = wp.i18n;
const { RichText } = wp.editor; // Import RichText component

registerBlockType('f3/helper', {
    title: __('F3 Helper', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {
        text: {
            type: 'string',
            source: 'html',
            selector: 'h2',
            default: '',
        },
    },
    edit: ({ attributes, setAttributes }) => {

        const blockProps = useBlockProps();

        return(
            <div>
                <RichText
                    { ...blockProps }
                    tagName="h2"
                    label={__('Text', 'f3')}
                    value={attributes.text}
                    onChange={ ( text ) => setAttributes( { text } ) }
                    placeholder="Add helper text for this field..."
                />
                <InspectorControls>
                    <PanelBody title={__('Instruction Settings', 'f3')} initialOpen={true}>
                        {/* Additional settings can go here */}
                    </PanelBody>
                </InspectorControls>
            </div>
        );
        
    },
    save( { attributes } ) {

        const blockProps = useBlockProps.save();
        return <RichText.Content { ...blockProps } tagName="h2" value={ attributes.text } />;

    }
});
