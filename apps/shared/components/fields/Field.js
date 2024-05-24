/*
 * Field handles rendering of a field. 
 * Field does not check conditions for rendering, it is up to the parent component to use React Hook Form to watch conditional values.
 */ 

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

export default function Field( 
        {
            field, 
            register, 
            errors, 
            getValues, 
            setValue, 
            valuesInit, 
            control, 
            value
        }) {

    switch( field.field_type ) {
        case 'text': 
            return (
                <TextField 
                    field={field} 
                    register={register} 
                    errors={errors} 
                    value={value}
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