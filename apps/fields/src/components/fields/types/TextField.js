import Label from '../Label';

export default function TextField( {field, register, errors} ) {

    return(
        <div className="my-4">
            <Label text={field.field_label} />
            <input 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                placeholder={field.field_placeholder}
                {...register(field.field_name, { required: true })}
            />
            {errors[field.field_name] && <span className="text-rose-700 text-sm font-bold">Field title is required</span>}
        </div>
    );

}