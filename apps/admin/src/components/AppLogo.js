import { NavLink } from "react-router-dom";

export default function Logo() {

    return(
        <div className="font-bold text-3xl flex items-center">
            <NavLink
                to="/"
                className="block no-underline py-1 px-3 rounded leading-none text-sky-800 bg-neutral-500/5 transition-colors hover:text-sky-800"
            >
                F3
            </NavLink>
        </div>
    );
    
}