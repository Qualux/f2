import { NavLink } from "react-router-dom";

const itemClasses = ({ isActive, isPending }) => {
    const base = "grow py-1 px-3 !text-white font-semibold text-sm"
    const extra = isPending ? "" : isActive ? "bg-sky-700" : "bg-zinc-400 hover:bg-zinc-500"
    return base + ' ' + extra;
}

export default function Menu() {

    return(
        <main className="bg-zinc-700">
            <ul className="w-48 gap-0 flex flex-col items-stretch">
                <li className="flex items-center justify-stretch m-0">
                    <NavLink
                        to="/"
                        className={itemClasses}
                        >
                        DASHBOARD
                    </NavLink>
                    
                </li>
                <li className="flex items-center justify-stretch m-0">
                    <NavLink
                            to="/fields"
                            className={itemClasses}
                            >
                            FIELDS
                    </NavLink>
                </li>
                <li className="flex items-center justify-stretch m-0">
                    <NavLink
                            to="/groups"
                            className={itemClasses}
                            >
                            GROUPS
                    </NavLink>
                </li>
                <li className="flex items-center justify-stretch m-0">
                    <NavLink
                            to="/settings"
                            className={itemClasses}
                            >
                            SETTINGS
                    </NavLink>
                </li>
            </ul>
        </main>   
    )
}