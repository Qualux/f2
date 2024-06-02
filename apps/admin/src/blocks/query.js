const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks } = wp.blockEditor;
const ServerSideRender = wp.serverSideRender;
const { PanelBody, TextControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType('f3/query', {
    title: __('F3 Query Provider', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {
        queryPostId: {
            type: 'string',
            default: '',
        },
    },
    edit: ({ attributes, setAttributes }) => {

        const { queryPostId } = attributes;

        const onChangeQueryPostId = (newQueryPostId) => {
            setAttributes({ queryPostId: newQueryPostId });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Query Settings', 'f3')} initialOpen={true}>
                        <TextControl
                            label={__('Query Post ID', 'f3')}
                            value={queryPostId}
                            onChange={onChangeQueryPostId}
                        />
                    </PanelBody>
                </InspectorControls>
                <div>
                    <InnerBlocks />
                </div>
                <ServerSideRender
                    block="f3/query"
                    attributes={attributes}
                />
            </>
        );
    },
    save: () => {
        return <InnerBlocks.Content />;
    },
});
