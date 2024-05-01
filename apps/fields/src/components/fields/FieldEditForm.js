import { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useFetch } from '../../lib/useFetch';
import Field from './Field';
import CompleteScreen from './edit/CompleteScreen';
import CancelButton from './edit/CancelButton';
import systemFields from '../../data/system_fields.json';
import { DomainContext } from '../../contexts';

const findOptionByValue = (valueToFind, choices) => {
    for (const group of choices) {
        const foundOption = group.options.find(option => option.value === valueToFind);
        if (foundOption) {
            return foundOption;
        }
    }
    return null; // Return null if option is not found
};

export default function FieldEditForm({field, fieldLoaded}) {

    const [valuesInit, setValuesInit] = useState(false);
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

    useEffect(() => {
        if (fieldLoaded && field) {

            field.field_type = findOptionByValue(  field.field_type, systemFields.field_type.field_choices );

            reset(field);
            setValuesInit(true);
        }
    }, [fieldLoaded, field, reset]);

    const onSubmit = (data) => {

        postData(domain.api + '/zero/v1/field/' + field.id, data).then((data) => {
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
        return <CompleteScreen createdFieldData={createdFieldData} resetForm={resetForm} />
    }

    return(
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>

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