import { useState, useEffect } from 'react';
import { useLocation, NavLink, Outlet } from "react-router-dom";
import AppTemplate from '../../components/global/AppTemplate';
import FieldList from '../../components/fields/FieldList';
import { useField } from '../../lib/useField';

export default function FieldDashboardRoute() {

    const [mode, setMode] = useState('list');

    const location = useLocation();

    // Check if the current route is the main route ("/groups")
    const isMainRoute = location.pathname === "/fields";

    if( isMainRoute ) {
        return(
            <AppTemplate>
                <div className="m-8">
                    <div className="">
                        <div className="mb-10">
                            <NavLink
                                to="/fields/create"
                                className="font-bold text-zinc-100 bg-sky-800 py-2 px-6 rounded"
                                >
                                Create Field
                            </NavLink>
                        </div>
                    </div>
                    <FieldList setMode={setMode} />
                </div>
            </AppTemplate>
        )
    }

    return(
        <Outlet />
    )
    
}