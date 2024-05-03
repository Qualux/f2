import systemFieldsJson from '../../data/system_fields.json';
import TextField from './types/TextField';
import TextAreaField from './types/TextAreaField';
import SelectField from './types/SelectField';
import TrueFalseField from './types/TrueFalseField/TrueFalseField';
import EmailField from './types/EmailField';
import UrlField from './types/UrlField';
import CollectionField from './types/CollectionField/CollectionField';
import NumberField from './types/NumberField';
import RangeField from './types/RangeField/RangeField';
import PostCollectionField from './types/PostCollectionField/PostCollectionField';
import SearchableSelectField from './types/SearchableSelectField/SearchableSelectField';
import CheckboxField from './types/CheckboxField/CheckboxField';
import RadioGroupField from './types/RadioGroupField/RadioGroupField';
import ImageField from './types/ImageField/ImageField';
import FileField from './types/FileField/FileField';

function fieldDefinitionTypeCheck(field) {
    if (typeof field === 'object') {
        return 'object';
    } else if (typeof field === 'string') {
        return 'string';
    console.log('Variable "field" is a string.');
    } else {
        return 'invalid';
    }
}

export default function Field( {field:fieldReference, register, errors, getValues, setValue, valuesInit, control} ) {

    let field = fieldReference;
    const fieldDefinitionType = fieldDefinitionTypeCheck( fieldReference );
    if( fieldDefinitionType === 'string' ) {
        field = systemFieldsJson[fieldReference];
    }

    console.log(field)

    if( Object.hasOwn( field, 'field_conditions') && field.field_conditions === true ) {
        console.log('field has conditions:')
        console.log(field)
        if( Object.hasOwn( field, 'field_condition_rules') && field.field_condition_rules instanceof Array ) {
            console.log('has defined array conditions')
            field.field_condition_rules.forEach((crg, i) => {
                console.log(crg)
                const cr = crg[0];
                const value = getValues(cr.field);
                console.log(value)
            }) 
        }
        return null;
    }

    switch( field.field_type ) {
        case 'text': 
            return <TextField field={field} register={register} errors={errors} /> 
            break
        case 'textarea': 
            return <TextAreaField field={field} register={register} errors={errors} /> 
            break
        case 'select':
            return <SelectField field={field} register={register} errors={errors} />
            break;
        case 'checkbox':
            return <CheckboxField field={field} register={register} errors={errors} />
            break;
        case 'true_false':
            return <TrueFalseField field={field} register={register} errors={errors} setValue={setValue} getValues={getValues} valuesInit={valuesInit} />
            break;
        case 'searchable_select':
            return <SearchableSelectField field={field} register={register} errors={errors} control={control} />
            break;
        case 'number':
            return <NumberField field={field} register={register} errors={errors} />;
            break;
        case 'range':
            return <RangeField field={field} register={register} errors={errors} />;
            break;
        case 'email':
            return <EmailField field={field} register={register} errors={errors} />
            break;
        case 'url':
            return <UrlField field={field} register={register} errors={errors} />
            break;
        case 'collection':
            return <CollectionField field={field} register={register} errors={errors} setValue={setValue} getValues={getValues} valuesInit={valuesInit} />
            break;
        case 'post_collection':
            return <PostCollectionField field={field} register={register} errors={errors} setValue={setValue} getValues={getValues} valuesInit={valuesInit} />
            break;
        case 'radio_group':
            return <RadioGroupField field={field} register={register} errors={errors} setValue={setValue} getValues={getValues} valuesInit={valuesInit} />
            break;
        case 'image':
            return <ImageField field={field} register={register} errors={errors} setValue={setValue} getValues={getValues} valuesInit={valuesInit} />
            break;
        case 'file':
            return <FileField field={field} register={register} errors={errors} setValue={setValue} getValues={getValues} valuesInit={valuesInit} />
            break;
        default:
            return(
                <p className="my-8">
                    Invalid or missing field type. {field.field_type}
                </p> 
            )
            break;
    }

}