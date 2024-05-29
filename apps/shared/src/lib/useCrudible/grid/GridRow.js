import { useCrudible } from '../useCrudible';
import GridCol from './GridCol';

export default function GridRow({record, routes, columns, controls}) {

    return(
        <>
            {columns.map( ( column, index ) =>
                <GridCol
                    key={index}
                    column={column}
                    record={record}
                    routes={routes}
                    controls={controls}
                />
            )}            
        </>
    );

}