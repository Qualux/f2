export function makeDefaultFieldValues(fieldGroups) {
    const defaultValues = {};

    fieldGroups.forEach(fieldGroup => {
        fieldGroup.fields.forEach(field => {
            const key = field.name;
            const value = field.field_default_value !== undefined ? field.field_default_value : null;
            defaultValues[key] = value;
        });
    });

    return defaultValues;
}
