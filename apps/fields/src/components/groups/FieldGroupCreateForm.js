import { useState, useEffect, useContext } from 'react';
import { useFieldType } from '../../lib/useFieldType';
import { useFetch } from '../../lib/useFetch';
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import systemFields from '../../data/system_fields.json';
import Field from '../fields/Field';
import CreateComplete from './create/CreateComplete';
import { DomainContext } from '../../contexts';

export default function FieldGroupCreateForm() {

    const [valuesInit, setValuesInit] = useState(false);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [fields, setFields] = useState([]);
    const [complete, setComplete] = useState(false);
    const [response, setResponse] = useState(null);

    const { fieldTypeList } = useFieldType();
    const { postData } = useFetch();
    const domain = useContext(DomainContext);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue, 
        getValues,
    } = useForm();

    const onSubmit = (data) => {

        const preparedData = {
            title: data.field_group_title,
            fields: getValues('field_group_fields'),
            storage_post_type: data.field_group_post_type,
        }

        postData(domain.api + '/zero/v1/field-group', preparedData).then((data) => {
            setComplete(true);
            setResponse(data);
        });

    }

    const resetForm = () => {
        reset();
        setComplete(false);
    }

    if( complete ) {

        return(
            <CreateComplete resetForm={resetForm} response={response} />
        )
    }

    return(
        <div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <input type="hidden" value={id} />

                <Field 
                    field={systemFields.field_group_title}
                    register={register}
                    errors={errors}
                />

                <Field
                    field={systemFields.field_group_fields}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                />

                <Field 
                    field={systemFields.field_group_post_type}
                    register={register}
                    errors={errors}
                />

                <div className="mt-6">
                    <button 
                        type="submit"
                        className="w-64 bg-sky-700 text-white py-2 px-12 font-semibold hover:bg-sky-800 rounded"
                    >
                        SAVE FIELD GROUP
                    </button>
                </div>

            </form>
            
            <div className="mt-12">
                <NavLink
                    to="/groups"
                    className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                    >
                    Cancel
                </NavLink>
            </div>

        </div>
    )
}