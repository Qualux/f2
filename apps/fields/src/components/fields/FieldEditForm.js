import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useFieldType } from '../../lib/useFieldType';
import { useFetch } from '../../lib/useFetch';
import { useSystemFields } from '../../lib/useSystemFields';
import Field from './Field';
import CollectionField from './types/CollectionField';
import CompleteScreen from './edit/CompleteScreen';

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

export default function FieldEditForm({field, fieldLoaded}) {

    const [valuesInit, setValuesInit] = useState(false);
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

    useEffect(() => {
        if (fieldLoaded && field) {
            reset({
                field_type: field.type, // Set default values for each field
                field_title: field.title,
                field_name: field.name,
                field_storage: field.storage,
                field_label: field.label,
                field_placeholder: field.placeholder,
                choices: field.choices
            });
            setValuesInit(true);
        }
    }, [fieldLoaded, field, reset]);

    const onSubmit = (data) => {

        const preparedData = {
            type: data.field_type,
            title: data.field_title,
            label: data.field_label,
            name: data.field_name,
            storage: data.field_storage,
            choices: getValues('choices'),
            placeholder: data.field_placeholder,
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

                <Field
                    field={systemFields.field_type}
                    register={register}
                    errors={errors}
                />

                <Field
                    field={systemFields.field_title}
                    register={register}
                    errors={errors}
                />

                <Field
                    field={systemFields.field_label}
                    register={register}
                    errors={errors}
                />

                <Field
                    field={systemFields.field_name}
                    register={register}
                    errors={errors}
                />

                <Field
                    field={systemFields.field_storage}
                    register={register}
                    errors={errors}
                />

                <Field
                    field={systemFields.field_placeholder}
                    register={register}
                    errors={errors}
                />

                {watch('field_type') === 'select' && 
                    <CollectionField 
                        field={
                            {
                                title: 'Choices',
                                name: 'choices',
                            }
                        }
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                        errors={errors}
                        valuesInit={valuesInit}
                    />
                }
                
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