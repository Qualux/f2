import Label from '../Label';

function ChoicesList({field}) {

    if( !field.field_choices ) {
        return(
            <option value="0">No choices</option>
        );
    }

    return(
        <>
            {field.field_choices.map((choice, index) => (
                <option key={index} value={choice.value}>
                    {choice.label}
                </option>
            ))}
        </>
    )
}

export default function SelectField( {field, register, errors} ) {

    return(
        <div className="my-4">
            <Label text={field.field_label} />
            <select
                className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                {...register(field.field_name, { required: true })}
            >
                <ChoicesList field={field} />
            </select>
            {errors[field.field_name] && <span className="text-rose-700 text-sm font-bold">Field title is required</span>}
        </div>
    );

}