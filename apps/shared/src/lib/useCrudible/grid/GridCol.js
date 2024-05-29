export default function GridCol( { column, record, controls } ) {

    if(column.columnKey === 'controls') {

        return (
            <div className="flex items-center gap-2 justify-end">
                {controls( record.id )}
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