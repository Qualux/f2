import { NavLink } from "react-router-dom";

export default function Logo() {

    return(
        <div className="font-bold text-3xl flex items-center justify-center pb-2">
            <NavLink
                to="/"
                className=""
                >
                    <span className="leading-none text-zinc-400 transition-colors hover:text-zinc-100">
                        F2
                    </span>
            </NavLink>
        </div>
    );
    
}