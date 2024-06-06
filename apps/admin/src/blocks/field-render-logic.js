const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType('f3/field-render-logic', {
    title: __('Field Render Logic', 'f3'),
    icon: 'edit',
    category: 'common',
    parent: 'f3/field',
    supports: {
        lock: true, // Locks the block, preventing any changes or removal
        multiple: false, // Disallows block duplication
    },
    templateLock: 'all',
    transforms: false,
    attributes: {
    },
    lock: true,
    edit: ({ attributes, setAttributes }) => {

        const BLOCK_TEMPLATE = [
            [
                'f3/field-render-logic-group'
            ],
        ];

        return(
            <InnerBlocks
                template={BLOCK_TEMPLATE}
            />
        );
    },
    save: ({ attributes }) => {
        return <InnerBlocks.Content />;
    },
});