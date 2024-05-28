import Label from '../../Label';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';

export default function NumberField( {field, fieldRegisterPrefix} ) {

    const { makeValidationObject, useFormContext } = useFormManager();
    const { register, getFieldState } = useFormContext();
    const validators = makeValidationObject(field);
    const fieldState = getFieldState( field.name );

    const registerName = fieldRegisterPrefix ? `${fieldRegisterPrefix}.${field.name}` : field.name;

    return(
        <div className="my-4">
            <Label text={field.label} />
            <input 
                className="block w-full bg-neutral-100 rounded-md border-0 py-1.5 px-1 text-gray-900 placeholder:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
                type="text"
                placeholder={field.placeholder}
                {...register(registerName, validators)}
            />
            {fieldState.invalid && <span className="text-rose-700 text-sm font-bold">Field has errors</span>}
        </div>
    );

}