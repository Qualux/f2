import { useState, useEffect, Fragment } from 'react';
import { useCrudible } from 'shared';
import { useStandardAPI } from 'shared';

export default function ViewScreen( {id} ) {

    const [record, setRecord] = useState(null);

    const { useSDO } = useCrudible();
    const sdo = useSDO();
    const API = useStandardAPI(sdo.route_base);

    useEffect( () => {
       
        async function fetchData( id, API ) {  
            const data = await API.getOne(id);
            setRecord(data.record);
        }
        fetchData( id, API );

    }, [])

    if( ! record ) {
        return(
            <main>
                Record {id} loading...
            </main>
        ) 
    }

    return (
        <main>
            <ul className="grid">
                {sdo.field_groups.map((fieldGroup) => (
                    fieldGroup.fields.map((field) => (
                        <Fragment key={field.name}>
                            <li>{field.title}</li>
                            <li>{record[field.name]}</li>
                        </Fragment>
                    ))
                ))}
            </ul>
        </main>
    );

}