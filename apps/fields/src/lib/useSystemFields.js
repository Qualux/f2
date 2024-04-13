export function useSystemFields() {

    const systemFields = {
        field_type: {
            type: 'select',
            name: 'field_type',
            title: 'Field Type',
            label: 'Field Type',
            storage: 'post_meta',
            choices: [
                {
                    value: 'text',
                    label: 'Text',
                },
                {
                    value: 'select',
                    label: 'Select',
                },
                {
                    value: 'number',
                    label: 'Number',
                },
            ]
        },
        field_title: {
            type: 'text',
            name: 'field_title',
            title: 'Field Title',
            label: 'Field Title',
            storage: 'post_meta',
            placeholder: 'Enter title for display...',
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
            choices: [
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
    };

    return { systemFields };

}