import { useFieldType } from './useFieldType';

export function useSystemFields() {

    const { fieldTypeList } = useFieldType();

    const systemFields = {
        field_type: {
            field_type: 'select',
            field_name: 'field_type',
            field_title: 'Field Type',
            field_label: 'Field Type',
            field_storage: 'post_meta',
            field_choices: fieldTypeList,
        },
        field_title: {
            field_type: 'text',
            field_name: 'field_title',
            field_title: 'Field Title',
            field_label: 'Field Title',
            field_storage: 'post_meta',
            field_placeholder: 'Enter title for display...',
        },
        field_label: {
            field_type: 'text',
            field_name: 'field_label',
            field_title: 'Field Label',
            field_label: 'Field Label',
            field_storage: 'post_meta',
            field_placeholder: 'Enter label for display, leave blank to turn off label rendering...',
        },
        field_name: {
            field_type: 'text',
            field_name: 'field_name',
            field_title: 'Field Name',
            field_label: 'Field Name',
            field_storage: 'post_meta',
            field_placeholder: 'Unique lowercase system name...',
        },
        field_placeholder: {
            field_type: 'text',
            field_name: 'field_placeholder',
            field_title: 'Field Placeholder',
            field_label: 'Field Placeholder',
            field_placeholder: 'Enter placeholder text...',
            field_storage: 'post_meta',
        },
        field_choices: {
            field_type: 'collection',
            field_name: 'field_choices',
            field_title: 'Field Choices',
            field_label: 'Field Choices',
            field_storage: 'post_meta',
        },
        field_group_title: {
            field_type: 'text',
            field_name: 'field_group_title',
            field_title: 'Field Group Title',
            field_label: 'Field Group Title',
            field_storage: 'post_meta',
            field_placeholder: 'Enter title for display...',
        },
        field_group_fields: {
            field_type: 'post_collection',
            field_name: 'field_group_fields',
            field_title: 'Fields',
            field_label: 'Fields',
            field_storage: 'post_meta',
        },
        field_group_post_type: {
            field_type: 'text',
            field_name: 'field_group_post_type',
            field_title: 'Post Type',
            field_label: 'Post Type',
            field_storage: 'post_meta',
            field_placeholder: 'Enter post type to assign field group...',
        },
    };

    return { systemFields };

}