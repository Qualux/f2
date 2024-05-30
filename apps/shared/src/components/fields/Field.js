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
import PostTypeSelectField from './types/PostTypeSelectField/PostTypeSelectField';
import RadioGroupField from './types/RadioGroupField/RadioGroupField';
import RangeField from './types/RangeField/RangeField';
import SearchableSelectField from './types/SearchableSelectField/SearchableSelectField';
import SelectField from './types/SelectField/SelectField';
import TextAreaField from './types/TextAreaField/TextAreaField';
import TextField from './types/TextField/TextField';
import TrueFalseField from './types/TrueFalseField/TrueFalseField';
import UrlField from './types/UrlField/UrlField';
import TaxonomySelectField from './types/TaxonomySelectField/TaxonomySelectField';

export default function Field( 
        {
            field
        }) {

    switch( field.type ) {
        case 'text': 
            return <TextField field={field}/> 
            break
        case 'textarea': 
            return <TextAreaField field={field}/> 
            break
        case 'select':
            return <SelectField field={field}/>
            break;
        case 'checkbox':
            return <CheckboxField field={field}/>
            break;
        case 'true_false':
            return <TrueFalseField field={field}/>
            break;
        case 'searchable_select':
            return <SearchableSelectField field={field}/>
            break;
        case 'number':
            return <NumberField field={field}/>;
            break;
        case 'range':
            return <RangeField field={field}/>;
            break;
        case 'email':
            return <EmailField field={field}/>
            break;
        case 'url':
            return <UrlField field={field}/>
            break;
        case 'collection':
            return <CollectionField field={field}/>
            break;
        case 'post_collection':
            return <PostCollectionField field={field}/>
            break;
        case 'post_type_select':
            return <PostTypeSelectField field={field}/>
            break;
        case 'radio_group':
            return <RadioGroupField field={field}/>
            break;
        case 'image':
            return <ImageField field={field}/>
            break;
        case 'file':
            return <FileField field={field}/>
            break;
        case 'field_group_collection':
            return <FieldGroupCollectionField field={field} />
            break;
        case 'field_collection':
            return <FieldCollectionField field={field} />
            break;
        case 'taxonomy_select':
            return <TaxonomySelectField field={field} />
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