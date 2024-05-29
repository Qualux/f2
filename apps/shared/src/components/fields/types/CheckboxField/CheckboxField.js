import Label from '../../Label';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';

function ChoicesList( { field, register, registerName, validators } ) {

    if( ! field.choices ) {
        return(
            <option value="0">No choices</option>
        );
    }

    return(
        <>
            {field.choices.map((choice, index) => (
                <label
                    key={index}
                >
                    <input type="checkbox" 
                        value={choice.value}
                        {...register(registerName, validators)}  
                    />
                    {choice.label}
                </label>
            ))}
        </>
    )
}

export default function CheckboxField( { field } ) {

    const { makeValidationObject, useFormContext, useFieldRenderContext } = useFormManager();
    const { register, getFieldState } = useFormContext();
    const validators = makeValidationObject(field);
    const fieldState = getFieldState( field.name );
    const fieldRenderData = useFieldRenderContext();
    const registerName = fieldRenderData.registerPrefix ? `${fieldRenderData.registerPrefix}.${field.name}` : field.name;

    return(
        <div className="my-4">
            <Label text={field.label} />
            <div>
                <ChoicesList 
                    field={field} 
                    register={register} 
                    registerName={registerName}
                    validators={validators}
                />
            </div>
            {fieldState.invalid && <span className="text-rose-700 text-sm font-bold">Field has errors</span>}
        </div>
    );

}