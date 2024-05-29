import Label from '../../Label';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';

export default function TextField( { field, fieldRegisterPrefix } ) {

    const { makeValidationObject, useFormContext, useFieldRenderContext } = useFormManager();
    const { register, getFieldState } = useFormContext();
    const validators = makeValidationObject(field);
    const fieldState = getFieldState( field.name );
    const fieldRenderData = useFieldRenderContext();
    const registerName = fieldRenderData.registerPrefix ? `${fieldRenderData.registerPrefix}.${field.name}` : field.name;

    return(
        <div className="my-4">
            <Label text={field.label} />
            <input 
                className="block w-full bg-neutral-100 rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                type="text"
                placeholder={field.placeholder}
                {...register(registerName, validators)}
            />
            {fieldState.invalid && <span className="text-rose-700 text-sm font-bold">Field has errors</span>}
        </div>
    );

}