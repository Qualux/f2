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
        <div className="text-sm px-2 py-1 text-neutral-300">
            {value}
        </div>
    );

}