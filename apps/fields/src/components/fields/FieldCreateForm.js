import { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useFetch } from '../../lib/useFetch';
import Field from './Field';
import CreateComplete from './create/CreateComplete';
import CancelButton from './create/CancelButton';
import systemFields from '../../data/system_fields.json';
import { DomainContext } from '../../contexts';

export default function FieldCreateForm() {

    const [complete, setComplete] = useState(false);
    const [createdFieldData, setCreatedFieldData] = useState(null);
    const [conditionPlaceholder, setConditionPlaceholder] = useState(false);
    const [conditionChoices, setConditionChoices] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue, 
        getValues,
        control,
    } = useForm()

    const { postData } = useFetch();
    const domain = useContext(DomainContext);

    const onSubmit = (data) => {

        data.field_type = data.field_type.value;

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

        if( typeof fieldType === 'undefined' ) {
            return;
        }
        
        if( fieldType.value === 'text' ) {
            setConditionPlaceholder(true);
        } else {
            setConditionPlaceholder(false);
        }

        if( 
            fieldType.value === 'select' || 
            fieldType.value === 'searchable_select' || 
            fieldType.value === 'checkbox' ||
            fieldType.value === 'radio_group' 
        ) {
            setConditionChoices(true);
        } else {
            setConditionChoices(false);
        }

    }, [watch('field_type')])

    if( complete ) {
        return <CreateComplete createdFieldData={createdFieldData} resetForm={resetForm} />
    }

    return(
        <main className="px-6 sm:px-4">
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="sm:max-w-lg sm:mx-auto"
            >

                <Field 
                    field={systemFields.field_type}
                    register={register}
                    errors={errors}
                    control={control}
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
                    field={systemFields.field_conditions}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                />

                <Field 
                    field={systemFields.field_condition_rules}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                />

                {conditionPlaceholder &&
                    <Field 
                        field={systemFields.field_placeholder}
                        register={register}
                        errors={errors}
                    />
                }

                {conditionChoices && 
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