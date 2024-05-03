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
                <div className="my-2">
                    <div className="">
                        <div className="mb-2">
                            <NavLink
                                to="/fields/create"
                                className="inline-block bg-neutral-900 text-neutral-300 py-1 px-4 font-medium rounded-sm shadow-md transition-transform hover:scale-110"
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