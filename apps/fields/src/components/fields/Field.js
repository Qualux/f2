import Label from './Label';
import SelectField from './types/SelectField';
import EmailField from './types/EmailField';
import UrlField from './types/UrlField';
import CollectionField from './types/CollectionField';

export default function Field( {field, register, errors, getValues, setValue, valuesInit} ) {

    switch( field.type ) {
        case 'text':
            return(
                <div className="my-4">
                    <Label text={field.label} />
                    <input 
                        className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                        type="text"
                        placeholder={field.placeholder}
                        {...register(field.name, { required: true })}
                    />
                    {errors[field.name] && <span className="text-rose-700 text-sm font-bold">Field title is required</span>}
                </div>
            );
            break;
        case 'select':
            return <SelectField field={field} register={register} errors={errors} />
            break;
        case 'number':
            return(
                <div className="my-4">
                    <Label text={field.label} />
                    <input 
                        className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                        type="text"
                        placeholder={field.placeholder}
                        {...register(field.name, { required: true })}
                    />
                    {errors[field.name] && <span className="text-rose-700 text-sm font-bold">Field title is required</span>}
                </div>
            );
            break;
        case 'email':
            return <EmailField field={field} register={register} errors={errors} />
            break;
        case 'url':
            return <UrlField field={field} register={register} errors={errors} />
            break;
        default:
            return(
                'Invalid or missing field type.'
            )
            break;
    }

}