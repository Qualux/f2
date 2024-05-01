import Label from '../../Label';

export default function TrueFalseField( {field, register, errors} ) {

    return(
        <div className="my-4">
            <Label text={field.field_label} />
            <div>
                TRUE FALSE FIELD
            </div>
            {errors[field.field_name] && <span className="text-rose-700 text-sm font-bold">Field title is required</span>}
        </div>
    );

}