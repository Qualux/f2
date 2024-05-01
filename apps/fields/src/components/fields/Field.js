import Label from './Label';
import TextField from './types/TextField';
import TextAreaField from './types/TextAreaField';
import SelectField from './types/SelectField';
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

export default function Field( {field, register, errors, getValues, setValue, valuesInit, control} ) {

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
        default:
            return(
                <p className="my-8">
                    Invalid or missing field type. {field.field_type}
                </p> 
            )
            break;
    }

}