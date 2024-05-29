export function makeDefaultFieldValues(fieldGroups) {

    const defaultValues = {};

    fieldGroups.forEach(fieldGroup => {
        fieldGroup.fields.forEach(field => {

            console.log('Making default values for field: ' + field.name)

            const key = field.name;
            const value = field.default_value !== undefined ? field.default_value : null;

            console.log('Default value is: ' + value)

            defaultValues[key] = value;

        });
    });

    return defaultValues;

}
