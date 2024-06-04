const { registerBlockType } = wp.blocks;
const { InnerBlocks, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;
const { useSelect } = wp.data;

registerBlockType('f3/field-template', {
    title: __('F3 Field Template', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {
        childBlocksData: {
            type: 'array',
            default: [],
        },
    },
    edit: ({ clientId, attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        // Using useSelect to get child blocks during edit
        const childBlocks = useSelect((select) => {
            const { getBlockOrder, getBlock } = select('core/block-editor');
            const children = getBlockOrder(clientId).map((innerClientId) => {
                const block = getBlock(innerClientId);
                return { name: block.name, attributes: block.attributes };
            });

            return children;
        }, [clientId]);

        // Prevent unnecessary updates
        if (JSON.stringify(childBlocks) !== JSON.stringify(attributes.childBlocksData)) {
            setAttributes({ 
                childBlocksData: childBlocks,
            });
        }

        return (
            <div {...blockProps}>
                <InnerBlocks />
            </div>
        );
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();
        const { childBlocksData } = attributes;
        const childBlocksDataJSON = JSON.stringify(childBlocksData);

        return (
            <div {...blockProps}>
                <div style={{ display: 'block' }}>
                    <InnerBlocks.Content />
                </div>
                <div id="f3-field-template" data-child-blocks={childBlocksDataJSON}>
                    F3 Template Render DOM Element
                </div>
            </div>
        );
    },
});
