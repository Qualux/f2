export function useFieldType() {

    const fieldTypeList = [
        {
            name: 'text',
            label: 'Text',
        },
        {
            name: 'select',
            label: 'Select',
        },
        {
            name: 'number',
            label: 'Number',
        },
        {
            name: 'email',
            label: 'Email',
        },
        {
            name: 'url',
            label: 'URL',
        }
        ,
        {
            name: 'collection',
            label: 'Collection',
        }
    ];

    return { fieldTypeList };

}