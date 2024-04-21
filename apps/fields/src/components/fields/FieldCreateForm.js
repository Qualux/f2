import { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useFieldType } from '../../lib/useFieldType';
import { useFetch } from '../../lib/useFetch';
import { useSystemFields } from '../../lib/useSystemFields';
import Field from './Field';
import CreateComplete from './create/CreateComplete';
import CancelButton from './create/CancelButton';
import systemFieldsJson from '../../data/system_fields.json';
import { DomainContext } from '../../contexts';

export default function FieldCreateForm() {

    const [complete, setComplete] = useState(false);
    const [createdFieldData, setCreatedFieldData] = useState(null);
    const [conditionPlaceholder, setConditionPlaceholder] = useState(false);

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
    const domain = useContext(DomainContext);

    const onSubmit = (data) => {

        postData(domain.api + '/zero/v1/field', data).then((data) => {
            setCreatedFieldData(data);
            setComplete(true);
        });

    }

    const resetForm = () => {
        setComplete(false);
        setCreatedFieldData(null);
        reset();
    }

    useEffect(() => {

        const fieldType = getValues('field_type');
        if( fieldType === 'text' ) {
            setConditionPlaceholder(true);
            return;
        }
        setConditionPlaceholder(false);

    }, [watch('field_type')])

    if( complete ) {
        return <CreateComplete createdFieldData={createdFieldData} resetForm={resetForm} />
    }

    return(
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>

                <Field 
                    field={systemFieldsJson.field_type}
                    register={register}
                    errors={errors}
                />

                <Field 
                    field={systemFieldsJson.field_title}
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

                {conditionPlaceholder &&
                    <Field 
                        field={systemFields.field_placeholder}
                        register={register}
                        errors={errors}
                    />
                }

                {watch('field_type') === 'select' && 
                    <Field 
                        field={systemFields.field_choices}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
                        valuesInit={true}
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