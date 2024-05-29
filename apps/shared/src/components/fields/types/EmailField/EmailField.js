import Label from '../../Label';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';

export default function EmailField( { field } ) {

    const { makeValidationObject, useFormContext, useFieldRenderContext } = useFormManager();
    const { register, getFieldState } = useFormContext();
    const fieldState = getFieldState( field.name );
    const fieldRenderData = useFieldRenderContext();
    const registerName = fieldRenderData.registerPrefix ? `${fieldRenderData.registerPrefix}.${field.name}` : field.name;

    let validators = makeValidationObject(field);
    validators.pattern = {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Invalid email address',
    };

    return(
        <div className="my-4">
            <Label text={field.label} />
            <input 
                className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                type="email"
                placeholder={field.placeholder}
                {...register(registerName, validators)} 
            />
            {fieldState.invalid && <span className="text-rose-700 text-sm font-bold">{fieldState.error?.message || 'Field has errors'}</span>}
        </div>
    );

}