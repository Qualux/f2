export function checkConditions(field, watch) {

    if (!Object.hasOwn(field, 'field_conditions') || field.field_conditions !== true) {
        return true;
    }

    let conditionsCheckPassed = false;

    if (Object.hasOwn(field, 'field_condition_rules') && field.field_condition_rules instanceof Array) {
        
        field.field_condition_rules.forEach((crg) => {
            
            const cr = crg[0];
            const testFieldValue = watch(cr.field);

            if (cr.operator === '=') {
                if (testFieldValue == cr.value) {
                    conditionsCheckPassed = true;
                } else {
                    console.log('conditions check failed');
                }
            }

        });

    }

    return conditionsCheckPassed;

}
