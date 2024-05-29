import { useCrudible } from './useCrudible';

export default function Header( { routeType, primaryLink } ) {

    const { useSDO } = useCrudible();
    const sdo = useSDO();

    function leftCol() {

        if( routeType === 'create' ) {
            return(
                <div className="flex gap-5 items-center">
                    <h2 className="text-neutral-300 font-semibold text-lg">
                        CREATE
                    </h2>
                    {primaryLink}
                </div>
            )
        }

        if( routeType === 'edit' ) {
            return(
                <div className="flex gap-5 items-center">
                    <h2 className="text-neutral-300 font-semibold text-lg">
                        EDIT
                    </h2>
                    {primaryLink}
                </div>
            )
        }

        if( routeType === 'view' ) {
            return(
                <div className="flex gap-5 items-center">
                    <h2 className="text-neutral-300 font-semibold text-lg">
                        VIEW
                    </h2>
                    {primaryLink}
                </div>
            )
        }

        if( routeType === 'delete' ) {
            return(
                <div className="flex gap-5 items-center">
                    <h2 className="text-neutral-300 font-semibold text-lg">
                        DELETE
                    </h2>
                    {primaryLink}
                </div>
            )
        }

        return(
            <div className="flex gap-5 items-center">
                {primaryLink}
            </div>
        )

    }

    return(
        <div className="flex mb-6 items-center justify-between bg-neutral-700 text-neutral-200 py-3 px-3 shadow-sm">
            <div>
                {leftCol()}
            </div>
            <div className="flex gap-1 items-center">
                <svg className="w-5 h-5 stroke-neutral-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
                <p className="my-0 text-neutral-300 font-semibold text-sm">
                    {sdo.display_title}
                </p>
            </div>
        </div>
    );

}