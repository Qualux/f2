const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType('f3/field-render-logic-group', {
    title: __('Field Render Logic Group', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {},
    edit: ({ attributes, setAttributes }) => {

        const BLOCK_TEMPLATE = [
            [
                'f3/field-render-logic-rule'
            ],
        ];

        return(
            <div className="bg-neutral-100 p-6">
                <InnerBlocks
                    template={BLOCK_TEMPLATE}
                />
            </div>
        );
    },
    save: ({ attributes }) => {
        return <InnerBlocks.Content />;
    },
});