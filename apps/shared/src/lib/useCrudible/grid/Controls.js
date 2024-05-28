import DeleteButton from '../DeleteButton';

export default function Controls( {record, routes, viewLink, editLink} ) {
    
    return(
        <div className="flex justify-end grow gap-3 items-center">
            {viewLink}
            {editLink}
            <DeleteButton field={record} route={routes.delete} />
        </div>
    );

}