import Controls from './Controls';

export default function GridCol( { column, record, routes } ) {

    if(column.columnKey === 'controls') {

        return (
            <Controls 
                routes={routes} 
                record={record}
            />
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