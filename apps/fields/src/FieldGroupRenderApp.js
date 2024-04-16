import { useState, useEffect } from 'react';
import { useFieldGroup } from './lib/useFieldGroup';
import Field from './components/fields/Field';
import { useForm } from "react-hook-form";
import { useFetch } from './lib/useFetch';

const CompleteScreen = () => {

    return(
        <main>
            <h2>
                Congrats the form is saved.
            </h2>
            <p>
                Message here from response...
            </p>
        </main>
    )
}

function Render( {fieldGroupId, postId} ) {

    const [complete, setComplete] = useState(false);
    const { fieldGroup, isLoaded } = useFieldGroup( fieldGroupId, postId );
    const { postData } = useFetch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue, 
        getValues,
    } = useForm();

    useEffect(() => {
        if (isLoaded && fieldGroup) {

            console.log('fieldGroup.values:')
            console.log(fieldGroup.values)

            reset(fieldGroup.values);
        }
    }, [isLoaded, fieldGroup, reset]);

    const onSubmit = (data) => {

        console.log('submit data:')
        console.log(data)

        let postId;
        try {
            if (window.wp !== 'undefined') {
                const { select } = window.wp.data;
                postId = select('core/editor').getCurrentPostId();
            } else {
                console.error('wp is undefined. Check if it is properly loaded in your environment.');
            }
        } catch (error) {
            console.error('An error occurred while accessing wp:', error);
        }

        if (!postId) {
            console.error('Error: Post ID not found.');
            return;
        }

        const preparedData = {
            post_id: postId,
            post_type: 'page',
            values: data
        }

        const url = 'http://zero1.local/wp-json/zero/v1/field-group/values/'+fieldGroupId;
        postData(url, preparedData).then((data) => {
            console.log('values save resp:')
            console.log(data)
            //setCreatedFieldData(data);
            //setComplete(true);
        });

    }

    if( complete ) {
        return <CompleteScreen />
    }

    if( !isLoaded ) {
        return(
            <main>Field group loading...</main>
        )
    }

    return(
        <main>
            {fieldGroup.id} {fieldGroup.title}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {fieldGroup.fields_numeric.map( ( field, index ) =>
                        <div key={index} className="my-6">
                            <Field field={field} register={register} />
                        </div>
                    )}
                </div>
                <div>
                    <button 
                        className="bg-sky-700 text-white py-2 px-12 font-semibold hover:bg-sky-800"
                    >
                        SAVE FORM
                    </button>
                </div>
            </form>
        </main>
    )

}

export default function FieldGroupRenderApp( {fieldGroupId} ) {
    const [postId, setPostId] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = window.wp.data.select('core/editor').getCurrentPostId();

            console.log('id: ' + id);

            if (id) {
                clearInterval(interval); // Stop the interval
                setPostId(id);
            }
        }, 1000); // Check every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    if (!postId) {
        return (
            <main>Waiting for postId...</main>
        );
    }

    return <Render fieldGroupId={fieldGroupId} postId={postId} />;
}