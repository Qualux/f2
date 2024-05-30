/*
 *
 * Post Type Select Field
 * 
 * Renders an HTML5 select. Populates with list of all public WP post types.
 *
 */

const { useEffect, useState } = wp.element;
import Label from '../../Label';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';
import WordPressAPI from '../../../../api/WordPressAPI';

export default function PostTypeSelectField({ field }) {

    const { makeValidationObject, useFormContext, useFieldRenderContext } = useFormManager();
    const { register, getFieldState } = useFormContext();
    const validators = makeValidationObject(field);
    const fieldState = getFieldState( field.name );
    const fieldRenderData = useFieldRenderContext();
    const registerName = fieldRenderData.registerPrefix ? `${fieldRenderData.registerPrefix}.${field.name}` : field.name;

    const [postTypes, setPostTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const wpAPI = new WordPressAPI();

        wpAPI.getPostTypes()
            .then(types => {

                const typesArray = Object.entries(types).map(([key, value]) => ({ slug: key, name: value.name }));

                console.log(typesArray)

                setPostTypes(typesArray);
                setLoading(false);

            })
            .catch(error => {
                console.error('Error fetching post types:', error);
                setLoading(false);
            });

    }, []);

    return (
        <div className="my-4">
            <Label text={field.label} />
            <select 
                id={field.name} 
                name={field.name} 
                disabled={loading} 
                className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                {...register(registerName, validators)}
            >
                {loading ? (
                    <option>Loading...</option>
                ) : (
                    postTypes.map(type => (
                        <option key={type.slug} value={type.slug}>{type.name}</option>
                    ))
                )}
            </select>
            {fieldState.invalid && <span className="text-rose-700 text-sm font-bold">{fieldState.error?.message || 'Field has errors'}</span>}
        </div>
    );
}
