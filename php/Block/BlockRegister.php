<?php 

namespace F3\Block;

class BlockRegister {

    function __construct() {

        add_action('init', [$this, 'register_dynamic_text_field_blocks']);

    }

    function register_dynamic_text_field_blocks() {

        /*
        wp_register_script(
            'f3-dynamic-text-field-block',
            get_template_directory_uri() . '/path/to/your/block.js',
            array('wp-blocks', 'wp-element', 'wp-editor'),
            filemtime(get_template_directory() . '/path/to/your/block.js')
        );
        */
    
        \register_block_type('f3/dynamic-text-field', array(
            //'editor_script' => 'f3-dynamic-text-field-block',
            'render_callback' => [ $this, 'render_dynamic_text_field_block' ],
            'attributes' => array(
                'content' => array(
                    'type' => 'string',
                    'source' => 'html',
                    'selector' => 'p',
                ),
                'selectedField' => array(
                    'type' => 'string',
                    'default' => 'test_field_1',
                ),
            ),
        ));

        \register_block_type('f3/dynamic-image-field', array(
            //'editor_script' => 'f3-dynamic-text-field-block',
            'render_callback' => [ $this, 'render_dynamic_image_field_block' ],
            'attributes' => array(
                'content' => array(
                    'type' => 'string',
                    'source' => 'html',
                    'selector' => 'p',
                ),
                'selectedField' => array(
                    'type' => 'string',
                    'default' => 'test_field_1',
                ),
            ),
        ));

    }

    function render_dynamic_text_field_block( $attributes, $content ) {

        $wrapper_attributes = \get_block_wrapper_attributes();
        $selected_field = isset($attributes['selectedField']) ? $attributes['selectedField'] : 'test_field_1';
        $content = isset($attributes['content']) ? $attributes['content'] : '';
    
        // Fetch dynamic value from post meta or any other source
        $dynamic_value = \get_post_meta(get_the_ID(), $selected_field, true);
    
        if (!$dynamic_value) {
            $dynamic_value = 'Default value or message if field is empty';
        }
    
        \ob_start(); ?>

        <div <?php echo $wrapper_attributes; ?>>
            <?php echo \esc_html($dynamic_value); ?>
        </div>

        <?php return \ob_get_clean();

    }    
    
    function render_dynamic_image_field_block( $attributes, $content ) {

        $wrapper_attributes = \get_block_wrapper_attributes();
        $selected_field = isset($attributes['selectedField']) ? $attributes['selectedField'] : 'test_field_1';
        $content = isset($attributes['content']) ? $attributes['content'] : '';
    
        // Fetch dynamic value from post meta or any other source
        $dynamic_value = \get_post_meta(get_the_ID(), $selected_field, true);
    
        if (!$dynamic_value) {
            $dynamic_value = 'Default value or message if field is empty';
        }
    
        \ob_start(); ?>

        <div <?php echo $wrapper_attributes; ?>>
            <?php echo \esc_html($dynamic_value); ?>
        </div>

        <?php return \ob_get_clean();

    } 

}