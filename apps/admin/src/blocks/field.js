const { registerBlockType, registerBlockVariation } = wp.blocks;
const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
const { PanelBody, TextControl, SelectControl } = wp.components;
const { __ } = wp.i18n;

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
    edit: ({attributes, setAttributes}) => {

        let fieldTypeBlock = 'text';
        switch(attributes.fieldType) {
            case 'text':
                fieldTypeBlock = 'f3/text-field'
                break;
            case 'select':
                fieldTypeBlock = 'f3/select-field'
                break;
        }

        const BLOCK_TEMPLATE = [
            [
                'f3/label'
            ],
            [
                fieldTypeBlock
            ]
        ]

        const blockProps = useBlockProps();

        const { name } = attributes;

        const onChangeName = (newName) => {
            setAttributes({ name: newName });
        };

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
                    />
                </div>
            </main>
        );
    },
    save: ({ attributes }) => {

        const blockProps = useBlockProps.save();

        return(

            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>

        )
        

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
