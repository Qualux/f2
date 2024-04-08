import { useState, useEffect } from 'react';
import { useFieldType } from '../../lib/useFieldType';
import { NavLink } from "react-router-dom";

async function postData( url = "", data = {} ) {

    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
        "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });

    return response.json();

}

export default function FieldGroupForm({field, fieldLoaded}) {

    console.log('FG Form component...')

    const [valuesInit, setValuesInit] = useState(false);
    const [id, setId] = useState(0);
    const [type, setType] = useState('text');
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [storage, setStorage] = useState('');
    const [complete, setComplete] = useState(false);

    const { fieldTypeList } = useFieldType();

    useEffect(() => {

        if(fieldLoaded && !valuesInit) {
            console.log('setting vals FG form...')
            setId(field.id);
            setType(field.type);
            setTitle(field.title);
            console.log(field.title)
            setName(field.name);
            setStorage(field.storage);
            setValuesInit(true);
        }

    }, [fieldLoaded])

    const process = () => {

        let url = 'http://zero1.local/wp-json/zero/v1/field-group';

        const data = {
            type,
            name, 
            title,
            storage,
        }

        postData(url, data).then((data) => {
            console.log(data);
            setComplete(true);
        });

    }

    if( complete ) {
        return(
            <main>
                Create complete.
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
                    className="border border-solid border-zinc-300 rounded py-2 px-2 font-semibold font-lg"
                    type="text"
                    value={title}
                    onInput={ (e) => { setTitle(e.target.value) } }
                    placeholder="Field display title..."
                />
            </div>
            <div className="mt-6">
                <button 
                    className="bg-sky-700 text-white py-2 px-12 font-semibold hover:bg-sky-800 rounded"
                    onClick={process}
                >
                    SAVE FIELD GROUP
                </button>
            </div>
            <div className="mt-6">
                <NavLink
                    to="/groups"
                    className="font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                    >
                    Cancel
                </NavLink>
            </div>
        </div>
    )
}