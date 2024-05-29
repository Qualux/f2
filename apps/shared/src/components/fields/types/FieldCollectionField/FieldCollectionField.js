import { createContext } from 'react';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';
import { useRecordRelate } from '../../../../lib/useRecordRelate/useRecordRelate';
import fieldSDO from '../../../../../../../data/sdo/field.json';

const FieldGroupRecordRelateContext = createContext();

export default function FieldCollectionField( { field } ) {

    const { makeValidationObject, useFormContext, useFieldRenderContext } = useFormManager();
    const fieldRenderData = useFieldRenderContext();
    const registerName = fieldRenderData.registerPrefix ? `${fieldRenderData.registerPrefix}.${field.name}` : field.name;

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
                fieldName={registerName}
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