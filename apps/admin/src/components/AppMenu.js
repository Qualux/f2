import { NavLink } from "react-router-dom";

const itemClasses = ({ isActive, isPending }) => {

    const base  = "no-underline grow py-0.5 font-light text-lg focus:shadow-none focus:outline-none focus:text-neutral-500"
    const extra = isActive ? "text-neutral-500" : "!text-neutral-100 hover:!text-neutral-300"
    return base + ' ' + extra;
}

export default function AppMenu() {

    return(
        <main className="">
            <ul className="gap-4 flex m-0 p-0">
                <li className="flex items-center justify-stretch m-0 p-0">
                    <NavLink
                            to="/sdo"
                            className={itemClasses}
                            >
                            REGISTER
                    </NavLink>
                </li>
                <li className="flex items-center justify-stretch m-0 p-0">
                    <NavLink
                            to="/form"
                            className={itemClasses}
                            >
                            FORMS
                    </NavLink>
                </li>
                <li className="flex items-center justify-stretch m-0 p-0">
                    <NavLink
                            to="/grid"
                            className={itemClasses}
                            >
                            GRIDS
                    </NavLink>
                </li>
            </ul>
        </main>   
    )
}