import { useLocation, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

export default function SDO_DashboardRoute() {

    const location = useLocation();
    const isMainRoute = location.pathname === "/sdo";

    if( !isMainRoute ) {
        return <Outlet />
    }

    return(
        <main className="p-3">
            <h1 className="text-2xl font-bold text-neutral-400 mb-12">
                Structured Data Objects
            </h1>
            <section className="grid grid-cols-3">
                <NavLink 
                    to="/sdo/post-type"
                    className="flex gap-4 items-center shadow-xl p-8 pt-10 text-neutral-600 font-semibold">
                    <span>
                        Manage Post Types
                    </span>
                    <ArrowUpRightIcon className="h-6 w-6 text-gray-500" />
                </NavLink>
                <NavLink 
                    to="/sdo/taxonomy"
                    className="flex gap-4 items-center shadow-xl p-8 pt-10 text-neutral-600 font-semibold">
                    <span>
                        Manage Taxonomies
                    </span>
                    <ArrowUpRightIcon className="h-6 w-6 text-gray-500" />
                </NavLink>
                <NavLink 
                    to="/sdo/options-page"
                    className="flex gap-4 items-center shadow-xl p-8 pt-10 text-neutral-600 font-semibold">
                    <span>
                        Manage Options Pages
                    </span>
                    <ArrowUpRightIcon className="h-6 w-6 text-gray-500" />
                </NavLink>
            </section>
        </main>
    );

}