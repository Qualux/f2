export function useSystemFieldGroups() {

    const systemFieldGroups = {
        field: {
            title: 'Field Editor',
            fields: [
                {
                    type: 'text',
                    name: 'field_name',
                    title: 'Field Name',
                    label: 'Field Name',
                    storage: 'post_meta',
                    placeholder: 'Unique lowercase system name...',
                }
            ]
        },
        fieldGroup: {
            title: 'Field Group Editor',
            fields: [
                {
                    type: 'text',
                    name: 'field_group_name',
                    title: 'Field Group Name',
                    label: 'Field Group Name',
                    storage: 'post_meta',
                    placeholder: 'Unique lowercase system name...',
                }
            ]
        }
    };

    return { systemFieldGroups };

}