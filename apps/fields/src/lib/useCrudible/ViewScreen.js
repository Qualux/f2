import { useState, useEffect, Fragment } from 'react';

export default function ViewScreen({id, sdo, api}) {

    const [record, setRecord] = useState(null);

    useEffect( () => {
        console.log('fetching one...')
        
        async function fetchData() {
            const data = await api.getOne(id);
            setRecord(data.record);
        }
        fetchData(id)
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