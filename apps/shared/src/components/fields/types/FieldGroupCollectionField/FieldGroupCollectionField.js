import { createContext, useState, useContext } from 'react';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';
import { useRecordRelate } from '../../../../lib/useRecordRelate/useRecordRelate';
import fieldGroupSDO from '../../../../../../../data/sdo/field_group.json';

const FieldRecordRelateContext = createContext();

export default function FieldGroupCollectionField( { field } ) {

    const { makeValidationObject, useFormContext, useFieldRenderContext } = useFormManager();
    const fieldRenderData = useFieldRenderContext();
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
    } = useRecordRelate( FieldRecordRelateContext );

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
                    <ModeButtons>
                        <CreateButton />
                        <SelectExistingButton />
                    </ModeButtons>
                    <Body>
                        <SelectionList />
                        <RecordList />
                    </Body>
                </Container>
            </RecordRelateProviders>
        </main>
        
    );

}