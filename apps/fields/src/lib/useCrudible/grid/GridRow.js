import DeleteButton from '../DeleteButton';
import GridCol from './GridCol';

export default function GridRow({record, index, routes, columns}) {

    return(
        <>
            {columns.map( ( column, index ) =>
                <GridCol
                    key={index}
                    column={column}
                    record={record}
                />
            )}            
        </>
    );

}