import Label from '../Label';

export default function TextAreaField( {field, register, errors} ) {

    return(
        <div className="my-4">
            <Label text={field.field_label} />
            <textarea
                className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                placeholder={field.field_placeholder}
                {...register(field.field_name, { required: true })}
            />
            {errors[field.field_name] && <span className="text-rose-700 text-sm font-bold">Field is required</span>}
        </div>
    );

}