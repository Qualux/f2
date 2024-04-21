import Label from '../Label';

export default function TextField( {field, register, errors} ) {

    return(
        <div className="my-4">
            <Label text={field.field_label} />
            <input 
                className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                type="text"
                placeholder={field.field_placeholder}
                {...register(field.field_name, { required: true })}
            />
            {errors[field.field_name] && <span className="text-rose-700 text-sm font-bold">Field title is required</span>}
        </div>
    );

}