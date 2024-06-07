const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
const { PanelBody, TextControl, ToggleControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType('f3/field-group', {
    title: __('F3 Field Group', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {
        name: {
            type: 'string',
        },
        repeat: {
            type: 'boolean',
            default: false,
        },
    },
    edit: ({ attributes, setAttributes }) => {

        const blockProps = useBlockProps();

        const { name } = attributes;

        const onChangeName = (newName) => {
            setAttributes({ name: newName });
        };

        return(

            <main>
                <InspectorControls>
                    <PanelBody title={__('Field Group Settings', 'f3')} initialOpen={true}>
                        <TextControl
                            label={__('Name', 'f3')}
                            value={name}
                            onChange={onChangeName}
                        />
                        <ToggleControl
                            label={__('Repeat', 'text-domain')}
                            checked={attributes.repeat}
                            onChange={(newValue) => setAttributes({ repeat: newValue })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <InnerBlocks
                        template={
                            [
                                [
                                    'f3/field'
                                ], 
                            ]
                        }
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
