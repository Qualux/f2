import { NavLink } from "react-router-dom";

export default function Logo() {

    return(
        <div className="font-semibold text-2xl flex items-center">
            <NavLink
                to="/"
                className="block no-underline leading-none text-white transition-colors focus:shadow-none focus:outline-none focus:text-white/20 hover:text-white/20"
            >
                F3
            </NavLink>
        </div>
    );
    
}