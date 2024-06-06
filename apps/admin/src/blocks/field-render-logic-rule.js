const { registerBlockType } = wp.blocks;
const { PanelBody, TextControl, SelectControl } = wp.components;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;

registerBlockType('f3/field-render-logic-rule', {
    title: __('Field Render Logic Rule', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {
        text: {
            type: 'string',
            default: '',
        },
        operator: {
            type: 'string',
            default: 'equals',
        },
        value: {
            type: 'string',
            default: '',
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const { text, operator, value } = attributes;

        const onChangeTextInput = (newText) => {
            setAttributes({ text: newText });
        };

        const onChangeOperatorSelect = (newOperator) => {
            setAttributes({ operator: newOperator });
        };

        const onChangeValueInput = (newValue) => {
            setAttributes({ value: newValue });
        };

        return (
            <div className="field-render-logic-group" style={{ display: 'flex', gap: '8px'}}>
                <TextControl
                    label={__('Text', 'f3')}
                    value={text}
                    onChange={onChangeTextInput}
                />
                <SelectControl
                    label={__('Operator', 'f3')}
                    value={operator}
                    options={[
                        { label: __('Equals', 'f3'), value: 'equals' },
                        { label: __('Greater Than', 'f3'), value: 'greater_than' },
                        { label: __('Less Than', 'f3'), value: 'less_than' },
                    ]}
                    onChange={onChangeOperatorSelect}
                />
                <TextControl
                    label={__('Value', 'f3')}
                    value={value}
                    onChange={onChangeValueInput}
                />
            </div>
        );
    },
    save: ({ attributes }) => {
        return null;
    },
});
