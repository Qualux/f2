import { NavLink } from "react-router-dom";

export default function Menu() {
    return(
        <ul className="bg-zinc-100 p-8">
            <li>
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "bg-sky-800 text-white" : ""
                    }
                    >
                    DASHBOARD
                </NavLink>
                
            </li>
            <li>
                <NavLink
                        to="/fields"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "bg-sky-800 text-white" : ""
                        }
                        >
                        FIELDS
                </NavLink>
            </li>
            <li>
                <NavLink
                        to="/groups"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "bg-sky-800 text-white" : ""
                        }
                        >
                        GROUPS
                </NavLink>
            </li>
            <li>
                FORMS
            </li>
            <li>
                SETTINGS
            </li>
        </ul>
    )
}