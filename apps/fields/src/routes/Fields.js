import { useState, useEffect } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import FieldList from '../components/fields/FieldList';
import { useFieldType } from '../lib/useFieldType';
import { useField } from '../lib/useField';

function FieldFormEdit( { setMode, mode } ) {

    const { field, isLoaded } = useField(85);

    console.log(field)

    return(
        <FieldForm mode={mode} setMode={setMode} field={field} fieldLoaded={isLoaded} />
    )
}

function FieldForm({mode, setMode, field, fieldLoaded}) {

    const [valuesInit, setValuesInit] = useState(false);
    const [id, setId] = useState(0);
    const [type, setType] = useState('text');
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [storage, setStorage] = useState('');

    const { fieldTypeList } = useFieldType();

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
        if( mode === 'edit' ) {
            url += '/' + id;
        }

        const data = {
            type,
            name, 
            title,
            storage,
        }

        postData(url, data).then((data) => {
            console.log(data);
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
                    className="border border-zinc-200 border-solid"
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
            <div>
                <label className="block">
                    Title
                </label>
                <input 
                    type="text"
                    value={title}
                    onInput={ (e) => { setTitle(e.target.value) } }
                    placeholder="Field display title..."
                />
            </div>
            <div className="mt-6">
                <label className="block">
                    Name
                </label>
                <input 
                    type="text"
                    value={name}
                    onInput={ (e) => { setName(e.target.value) } }
                    placeholder="Field unique name..."
                />
            </div>
            <div className="mt-6">
                <label className="block">
                    Storage
                </label>
                <select 
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
            <div className="mt-6">
                <button 
                    className="bg-sky-700 text-white py-2 px-12 font-semibold hover:bg-sky-800"
                    onClick={process}
                >
                    SAVE FIELD
                </button>
            </div>
            <div className="mt-6">
                <button 
                    className="text-zinc-400 font-semibold"
                    onClick={() => { setMode('list')}}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

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

export default function Fields() {

    const [mode, setMode] = useState('list');

    if( mode === 'list' ) {
        return(
            <main>
                <h2 className="font-bold text-zinc-400 mb-6 text-lg">
                    FIELDS
                </h2>
                <NavLink
                    to="/fields/create"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "bg-sky-800 text-white" : ""
                    }
                    >
                    FIELDS
                </NavLink>
                <FieldList setMode={setMode} />
                <Outlet />
            </main>
        )
    }


    if( mode === 'edit' ) {
        return(
            <header>
                <h2 className="font-bold text-zinc-400 mb-6 text-lg">
                    FIELDS
                </h2>
                <FieldFormEdit mode={mode} setMode={setMode} />
            </header>
        )
    }
    
}