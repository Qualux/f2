import { useState, useEffect } from 'react';
import { useFieldType } from '../../lib/useFieldType';
import { useFetch } from '../../lib/useFetch';
import { NavLink } from "react-router-dom";

export default function FieldForm({field, fieldLoaded}) {

    const [valuesInit, setValuesInit] = useState(false);
    const [id, setId] = useState(0);
    const [type, setType] = useState('text');
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [storage, setStorage] = useState('');
    const [complete, setComplete] = useState(false);

    const { fieldTypeList } = useFieldType();
    const { postData } = useFetch();

    useEffect(() => {

        if(fieldLoaded && !valuesInit) {
            console.log('setting vals...')
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

        let url = 'http://zero1.local/wp-json/zero/v1/field';
        if(id) {
            url += '/'+id;
        }

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

    return(
        <div>
            <input type="hidden" value={id} />
            <div>
                <label className="block">
                    Type
                </label>
                <select
                    className="w-64 border border-solid border-zinc-200"
                    onChange={ (e) => { setType(e.target.value) } }
                    value={type}
                >
                    {fieldTypeList.map( ( fieldType, index ) =>
                        <option key={index} value={fieldType.name}>
                            {fieldType.label}
                        </option> 
                    )}
                </select>
            </div>
            <div className="my-4">
                <label className="block">
                    Title
                </label>
                <input 
                    className="w-64 border border-solid border-zinc-200"
                    type="text"
                    value={title}
                    onInput={ (e) => { setTitle(e.target.value) } }
                    placeholder="Field display title..."
                />
            </div>
            <div className="my-4">
                <label className="block">
                    Name
                </label>
                <input 
                    className="w-64 border border-solid border-zinc-200"
                    type="text"
                    value={name}
                    onInput={ (e) => { setName(e.target.value) } }
                    placeholder="Field unique name..."
                />
            </div>
            <div className="my-4">
                <label className="block">
                    Storage
                </label>
                <select 
                    className="w-64 border border-solid border-zinc-200"
                    value={storage}
                    onChange={ (e) => { setStorage(e.target.value) } }
                >
                    <option value="post_meta">
                        Post Meta
                    </option>
                    <option value="option">
                        Option
                    </option>
                </select>
            </div>
            <div className="my-4">
                <button 
                    className="bg-sky-700 text-white py-2 px-12 font-semibold hover:bg-sky-800"
                    onClick={process}
                >
                    SAVE FIELD
                </button>
            </div>
            <div className="mt-12">
                <NavLink
                    to="/fields"
                    className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                    >
                    Cancel
                </NavLink>
            </div>
        </div>
    )
}