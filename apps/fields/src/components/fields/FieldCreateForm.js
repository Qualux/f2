import { useState } from 'react';
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useFieldType } from '../../lib/useFieldType';
import { useFetch } from '../../lib/useFetch';
import { useSystemFields } from '../../lib/useSystemFields';

const CancelButton = () => {
    return(
        <div className="mt-12">
            <NavLink
                to="/fields"
                className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                >
                Cancel
            </NavLink>
        </div>
    )
}

const SystemField = ({field, register, errors}) => {

    switch( field.type ) {

        case 'text':
            return(
                <div className="my-4">
                    <label className="block mb-1 text-sm text-medium text-zinc-500">
                        {field.label}
                    </label>
                    <input 
                        className="border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                        type="text"
                        placeholder={field.placeholder}
                        {...register(field.name, { required: true })}
                    />
                    {errors[field.name] && <span className="text-rose-700 text-sm font-bold">Field title is required</span>}
                </div>
            );
            break;
        case 'select':
            return(
                <div className="my-4">
                    <label className="block mb-1 text-sm text-medium text-zinc-500">
                        {field.label}
                    </label>
                    <select
                        className="border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                        {...register(field.name, { required: true })}
                    >
                        {field.choices.map((choice, index) => (
                            <option key={index} value={choice.value}>
                                {choice.label}
                            </option>
                        ))}
                    </select>
                    {errors[field.name] && <span className="text-rose-700 text-sm font-bold">Field title is required</span>}
                </div>
            );
            break;
        default:
            return(
                'Invalid or missing field type.'
            )
            break;
    }

}

export default function FieldCreateForm({field, fieldLoaded}) {

    const [complete, setComplete] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const { fieldTypeList } = useFieldType();
    const { postData } = useFetch();
    const { systemFields } = useSystemFields();

    const onSubmit = (data) => {

        const preparedData = {
            type: data.field_type,
            title: data.field_title,
            name: data.field_name,
            storage: data.storage,
        }

        const url = 'http://zero1.local/wp-json/zero/v1/field';
        postData(url, preparedData).then((data) => {
            console.log(data);
            setComplete(true);
        });


    }

    if( complete ) {
        return(
            <main>
                Field created.
            </main>
        )
    }

    return(
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>

                <SystemField 
                    field={systemFields.field_type}
                    register={register}
                    errors={errors}
                />

                <SystemField 
                    field={systemFields.field_title}
                    register={register}
                    errors={errors}
                />

                <SystemField 
                    field={systemFields.field_name}
                    register={register}
                    errors={errors}
                />

                <SystemField 
                    field={systemFields.field_storage}
                    register={register}
                    errors={errors}
                />
                
                <button 
                    className="bg-sky-700 text-white py-2 px-12 font-semibold hover:bg-sky-800"
                >
                    SAVE FIELD
                </button>
            </form>
            <CancelButton />
        </main>
    )
}