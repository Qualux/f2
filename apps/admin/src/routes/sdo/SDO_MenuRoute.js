import { NavLink } from "react-router-dom";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import AppTemplate from '../../components/AppTemplate';
import { ScreenWrap } from 'shared';

export default function SDO_MenuRoute() {

    return(
        <AppTemplate>
            <header className="flex items-center justify-between mt-4 mb-8">
                <h1 className="text-xl font-semibold text-neutral-500">
                    Structured Data Objects
                </h1>
                <p className="text-neutral-300 text-sm w-64">
                    Manage WordPress object registrations and F3 structured data.
                </p>
            </header>
            <ScreenWrap>
                <section className="grid grid-cols-2 gap-6">
                    <NavLink 
                        to="/post-type"
                        className="no-underline flex gap-4 items-center shadow-xl p-8 pt-10 text-neutral-600 font-semibold">
                        <span>
                            Manage Post Types
                        </span>
                        <ArrowUpRightIcon className="h-6 w-6 text-gray-500" />
                    </NavLink>
                    <NavLink 
                        to="/taxonomy"
                        className="no-underline flex gap-4 items-center shadow-xl p-8 pt-10 text-neutral-600 font-semibold">
                        <span>
                            Manage Taxonomies
                        </span>
                        <ArrowUpRightIcon className="h-6 w-6 text-gray-500" />
                    </NavLink>
                    <NavLink 
                        to="/options-page"
                        className="no-underline flex gap-4 items-center shadow-xl p-8 pt-10 text-neutral-600 font-semibold">
                        <span>
                            Manage Options Pages
                        </span>
                        <ArrowUpRightIcon className="h-6 w-6 text-gray-500" />
                    </NavLink>
                    <NavLink 
                        to="/query"
                        className="no-underline flex gap-4 items-center shadow-xl p-8 pt-10 text-neutral-600 font-semibold">
                        <span>
                            Manage Queries
                        </span>
                        <ArrowUpRightIcon className="h-6 w-6 text-gray-500" />
                    </NavLink>
                </section>
            </ScreenWrap>
        </AppTemplate>
    );

}