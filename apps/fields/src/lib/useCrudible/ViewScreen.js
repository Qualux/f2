import { useState, useEffect } from 'react';

export default function ViewScreen({id, sdo, api}) {

    const [record, setRecord] = useState(null);

    useEffect(() => {
        console.log('fetching one...')
        const data = api.getOne(id);
        setRecord(data);
    }, [])

    if(!record) {
        <main>
            Record {id} loading...
        </main>
    }

    return(
        <main>
            <h2>VS COMPED</h2>
            <div>{id}</div>
        </main>
    );

}