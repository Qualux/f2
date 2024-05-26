import { useState, useEffect, Fragment } from 'react';
import { useCrudible } from './useCrudible';
import { SDO_StandardAPI } from '../../api/SDO_StandardAPI';

export default function ViewScreen( {id} ) {

    const [record, setRecord] = useState(null);

    const { useSDO } = useCrudible();
    const sdo = useSDO();

    // Setup API.
    const api = SDO_StandardAPI;
    api.route_base = sdo.route_base;

    useEffect( () => {
       
        async function fetchData( id, api ) {
            
            const data = await api.getOne(id);
            setRecord(data.record);
        }
        fetchData( id, api );

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