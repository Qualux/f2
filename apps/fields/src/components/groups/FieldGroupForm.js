import { useState, useEffect } from 'react';
import { useFieldType } from '../../lib/useFieldType';
import { useFetch } from '../../lib/useFetch';
import { NavLink } from "react-router-dom";
import ChildFieldEditor from '../../components/groups/ChildFieldEditor';


export default function FieldGroupForm({fieldGroup, fieldGroupLoaded}) {

    const [valuesInit, setValuesInit] = useState(false);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [fields, setFields] = useState([]);
    const [complete, setComplete] = useState(false);
    const [processResponse, setProcessResponse] = useState(null);

    const { fieldTypeList } = useFieldType();
    const { postData } = useFetch();

    useEffect(() => {

        if(fieldGroupLoaded && !valuesInit) {
            setId(fieldGroup.id);
            setTitle(fieldGroup.title);
            setValuesInit(true);
        }

    }, [fieldGroupLoaded])

    const process = () => {

        let url = 'http://zero1.local/wp-json/zero/v1/field-group';
        if(id) {
            url += '/'+id;
        }

        const data = {
            title,
        }

        const resp = postData(url, data).then((data) => {
            setComplete(true);
            setProcessResponse(data);
        });

    }

    const resetForm = () => {
        setComplete(false);
        setProcessResponse(null);
        setTitle('');
    }

    if( complete ) {
        console.log('process resp...')
        console.log(processResponse)
        return(
            <main>
                <h1 className="mb-6 text-zinc-500 text-xl font-bold">
                    Create complete.
                </h1>
                <p className="text-zinc-500 text-lg">
                    {processResponse.message}
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
            <input type="hidden" value={id} />
            <div className="my-4">
                <label className="block text-zinc-500 text-sm">
                    Title
                </label>
                <input 
                    className="w-64 border border-solid border-zinc-300 rounded py-2 px-2 font-semibold font-lg"
                    type="text"
                    value={title}
                    onInput={ (e) => { setTitle(e.target.value) } }
                    placeholder="Field display title..."
                />
            </div>
            <ChildFieldEditor />
            <div className="mt-6">
                <button 
                    className="w-64 bg-sky-700 text-white py-2 px-12 font-semibold hover:bg-sky-800 rounded"
                    onClick={process}
                >
                    SAVE FIELD GROUP
                </button>
            </div>
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