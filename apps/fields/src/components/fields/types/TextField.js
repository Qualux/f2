import Label from '../Label';

export default function TextField( {field, register, errors} ) {

    return(
        <div className="my-4">
            <Label text={field.field_label} />
            <input 
                className="block w-full bg-neutral-100 rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                type="text"
                placeholder={field.field_placeholder}
                {...register(field.field_name, { required: true })}
            />
            {errors[field.field_name] && <span className="text-rose-700 text-sm font-bold">Field title is required</span>}
        </div>
    );

}