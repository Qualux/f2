import { useState, useEffect } from 'react';
import { useLocation, NavLink, Outlet } from "react-router-dom";
import AppTemplate from '../../components/global/AppTemplate';
import FieldList from '../../components/fields/field_list/FieldList';
import { useField } from '../../lib/useField';

export default function FieldDashboardRoute() {

    const [mode, setMode] = useState('list');

    const location = useLocation();

    // Check if the current route is the main route ("/groups")
    const isMainRoute = location.pathname === "/fields";

    if( isMainRoute ) {
        return(
            <AppTemplate>
                <div className="max-w-3xl my-2">
                    <FieldList />
                </div>
            </AppTemplate>
        )
    }

    return(
        <Outlet />
    )
    
}