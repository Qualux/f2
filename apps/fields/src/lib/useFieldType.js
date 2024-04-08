export function useFieldType() {

    const fieldTypeList = [
        {
            name: 'text',
            label: 'Text',
        },
        {
            name: 'select',
            label: 'Select',
        }
    ];

    return { fieldTypeList };

}