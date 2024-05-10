export default function GridCol( { column, record } ) {

    console.log(record)

    if(column.columnKey === 'controls') {

        return (
            <div>
                CONTROLS
            </div>
        );

    }

    let value = record[column.recordKey];

    if( typeof value === 'object' ) {
        value = '';
    }
    
    return(
        <div className="font-medium text-xs px-2 py-1">
            {value}
        </div>
    );

}