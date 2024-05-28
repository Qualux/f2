/*
 * Field handles rendering of a field. 
 * Field does not check conditions for rendering, it is up to the parent component to use React Hook Form to watch conditional values.
 */ 

import CheckboxField from './types/CheckboxField/CheckboxField';
import CollectionField from './types/CollectionField/CollectionField';
import EmailField from './types/EmailField/EmailField';
import FieldCollectionField from './types/FieldCollectionField/FieldCollectionField';
import FieldGroupCollectionField from './types/FieldGroupCollectionField/FieldGroupCollectionField';
import FileField from './types/FileField/FileField';
import ImageField from './types/ImageField/ImageField';
import NumberField from './types/NumberField/NumberField';
import PostCollectionField from './types/PostCollectionField/PostCollectionField';
import RadioGroupField from './types/RadioGroupField/RadioGroupField';
import RangeField from './types/RangeField/RangeField';
import SearchableSelectField from './types/SearchableSelectField/SearchableSelectField';
import SelectField from './types/SelectField/SelectField';
import TextAreaField from './types/TextAreaField/TextAreaField';
import TextField from './types/TextField/TextField';
import TrueFalseField from './types/TrueFalseField/TrueFalseField';
import UrlField from './types/UrlField/UrlField';

export default function Field( 
        {
            field, 
            register, 
            errors, 
            getValues, 
            setValue, 
            valuesInit, 
            control, 
            value,
            fieldRegisterPrefix = ''
        }) {

    switch( field.type ) {
        case 'text': 
            return (
                <TextField 
                    field={field} 
                    register={register} 
                    errors={errors} 
                    value={value}
                    fieldRegisterPrefix={fieldRegisterPrefix}
                /> 
            )
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
            return(
                <TrueFalseField 
                    field={field} 
                    register={register} 
                    errors={errors} 
                    setValue={setValue} 
                    getValues={getValues} 
                    valuesInit={valuesInit} 
                    value={value}
                />
            )
            break;
        case 'searchable_select':
            return <SearchableSelectField field={field} register={register} errors={errors} control={control} />
            break;
        case 'number':
            return <NumberField field={field} register={register} errors={errors} fieldRegisterPrefix={fieldRegisterPrefix} />;
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
            return <PostCollectionField field={field} register={register} errors={errors} setValue={setValue} getValues={getValues} valuesInit={valuesInit} fieldRegisterPrefix={fieldRegisterPrefix} />
            break;
        case 'radio_group':
            return <RadioGroupField field={field} register={register} errors={errors} setValue={setValue} getValues={getValues} valuesInit={valuesInit} fieldRegisterPrefix={fieldRegisterPrefix} />
            break;
        case 'image':
            return <ImageField field={field} register={register} errors={errors} setValue={setValue} getValues={getValues} valuesInit={valuesInit} />
            break;
        case 'file':
            return <FileField field={field} register={register} errors={errors} setValue={setValue} getValues={getValues} valuesInit={valuesInit} />
            break;
        case 'field_group_collection':
            return <FieldGroupCollectionField field={field} />
            break;
        case 'field_collection':
            return <FieldCollectionField field={field} />
            break;
        default:
            return(
                <p className="my-8">
                    Invalid or missing field type. {field.type}
                </p> 
            )
            break;
    }

}