import { NavLink } from "react-router-dom";

function Logo() {
    return(
        <div className="font-bold text-6xl flex items-center justify-center pb-2">
            <NavLink
                to="/"
                className=""
                >
                    <span className="leading-none text-zinc-500">
                        F2
                    </span>
            </NavLink>
        </div>
    )
}

const itemClasses = ({ isActive, isPending }) => {
    const base = "grow py-2 px-3 !text-white font-semibold"
    const extra = isPending ? "" : isActive ? "bg-sky-700" : "bg-zinc-400 hover:bg-zinc-500"
    return base + ' ' + extra;
}

export default function Menu() {

    return(
        <main className="bg-zinc-700">
            <Logo />
            <ul className="w-64 gap-0 flex flex-col items-stretch">
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