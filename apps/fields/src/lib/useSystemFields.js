import { useFieldType } from './useFieldType';

export function useSystemFields() {

    const { fieldTypeList } = useFieldType();

    const systemFields = {
        field_type: {
            type: 'select',
            name: 'field_type',
            title: 'Field Type',
            label: 'Field Type',
            storage: 'post_meta',
            field_choices: fieldTypeList,
        },
        field_title: {
            type: 'text',
            name: 'field_title',
            title: 'Field Title',
            label: 'Field Title',
            storage: 'post_meta',
            placeholder: 'Enter title for display...',
        },
        field_label: {
            type: 'text',
            name: 'field_label',
            title: 'Field Label',
            label: 'Field Label',
            storage: 'post_meta',
            placeholder: 'Enter label for display, leave blank to turn off label rendering...',
        },
        field_name: {
            type: 'text',
            name: 'field_name',
            title: 'Field Name',
            label: 'Field Name',
            storage: 'post_meta',
            placeholder: 'Unique lowercase system name...',
        },
        field_storage: {
            type: 'select',
            name: 'field_storage',
            title: 'Field Storage',
            label: 'Field Storage',
            storage: 'post_meta',
            field_choices: [
                {
                    value: 'post_meta',
                    label: 'Post Meta',
                },
                {
                    value: 'option',
                    label: 'Options',
                },
            ]
        },
        field_placeholder: {
            type: 'text',
            name: 'field_placeholder',
            title: 'Field Placeholder',
            label: 'Field Placeholder',
            placeholder: 'Enter placeholder text...',
            storage: 'post_meta',
        },
        field_choices: {
            type: 'collection',
            name: 'field_choices',
            title: 'Field Choices',
            label: 'Field Choices',
            storage: 'post_meta',
        },
        field_group_title: {
            type: 'text',
            name: 'field_group_title',
            title: 'Field Group Title',
            label: 'Field Group Title',
            storage: 'post_meta',
            placeholder: 'Enter title for display...',
        },
        field_group_post_type: {
            type: 'text',
            name: 'field_group_post_type',
            title: 'Post Type',
            label: 'Post Type',
            storage: 'post_meta',
            placeholder: 'Enter post type to assign field group...',
        },
    };

    return { systemFields };

}