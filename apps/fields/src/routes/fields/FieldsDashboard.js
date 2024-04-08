import { useState, useEffect } from 'react';
import { useLocation, NavLink, Outlet } from "react-router-dom";
import FieldList from '../../components/fields/FieldList';
import FieldForm from '../../components/fields/FieldForm';
import { useFieldType } from '../../lib/useFieldType';
import { useField } from '../../lib/useField';

function FieldFormEdit( { setMode, mode } ) {

    const { field, isLoaded } = useField(85);

    console.log(field)

    return(
        <FieldForm mode={mode} setMode={setMode} field={field} fieldLoaded={isLoaded} />
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

export default function FieldsDashboard() {

    const [mode, setMode] = useState('list');

    const location = useLocation();

    // Check if the current route is the main route ("/groups")
    const isMainRoute = location.pathname === "/fields";

    if( isMainRoute ) {
        return(
            <main className="grow">
                <h2 className="mt-8 font-bold text-zinc-300 mb-6 text-lg">
                    MANAGE FIELDS
                </h2>
                <div className="my-8">
                    <NavLink
                        to="/fields/create"
                        className="font-bold text-zinc-100 bg-sky-800 py-2 px-6 rounded"
                        >
                        Create Field
                    </NavLink>
                </div>
                <FieldList setMode={setMode} />
            </main>
        )
    }

    return(
        <Outlet />
    )

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