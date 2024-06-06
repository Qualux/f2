const { registerBlockType, registerBlockVariation } = wp.blocks;
const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
const { __ } = wp.i18n;
const { useEffect } = wp.element;

// Register the base block
registerBlockType('f3/field', {
    title: __('F3 Field', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {
        fieldType: {
            type: 'string',
            default: 'text',
        },
        name: {
            type: 'string',
        },
    },
    edit: ({ attributes, setAttributes, clientId }) => {
        let fieldTypeBlock = 'f3/text-field';
        if (attributes.fieldType === 'select') {
            fieldTypeBlock = 'f3/select-field';
        }

        const BLOCK_TEMPLATE = [
            ['f3/label'],
            [fieldTypeBlock],
            ['f3/field-render-logic'],
        ];

        const ALLOWED_BLOCKS = ['f3/label', 'f3/text-field', 'f3/select-field', 'f3/field-render-logic'];

        const blockProps = useBlockProps();
        const { name } = attributes;

        const onChangeName = (newName) => {
            setAttributes({ name: newName });
        };

        useEffect(() => {
            const { getBlocks, getBlockOrder } = wp.data.select('core/block-editor');
            const { insertBlock, removeBlock } = wp.data.dispatch('core/block-editor');

            const innerBlocks = getBlocks(clientId);
            const hasFieldRenderLogic = innerBlocks.some(block => block.name === 'f3/field-render-logic');

            if (!hasFieldRenderLogic) {
                const block = wp.blocks.createBlock('f3/field-render-logic');
                insertBlock(block, innerBlocks.length, clientId);
            }

            const logicBlocks = innerBlocks.filter(block => block.name === 'f3/field-render-logic');
            if (logicBlocks.length > 1) {
                logicBlocks.slice(1).forEach(block => {
                    removeBlock(block.clientId);
                });
            }
        }, [clientId]);

        return (
            <main>
                <InspectorControls>
                    <PanelBody title={__('Field Settings', 'f3')} initialOpen={true}>
                        <TextControl
                            label={__('Name', 'f3')}
                            value={name}
                            onChange={onChangeName}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <InnerBlocks
                        template={BLOCK_TEMPLATE}
                        allowedBlocks={ALLOWED_BLOCKS}
                        templateLock={false}
                        renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                    />
                </div>
            </main>
        );
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();
        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    },
});

// Register field type variations.
registerBlockVariation(
    'f3/field',
    {
        name: 'select-field', // Machine-readable identifier without spaces or special characters
        title: __('Select Field', 'f3'), // Display name for the block variation
        attributes: {
            fieldType: 'select'
        },
        isActive: ['fieldType']
    }
);

registerBlockVariation(
    'f3/field',
    {
        name: 'text-field', // Machine-readable identifier without spaces or special characters
        title: __('Text Field', 'f3'), // Display name for the block variation
        attributes: {
            fieldType: 'text'
        },
        isActive: ['fieldType']
    }
);
