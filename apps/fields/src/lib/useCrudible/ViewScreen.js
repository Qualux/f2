import { useState, useEffect } from 'react';

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

    return(
        <main>
            <h2>VS COMPED</h2>
            <div>{id}</div>
            <h2>
                {record.title}
            </h2>
        </main>
    );

}