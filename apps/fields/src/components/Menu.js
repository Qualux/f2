import { NavLink } from "react-router-dom";

const itemClasses = ({ isActive, isPending }) => {
    const base = "grow rounded py-1 px-2 text-white"
    const extra = isPending ? "" : isActive ? "bg-sky-800" : "bg-zinc-400 hover:bg-zinc-500"
    return base + ' ' + extra;
}

export default function Menu() {

    return(
        <ul className="w-64 bg-zinc-100 p-2 gap-px flex flex-col items-stretch">
            <li className="flex items-center justify-stretch">
                <NavLink
                    to="/"
                    className={itemClasses}
                    >
                    DASHBOARD
                </NavLink>
                
            </li>
            <li className="flex items-center justify-stretch">
                <NavLink
                        to="/fields"
                        className={itemClasses}
                        >
                        FIELDS
                </NavLink>
            </li>
            <li className="flex items-center justify-stretch">
                <NavLink
                        to="/groups"
                        className={itemClasses}
                        >
                        GROUPS
                </NavLink>
            </li>
            <li className="flex items-center justify-stretch">
                <NavLink
                        to="/forms"
                        className={itemClasses}
                        >
                        FORMS
                </NavLink>
            </li>
            <li className="flex items-center justify-stretch">
                <NavLink
                        to="/settings"
                        className={itemClasses}
                        >
                        SETTINGS
                </NavLink>
            </li>
        </ul>
    )
}