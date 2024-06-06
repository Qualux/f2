const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType('f3/field-render-logic', {
    title: __('Field Render Logic', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {},
    edit: ({ attributes, setAttributes }) => {
        return(
            <InnerBlocks />
        );
    },
    save: ({ attributes }) => {
        return <InnerBlocks.Content />;
    },
});