import Label from '../../Label';

function ChoicesList({field, register}) {

    if( !field.choices ) {
        return(
            <option value="0">No choices</option>
        );
    }

    return(
        <>
            {field.choices.map((choice, index) => (
                <label>
                    <input type="checkbox" {...register(field.name)} value={choice.value} />
                    {choice.label}
                </label>
            ))}
        </>
    )
}

export default function RadioGroupField( {field, register, errors} ) {

    return(
        <div className="my-4">
            <Label text={field.label} />
            <div>
                <ChoicesList field={field} register={register} />
            </div>
            {errors[field.name] && <span className="text-rose-700 text-sm font-bold">Field title is required</span>}
        </div>
    );

}