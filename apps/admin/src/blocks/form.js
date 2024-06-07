const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;
const { __ } = wp.i18n;
const { useSelect } = wp.data;

registerBlockType('f3/form', {
    title: __('F3 Form', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {
        formType: {
            type: 'string',
            default: 'webform',
        },
        childBlocksData: {
            type: 'array',
            default: [],
        },
        adminLocation: {
            type: 'string',
            default: false,
        },
    },
    edit: ({ clientId, attributes, setAttributes }) => {

        const blockProps = useBlockProps();

        const locationSelectField = {
            type: "select",
            name: "admin_location",
            title: "Admin Location Type",
            label: "Admin Location Type",
            choices: [
                { value: "", label: "Choose Location Type" },
                { value: "post_type", label: "Post Type" },
                { value: "taxonomy", label: "Taxonomy" },
                { value: "user", label: "User Form" },
                { value: "options_page", label: "Options Page" }
            ]        
        }

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
                
                <InspectorControls>
                    <PanelBody title={__('Form Settings', 'f3')} initialOpen={true}>
                        <SelectControl
                            label={__('Select Form Type', 'f3')}
                            value={attributes.formType}
                            options={[
                                { label: __('Webform', 'f3'), value: 'webform' },
                                { label: __('Data Form', 'f3'), value: 'dataform' },
                            ]}
                            onChange={(newFormType) => setAttributes({ formType: newFormType })}
                        />
                        <SelectControl
                            label={locationSelectField.label}
                            value={attributes.adminLocation}
                            options={locationSelectField.choices}
                            onChange={(newLocation) => setAttributes({ adminLocation: newLocation })}
                        />
                    </PanelBody>
                </InspectorControls>

                <InnerBlocks 
                    template={
                        [
                            [
                                'f3/field-group'
                            ],
                            [
                                'f3/submit-button'
                            ],
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
