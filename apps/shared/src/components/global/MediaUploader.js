const MediaUploader = ( { onSelect } ) => {

    const openMediaLibrary = () => {

        const media = window.wp.media({
            title: 'Select or Upload Media',
            button: {
                text: 'Use this media'
            },
            multiple: false
        });

        media.on('select', () => {
            const attachment = media.state().get('selection').first().toJSON();
            onSelect(attachment.id);
        });

        media.open();

    };

    return (
        <div>
            <button type="button" onClick={openMediaLibrary}>Open Media Library</button>
        </div>
    );

};

export default MediaUploader;
