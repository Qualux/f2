import { useState, useEffect, Fragment } from 'react';
import { useCrudible } from './useCrudible';
import { SDO_StandardAPI } from '../../api/SDO_StandardAPI';

export default function ViewScreen( {id} ) {

    const [record, setRecord] = useState(null);

    const { useSDO } = useCrudible();
    const sdo = useSDO();

    console.log('sdo in view screen:')
    console.log(sdo)

    // Setup API.
    const api = SDO_StandardAPI;
    api.routeBase = sdo.routeBase;

    useEffect( () => {
       
        async function fetchData( id, api ) {
            
            const data = await api.getOne(id);
            setRecord(data.record);
        }
        fetchData( id, api );

    }, [])

    console.log(record)

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
                        <Fragment key={field.field_name}>
                            <li>{field.field_title}</li>
                            <li>{record[field.field_name]}</li>
                        </Fragment>
                    ))
                ))}
            </ul>
        </main>
    );

}