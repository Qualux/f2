import Label from '../../Label';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';

export default function TextAreaField( {field} ) {

    const { makeValidationObject, useFormContext, useFieldRenderContext } = useFormManager();
    const { register, getFieldState } = useFormContext();
    const validators = makeValidationObject(field);
    const fieldState = getFieldState( field.name );
    const fieldRenderData = useFieldRenderContext();
    const registerName = fieldRenderData.registerPrefix ? `${fieldRenderData.registerPrefix}.${field.name}` : field.name;

    return(
        <div className="my-4">
            <Label text={field.label} />
            <textarea
                className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                placeholder={field.placeholder}
                {...register(registerName, validators)} 
            />
            {fieldState.invalid && <span className="text-rose-700 text-sm font-bold">{fieldState.error?.message || 'Field has errors'}</span>}
        </div>
    );

}