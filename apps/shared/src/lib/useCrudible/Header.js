import { useCrudible } from './useCrudible';

export default function Header( { routeType, primaryLink } ) {

    const { useSDO } = useCrudible();
    const sdo = useSDO();

    function leftCol() {

        if( routeType === 'create' ) {
            return(
                <div className="flex gap-5 items-center">
                    <h5 className="text-neutral-300 font-semibold text-lg m-0 p-0">
                        CREATE
                    </h5>
                    {primaryLink}
                </div>
            )
        }

        if( routeType === 'edit' ) {
            return(
                <div className="flex gap-5 items-center">
                    <h5 className="text-neutral-300 font-semibold text-lg m-0 p-0">
                        EDIT
                    </h5>
                    {primaryLink}
                </div>
            )
        }

        if( routeType === 'view' ) {
            return(
                <div className="flex gap-5 items-center">
                    <h5 className="text-neutral-300 font-semibold text-lg m-0 p-0">
                        VIEW
                    </h5>
                    {primaryLink}
                </div>
            )
        }

        if( routeType === 'delete' ) {
            return(
                <div className="flex gap-5 items-center">
                    <h2 className="text-neutral-300 font-semibold text-lg m-0 p-0">
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
        <div className="flex mb-6 items-center justify-between text-neutral-200 py-3">
            <div>
                {leftCol()}
            </div>
            <div className="flex gap-1 items-center">
                <p className="my-0 p-0 leading-snug text-neutral-500 font-light text-lg border-0 !border-l-2 border-solid border-white/10 pl-4">
                    {sdo.display_title}
                </p>
            </div>
        </div>
    );

}