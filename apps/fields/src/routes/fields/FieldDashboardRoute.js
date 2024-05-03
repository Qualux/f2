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
                <div className="max-w-3xl my-2">
                    <div className="flex mb-6 items-center justify-between">
                        <div className="mb-2">
                            <NavLink
                                to="/fields/create"
                                className="inline-block bg-neutral-900 text-neutral-300 py-1 px-4 font-medium rounded-sm shadow-md transition-transform hover:scale-110"
                                >
                                Create Field
                            </NavLink>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                            </svg>
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