const { registerBlockType, registerBlockVariation } = wp.blocks;
const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
const { PanelBody, TextControl, ToggleControl, SelectControl } = wp.components;
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
        conditionField: {
            type: 'string',
            default: '',
        },
        conditionOperator: {
            type: 'string',
            default: 'equals',
        },
        conditionValue: {
            type: 'string',
            default: '',
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
        ];

        const ALLOWED_BLOCKS = ['f3/label', 'f3/text-field', 'f3/select-field'];

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
                        <TextControl
                            label={__('Field', 'f3')}
                            value={attributes.conditionField}
                            onChange={(newValue) => setAttributes({ conditionField: newValue })}
                        />
                        <SelectControl
                            label={__('Operator', 'f3')}
                            value={attributes.conditionOperator}
                            options={[
                                { label: __('Equals', 'f3'), value: 'equals' },
                                { label: __('Greater Than', 'f3'), value: 'greater_than' },
                                { label: __('Less Than', 'f3'), value: 'less_than' },
                            ]}
                            conditionOperator
                        />
                        <TextControl
                            label={__('Value', 'f3')}
                            value={attributes.conditionValue}
                            onChange={(newValue) => setAttributes({ conditionValue: newValue })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <InnerBlocks
                        template={BLOCK_TEMPLATE}
                        allowedBlocks={ALLOWED_BLOCKS}
                        templateLock={false}
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
