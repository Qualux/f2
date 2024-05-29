import { useState } from 'react';

const MediaUploader = () => {

    const [fileUrl, setFileUrl] = useState('');

    const openMediaLibrary = () => {

        const media = window.wp.media({
            title: 'Select or Upload Media',
            button: {
                text: 'Use this media'
            },
            multiple: false // Set to true to allow multiple files to be selected
        });

        media.on('select', () => {
            const attachment = media.state().get('selection').first().toJSON();
            setFileUrl(attachment.url);
        });

        media.open();

    };

    return (
        <div>
            <button onClick={openMediaLibrary}>Open Media Library</button>
            {fileUrl && (
                <div>
                    <h3>Selected Image:</h3>
                    <img src={fileUrl} alt="Selected" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );

};

export default MediaUploader;
