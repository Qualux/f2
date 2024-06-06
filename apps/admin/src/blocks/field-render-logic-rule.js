const { registerBlockType } = wp.blocks;
const { PanelBody, TextControl, SelectControl } = wp.components;
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;

registerBlockType('f3/field-render-logic-rule', {
    title: __('Field Render Logic Rule', 'f3'),
    icon: 'edit',
    category: 'common',
    attributes: {
        field: {
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
        const { field, operator, value } = attributes;

        const onChangeFieldInput = (newField) => {
            setAttributes({ field: newField });
        };

        const onChangeOperatorSelect = (newOperator) => {
            setAttributes({ operator: newOperator });
        };

        const onChangeValueInput = (newValue) => {
            setAttributes({ value: newValue });
        };

        return (
            <div className="field-render-logic-group flex justify-center my-4 bg-neutral-100 rounded" style={{ display: 'flex', gap: '8px'}}>
                <TextControl
                    label={__('Field', 'f3')}
                    value={field}
                    onChange={onChangeFieldInput}
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
