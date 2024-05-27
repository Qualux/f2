import { createContext, useState, useContext } from 'react';
import { useRecordRelate } from '../../../../lib/useRecordRelate/useRecordRelate';
import fieldSDO from '../../../../../../../data/sdo/field.json';

const FieldGroupRecordRelateContext = createContext();

export default function FieldCollectionField({field}) {

    const { 
        RecordRelateProviders, 
        SelectionList, 
        CreateButton,
        SelectExistingButton,
        RecordList,
    } = useRecordRelate( FieldGroupRecordRelateContext );

    return(
        <main>
            <h2>
                Fields
            </h2>
            <RecordRelateProviders
                fieldName={field.name}
                sdo={fieldSDO}
            >
                <main>
                    <div className="flex items-center gap-px">
                        <CreateButton />
                        <SelectExistingButton />
                    </div>
                    <section className="flex gap-px bg-neutral-800 text-neutral-100">
                        <SelectionList />
                        <RecordList />
                    </section>
                </main>
            </RecordRelateProviders>
        </main>
        
    );

}