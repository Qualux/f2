import Label from '../Label';

export default function NumberField( {field, register, errors, fieldRegisterPrefix} ) {

    const registerName = fieldRegisterPrefix ? `${fieldRegisterPrefix}.${field.field_name}` : field.field_name;

    return(
        <div className="my-4">
            <Label text={field.field_label} />
            <input 
                className="block w-full bg-neutral-100 rounded-md border-0 py-1.5 px-1 text-gray-900 placeholder:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
                type="text"
                placeholder={field.field_placeholder}
                {...register(registerName, { required: true })}
            />
            {errors[field.field_name] && <span className="text-rose-700 text-sm font-bold">Field is required</span>}
        </div>
    );

}