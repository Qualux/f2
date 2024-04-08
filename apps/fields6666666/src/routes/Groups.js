import { useState } from 'react';
import FieldGroupList from '../components/groups/FieldGroupList';
import FieldGroupForm from '../components/groups/FieldGroupForm';
import { useFieldType } from '../lib/useFieldType';
import { useField } from '../lib/useField';
import { useLocation, Outlet, NavLink } from "react-router-dom";

function FieldGroupFormEdit( { setMode, mode } ) {

    const { field, isLoaded } = useField(85);

    console.log(field)

    return( 
        <FieldGroupForm mode={mode} setMode={setMode} field={field} fieldLoaded={isLoaded} />
    )
}

export default function Groups() {

    const [mode, setMode] = useState('list');

    const location = useLocation();

    // Check if the current route is the main route ("/groups")
    const isMainRoute = location.pathname === "/groups";

    if( isMainRoute ) {
        return(
            <main>
                <h2 className="mt-8 font-bold text-zinc-300 mb-6 text-lg">
                    FIELD GROUPS
                </h2>
                <div className="my-8">
                    <NavLink
                        to="/groups/create"
                        className="font-bold text-zinc-100 bg-sky-800 py-2 px-6 rounded"
                        >
                        Create Field Group
                    </NavLink>
                </div>
                <FieldGroupList setMode={setMode} />
            </main>
        )
    }

    return(
        <Outlet />
    )
    
}