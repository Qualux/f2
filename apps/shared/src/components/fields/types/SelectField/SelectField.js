import Label from '../../Label';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';

function ChoicesList({field}) {

    if( !field.choices ) {
        return(
            <option value="0">No choices</option>
        );
    }

    return(
        <>
            {field.choices.map((choice, index) => (
                <option key={index} value={choice.value}>
                    {choice.label}
                </option>
            ))}
        </>
    )
}

export default function SelectField( { field, fieldRegisterPrefix } ) {

    const { makeValidationObject, useFormContext } = useFormManager();
    const { register, getFieldState } = useFormContext();
    const validators = makeValidationObject(field);
    const fieldState = getFieldState( field.name );

    const registerName = fieldRegisterPrefix ? `${fieldRegisterPrefix}.${field.name}` : field.name;

    return(
        <div className="my-4">
            <Label text={field.label} />
            <select
                className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                {...register(registerName, validators)}
            >
                <ChoicesList field={field} />
            </select>
            {fieldState.invalid && <span className="text-rose-700 text-sm font-bold">Field has errors</span>}
        </div>
    );

}