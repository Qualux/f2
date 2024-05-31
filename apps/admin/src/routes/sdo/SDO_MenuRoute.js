import { NavLink } from "react-router-dom";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import AppTemplate from '../../components/AppTemplate';
import { ScreenWrap } from 'shared';

export default function SDO_MenuRoute() {

    return(
        <AppTemplate>
            <header className="flex items-center gap-6 mt-4 mb-8">
                <h1 className="text-xl font-light text-neutral-300">
                    Register WordPress Objects
                </h1>
                <p className="text-neutral-500 font-light text-sm w-56 border-0 border-solid !border-l-2 border-white/10 pl-4">
                    Manage WordPress object registrations and F3 structured data.
                </p>
            </header>
            <ScreenWrap>
                <section className="grid grid-cols-2 gap-6">
                    <NavLink 
                        to="/post-type"
                        className="bg-white/5 no-underline flex gap-4 items-center p-8 pt-6 text-neutral-300 font-semibold hover:text-neutral-300 hover:bg-white/10">
                        <span>
                            Manage Post Types
                        </span>
                        <ArrowUpRightIcon className="h-6 w-6 text-neutral-300" />
                    </NavLink>
                    <NavLink 
                        to="/taxonomy"
                        className="bg-white/5 no-underline flex gap-4 items-center p-8 pt-6 text-neutral-300 font-semibold hover:text-neutral-300 hover:bg-white/10">
                        <span>
                            Manage Taxonomies
                        </span>
                        <ArrowUpRightIcon className="h-6 w-6 text-neutral-300" />
                    </NavLink>
                    <NavLink 
                        to="/options-page"
                        className="bg-white/5 no-underline flex gap-4 items-center p-8 pt-6 text-neutral-300 font-semibold hover:text-neutral-300 hover:bg-white/10">
                        <span>
                            Manage Options Pages
                        </span>
                        <ArrowUpRightIcon className="h-6 w-6 text-neutral-300" />
                    </NavLink>
                    <NavLink 
                        to="/query"
                        className="bg-white/5 no-underline flex gap-4 items-center p-8 pt-6 text-neutral-300 font-semibold hover:text-neutral-300 hover:bg-white/10">
                        <span>
                            Manage Queries
                        </span>
                        <ArrowUpRightIcon className="h-6 w-6 text-neutral-300" />
                    </NavLink>
                    <NavLink 
                        to="/field-group"
                        className="bg-white/5 no-underline flex gap-4 items-center p-8 pt-6 text-neutral-300 font-semibold hover:text-neutral-300 hover:bg-white/10">
                        <span>
                            Manage Global Field Groups
                        </span>
                        <ArrowUpRightIcon className="h-6 w-6 text-neutral-300" />
                    </NavLink>
                    <NavLink 
                        to="/field"
                        className="bg-white/5 no-underline flex gap-4 items-center p-8 pt-6 text-neutral-300 font-semibold hover:text-neutral-300 hover:bg-white/10">
                        <span>
                            Manage Global Fields
                        </span>
                        <ArrowUpRightIcon className="h-6 w-6 text-neutral-300" />
                    </NavLink>
                </section>
            </ScreenWrap>
        </AppTemplate>
    );

}