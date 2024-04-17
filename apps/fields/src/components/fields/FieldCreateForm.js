import { useState } from 'react';
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useFieldType } from '../../lib/useFieldType';
import { useFetch } from '../../lib/useFetch';
import { useSystemFields } from '../../lib/useSystemFields';
import SystemField from './SystemField';
import CollectionField from '../field-types/collection/CollectionField';

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
                Congrats. You have made a field. Yippee yay motherfucker.
            </h2>
            <p>
                {createdFieldData.message}
            </p>
            <div>
                <NavLink
                    to="/fields/edit/192"
                    className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                    >
                    Edit Field
                </NavLink>
                <button
                    onClick={resetForm}
                    className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                    >
                    Make Another Field
                </button>
            </div>
        </main>
    )
}

export default function FieldCreateForm() {

    const [complete, setComplete] = useState(false);
    const [createdFieldData, setCreatedFieldData] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue, 
        getValues,
    } = useForm()

    const { fieldTypeList } = useFieldType();
    const { postData } = useFetch();
    const { systemFields } = useSystemFields();

    const onSubmit = (data) => {

        const preparedData = {
            type: data.field_type,
            title: data.field_title,
            label: data.field_label,
            name: data.field_name,
            storage: data.field_storage,
            choices: getValues('choices'),
        }

        const url = 'http://zero1.local/wp-json/zero/v1/field';
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
                    field={systemFields.field_label}
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

                <CollectionField 
                    field={
                        {
                            title: 'Choices',
                            name: 'choices',
                        }
                    }
                    setValue={setValue}
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