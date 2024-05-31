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
        ModeButtons,
        Container,
        Body,
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