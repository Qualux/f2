import { useState, useEffect } from 'react';
import { useFieldType } from '../../lib/useFieldType';
import { useFetch } from '../../lib/useFetch';
import { NavLink } from "react-router-dom";
import ChildFieldEditor from '../../components/groups/ChildFieldEditor';
import { useForm } from "react-hook-form";
import { useSystemFields } from '../../lib/useSystemFields';
import SystemField from '../fields/SystemField';

/* We need access to the child field data. */

export default function FieldGroupForm({fieldGroup, fieldGroupLoaded}) {

    const [valuesInit, setValuesInit] = useState(false);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [fields, setFields] = useState([]);
    const [complete, setComplete] = useState(false);
    const [selectedChildIds, setSelectedChildIds] = useState([]);

    const { fieldTypeList } = useFieldType();
    const { postData } = useFetch();
    const { systemFields } = useSystemFields();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue, 
        getValues,
    } = useForm();

    useEffect(() => {

        if(fieldGroupLoaded && !valuesInit) {
            setId(fieldGroup.id);
            setTitle(fieldGroup.title);
            setValuesInit(true);
        }

    }, [fieldGroupLoaded])

    const onSubmit = (data) => {

        const preparedData = {
            type: data.field_type,
            title: data.field_title,
            name: data.field_name,
            storage: data.field_storage,
            choices: getValues('choices'),
        }

        const url = 'http://zero1.local/wp-json/zero/v1/field-group';
        postData(url, preparedData).then((data) => {
            setComplete(true);
        });


    }

    const resetForm = () => {
        reset('');
    }

    if( complete ) {

        return(
            <main>
                <h1 className="mb-6 text-zinc-500 text-xl font-bold">
                    Create complete.
                </h1>
                <p className="text-zinc-500 text-lg">
                    Processing response message...
                </p>
                <div className="flex gap-6 items-center">
                    <button
                        onClick={resetForm}
                    >
                        Create another field group
                    </button>
                    <NavLink
                        to="/fields/edit/"
                        className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                        >
                        Edit created field group
                    </NavLink>
                    <NavLink
                        to="/fields"
                        className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                        >
                        Return to manage field groups
                    </NavLink>
                </div>
            </main>
        )
    }

    return(
        <div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <input type="hidden" value={id} />

                <SystemField 
                    field={systemFields.field_group_title}
                    register={register}
                    errors={errors}
                />

                <ChildFieldEditor
                    selectedChildIds={selectedChildIds}
                    setSelectedChildIds={setSelectedChildIds}
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