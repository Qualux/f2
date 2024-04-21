export function useFieldType() {

    const fieldTypeList = [
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
        {
            value: 'email',
            label: 'Email',
        },
        {
            value: 'url',
            label: 'URL',
        },
        {
            value: 'collection',
            label: 'Collection',
        },
    ];

    return { fieldTypeList };

}