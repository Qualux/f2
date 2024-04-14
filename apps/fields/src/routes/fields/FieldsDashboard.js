import { useState, useEffect } from 'react';
import { useLocation, NavLink, Outlet } from "react-router-dom";
import FieldList from '../../components/fields/FieldList';
import { useFieldType } from '../../lib/useFieldType';
import { useField } from '../../lib/useField';

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
    
}