import { NavLink } from "react-router-dom";
import { Cog8ToothIcon } from '@heroicons/react/24/solid'

export default function AppHeader({title}) {

    return(
        <header className="flex items-center justify-between bg-sky-800 mb-6 text-zinc-200 font-semibold p-3">
            <div>
                {title}
            </div>
            <span>
                <NavLink
                    to="/settings"
                    className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                    >
                    <Cog8ToothIcon className="h-6 w-6 text-zinc-300" /> 
                </NavLink>
            </span>
        </header>
    );

}