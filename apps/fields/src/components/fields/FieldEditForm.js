import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useFieldType } from '../../lib/useFieldType';
import { useFetch } from '../../lib/useFetch';
import { useSystemFields } from '../../lib/useSystemFields';
import SystemField from './SystemField';

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

// @TODO we need updates to the API to return the field data including ID.
const CompleteScreen = ({createdFieldData, resetForm}) => {

    console.log(createdFieldData)

    return(
        <main>
            <h2>
                Congrats. The field was successfully edited.
            </h2>
            <p>
                {createdFieldData.message}
            </p>
            <div>
                <NavLink
                    to="/fields"
                    className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                    >
                    Manage fields
                </NavLink>
                <button
                    onClick={resetForm}
                    className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                    >
                    Continue editing
                </button>
            </div>
        </main>
    )
}

export default function FieldEditForm({field, fieldLoaded}) {

    const [complete, setComplete] = useState(false);
    const [createdFieldData, setCreatedFieldData] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    const { fieldTypeList } = useFieldType();
    const { postData } = useFetch();
    const { systemFields } = useSystemFields();

    useEffect(() => {
        if (fieldLoaded && field) {
            reset({
                field_type: field.type, // Set default values for each field
                field_title: field.title,
                field_name: field.name,
                field_storage: field.storage,
            });
        }
    }, [fieldLoaded, field, reset]);

    const onSubmit = (data) => {

        const preparedData = {
            type: data.field_type,
            title: data.field_title,
            name: data.field_name,
            storage: data.field_storage,
        }

        const url = 'http://zero1.local/wp-json/zero/v1/field/'+field.id;
        postData(url, preparedData).then((data) => {
            setCreatedFieldData(data);
            setComplete(true);
        });


    }

    const resetForm = () => {
        setComplete(false);
        setCreatedFieldData(null);
        reset();
    }

    if( complete ) {
        return <CompleteScreen createdFieldData={createdFieldData} resetForm={resetForm} />
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