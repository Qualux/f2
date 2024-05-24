import Label from '../../Label';

function ChoicesList({field, register}) {

    if( !field.field_choices ) {
        return(
            <option value="0">No choices</option>
        );
    }

    return(
        <>
            {field.field_choices.map((choice, index) => (
                <label>
                    <input type="checkbox" {...register(field.field_name)} value={choice.value} />
                    {choice.label}
                </label>
            ))}
        </>
    )
}

export default function SelectField( {field, register, errors} ) {

    return(
        <div className="my-4">
            <Label text={field.field_label} />
            <div>
                <ChoicesList field={field} register={register} />
            </div>
            {errors[field.field_name] && <span className="text-rose-700 text-sm font-bold">Field title is required</span>}
        </div>
    );

}