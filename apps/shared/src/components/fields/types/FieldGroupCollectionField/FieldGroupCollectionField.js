import { createContext, useState, useContext } from 'react';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';
import { useRecordRelate } from '../../../../lib/useRecordRelate/useRecordRelate';
import fieldGroupSDO from '../../../../../../../data/sdo/field_group.json';

export default function FieldGroupCollectionField( { field } ) {

    const { useFieldRenderContext } = useFormManager();
    const fieldRenderData = useFieldRenderContext();

    console.log('FieldGroupCollectionField: fieldRenderData from useFieldRenderContext:', fieldRenderData)

    const registerName = fieldRenderData.registerPrefix ? `${fieldRenderData.registerPrefix}.${field.name}` : field.name;

    const { 
        RecordRelateProviders, 
        SelectionList, 
        CreateButton,
        SelectExistingButton,
        RecordList,
        ModeButtons,
        Container,
        Body,
    } = useRecordRelate();

    return(
        <main>
            <h2>
                Field Groups
            </h2>
            <RecordRelateProviders
                fieldName={registerName}
                sdo={fieldGroupSDO}
            >
                <Container>
                    <header>
                         <h2 className="text-neutral-500 font-medium text-base">
                            Field Groups
                        </h2>
                    </header>
                    <Body>
                        <SelectionList />
                        <RecordList />
                    </Body>
                    <ModeButtons>
                        <CreateButton />
                        <SelectExistingButton />
                    </ModeButtons>
                </Container>
            </RecordRelateProviders>
        </main>
        
    );

}