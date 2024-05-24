import useSystemFields from './useSystemFields';

export function useSystemFieldGroups() {

    const { systemFields } = useSystemFields();

    const systemFieldGroups = {
        field: {
            title: 'Field Editor',
            fields: [
                systemFields.field_type,
                systemFields.field_title,
                systemFields.field_name,
                systemFields.field_storage,
            ],
            storage: {
                type: 'post_meta',
                post_type: 'field'
            }
        },
        fieldGroup: {
            title: 'Field Group Editor',
            fields: [
                systemFields.field_group_title,
            ],
            storage: {
                type: 'post_meta',
                post_type: 'field-group'
            }
        }
    };

    return { systemFieldGroups };

}