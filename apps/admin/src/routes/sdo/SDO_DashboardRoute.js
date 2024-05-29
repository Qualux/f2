import { NavLink } from 'react-router-dom';
import { useLocation, Outlet } from "react-router-dom";
import { useCrudible } from 'shared';
import AppTemplate from '../../components/AppTemplate';
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

function Controls( {id} ) {

    const { useSDO } = useCrudible();
    const sdo = useSDO();

    return(
        <>
            <NavLink 
                to={`${sdo.routes.edit}/${id}`}
                className="flex items-center gap-2 no-underline text-xs text-neutral-200 bg-sky-900 py-1.5 px-2 rounded-sm font-semibold transition-colors hover:bg-sky-800 hover:text-neutral-100"
            >
                <span>
                    EDIT
                </span>
                <ArrowUpRightIcon className="h-4 w-4 text-neutral-200" />
            </NavLink>
            <NavLink 
                to={`${sdo.routes.delete}/${id}`}
                className="flex items-center gap-2 no-underline text-xs text-neutral-200 bg-sky-900 py-1.5 px-2 rounded-sm font-semibold transition-colors hover:bg-sky-800 hover:text-neutral-100"
            >
                <span>
                    DELETE
                </span>
                <ArrowUpRightIcon className="h-4 w-4 text-neutral-200" />
            </NavLink>
        </>
    );

}

function CreateButton() {

    const { useSDO } = useCrudible();
    const sdo = useSDO();

    return(
        <NavLink 
            to={sdo.routes.create}
            className="flex items-center gap-2 no-underline text-xs text-neutral-200 bg-sky-900 py-1.5 px-2 rounded-sm font-semibold transition-colors hover:bg-sky-800 hover:text-neutral-100"
        >
            <span>
                Create {sdo.post_type.label}
            </span>
            <ArrowUpRightIcon className="h-4 w-4 text-neutral-200" />
        </NavLink>
    );

}

function DashboardHeader() {

    const { Header } = useCrudible();

    return(
        <Header 
            routeType="dashboard"
            primaryLink={<CreateButton />}
        />
    );

}

export default function SDO_DashboardRoute( {sdo} ) {

    const location = useLocation();
    const isMainRoute = location.pathname === '/' + sdo.route_base;

    const { Crudible, Manager } = useCrudible();

    if( ! isMainRoute ) {
        return <Outlet />
    }

    return(
        <Crudible sdo={sdo}>
            <AppTemplate>
                <DashboardHeader />
                <Manager 
                    controls={( id ) => { 
                        return(
                            <Controls id={id} />
                        );
                    }}
                />
            </AppTemplate>
        </Crudible>
    );

}