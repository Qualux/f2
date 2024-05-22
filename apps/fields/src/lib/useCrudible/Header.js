import { useLocation } from "react-router-dom";
import { useCrudible } from './useCrudible';
import { NavLink } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

export default function Header() {

    const { useSDO } = useCrudible();
    const location = useLocation();
    const sdo = useSDO();
    const isCreateRoute = location.pathname === sdo.routes.create;
    const isEditRoute = location.pathname.startsWith(sdo.routes.edit);
    const isViewRoute = location.pathname.startsWith(sdo.routes.view);
    const isDeleteRoute = location.pathname.startsWith(sdo.routes.delete);

    function leftCol() {

        if( isCreateRoute ) {
            return(
                <div className="flex gap-5 items-center">
                    <h2 className="text-neutral-300 font-semibold text-lg">
                        CREATE
                    </h2>
                    <NavLink
                        to={sdo.routes.dashboard}
                        className="fill-neutral-300 transition-transform hover:scale-125"
                    >
                        <ArrowUturnLeftIcon className="h-4 w-4 text-sky-600" />
                    </NavLink>
                </div>
            )
        }

        if( isEditRoute ) {
            return(
                <div className="flex gap-5 items-center">
                    <h2 className="text-neutral-300 font-semibold text-lg">
                        EDIT
                    </h2>
                    <NavLink
                        to={sdo.routes.dashboard}
                        className="fill-neutral-300 transition-transform hover:scale-125"
                    >
                        <ArrowUturnLeftIcon className="h-4 w-4 text-sky-600" />
                    </NavLink>
                </div>
            )
        }

        if( isViewRoute ) {
            return(
                <div className="flex gap-5 items-center">
                    <h2 className="text-neutral-300 font-semibold text-lg">
                        VIEW
                    </h2>
                    <NavLink
                        to={sdo.routes.dashboard}
                        className="fill-neutral-300 transition-transform hover:scale-125"
                    >
                        <ArrowUturnLeftIcon className="h-4 w-4 text-sky-600" />
                    </NavLink>
                </div>
            )
        }

        if( isDeleteRoute ) {
            return(
                <div className="flex gap-5 items-center">
                    <h2 className="text-neutral-300 font-semibold text-lg">
                        DELETE
                    </h2>
                    <NavLink
                        to={sdo.routes.dashboard}
                        className="fill-neutral-300 transition-transform hover:scale-125"
                    >
                        <ArrowUturnLeftIcon className="h-4 w-4 text-sky-600" />
                    </NavLink>
                </div>
            )
        }

        return(
            <NavLink
                to={sdo.routes.create}
                className="inline-block bg-neutral-700 text-neutral-200 text-sm py-1 px-4 font-medium rounded-sm shadow-md transition-transform hover:scale-110 hover:text-neutral-200"
            >
                {sdo.create.button.label}
            </NavLink>
        )

    }

    return(
        <div className="flex mb-6 items-center justify-between">
            <div>
                {leftCol()}
            </div>
            <div className="flex gap-1 items-center">
                <svg className="w-5 h-5 stroke-neutral-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
                <p className="text-neutral-300 font-semibold text-sm">
                    {sdo.displayTitle}
                </p>
            </div>
        </div>
    );

}