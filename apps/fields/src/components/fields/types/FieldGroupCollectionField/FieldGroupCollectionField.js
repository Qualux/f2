import { createContext, useState, useContext } from 'react';
import { useRecordRelate } from '../../../../lib/useRecordRelate/useRecordRelate';
import fieldGroupSDO from '../../../../../../../data/sdo/field_group.json';

const FieldRecordRelateContext = createContext();

export default function FieldGroupCollectionField({field}) {

    const { 
        RecordRelateProviders, 
        SelectionList, 
        CreateButton,
        SelectExistingButton,
        RecordList,
    } = useRecordRelate( FieldRecordRelateContext );

    return(
        <main>
            <h2>
                Field Groups
            </h2>
            <RecordRelateProviders
                fieldName={field.field_name}
                sdo={fieldGroupSDO}
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