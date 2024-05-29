import AppLogo from './AppLogo';
import { NavLink } from "react-router-dom";
import { Cog8ToothIcon } from '@heroicons/react/24/solid';
import Menu from './AppMenu';

export default function AppHeader( { title } ) {

    return(
        <header className="flex items-center justify-between bg-neutral-800 font-semibold px-3 py-1">
            <div className="flex items-center gap-2">
                <AppLogo />
                <div>
                    {title}
                </div>
                <Menu />
            </div>
            <span>
                <NavLink
                    to="/settings"
                    className="text-neutral-200 transition-colors hover:text-neutral-100"
                    >
                    <Cog8ToothIcon className="h-5 w-5" /> 
                </NavLink>
            </span>
        </header>
    );

}