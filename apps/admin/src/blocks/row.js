const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType('f3/row', {
    title: __('F3 Row', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {},
    edit: ({ attributes, setAttributes }) => {

        const blockProps = useBlockProps();

        return(

            <main>
                <div {...blockProps}>
                    <InnerBlocks />
                </div>
            </main>

        );
        
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();

        return(
            <div {...blockProps}>
                <div style={{ display: 'block' }}>
                    <InnerBlocks.Content />
                </div>
            </div>
        );
        
    },
});
