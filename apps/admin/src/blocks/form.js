const { registerBlockType } = wp.blocks;
const { InnerBlocks, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;
const { useSelect } = wp.data;

registerBlockType('f3/form', {
    title: __('F3 Form', 'f3'),
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

        const buildAttributes = (blocks) => {

            return blocks.map((block) => {

                const childBlocks = block.innerBlocks.length > 0 ? buildAttributes(block.innerBlocks) : [];

                return {
                    name: block.name,
                    attributes: block.attributes,
                    childBlocks: childBlocks,
                };
            });
            
        };

        const childBlocks = useSelect((select) => {

            const { getBlockOrder, getBlock } = select('core/block-editor');
            const children = getBlockOrder(clientId).map((innerClientId) => {
                const block = getBlock(innerClientId);
                return { name: block.name, attributes: block.attributes, innerBlocks: block.innerBlocks };
            });

            return buildAttributes(children);
            
        }, [clientId]);

        // Prevent unnecessary updates
        if (JSON.stringify(childBlocks) !== JSON.stringify(attributes.childBlocksData)) {
            setAttributes({ 
                childBlocksData: childBlocks,
            });
        }

        return (
            <div {...blockProps}>
                <InnerBlocks 
                    template={
                        [
                            [
                                'f3/field-group'
                            ],
                            [
                                'f3/submit-button'
                            ]
                            
                        ]
                    }
                />
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
