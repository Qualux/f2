import { useFormManager } from '../../lib/useFormManager/useFormManager';

export function useFieldRender() {

    function FieldRender( { field, fieldRegisterPrefix = '' } ) {

        const { useFormContext, checkConditions, Field } = useFormManager();
        const { watch, register, errors, setValue, control } = useFormContext();
        const conditionsCheckPassed = checkConditions(field, watch);
    
        if (!conditionsCheckPassed) {
            return null;
        }
    
        return (
            <div className="my-6">
                <Field
                    field={field}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    control={control}
                    fieldRegisterPrefix={fieldRegisterPrefix}
                />
            </div>
        );

    }

    return{
        FieldRender,
    }

}