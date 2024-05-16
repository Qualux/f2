import { NavLink } from "react-router-dom";

export default function Logo() {

    return(
        <div className="font-bold text-3xl flex items-center justify-center">
            <NavLink
                to="/"
                className=""
                >
                    <span className="leading-none text-neutral-200 transition-colors hover:text-neutral-100">
                        F3
                    </span>
            </NavLink>
        </div>
    );
    
}