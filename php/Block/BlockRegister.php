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

        \register_block_type('f3/query', array(
            //'editor_script' => 'f3-dynamic-text-field-block',
            'render_callback' => [ $this, 'render_query_block' ],
            'attributes' => array(
                'queryPostId' => array(
                    'type' => 'string',
                ),
            ),
        ));

    }

    function render_query_block( $attributes, $content, $block ) {
        $wrapper_attributes = \get_block_wrapper_attributes();
        $query_post_id = isset($attributes['queryPostId']) ? $attributes['queryPostId'] : '';
    
        // Define WP_Query arguments
        $args = array(
            'post_type' => 'ticket',
            'posts_per_page' => 10,
        );
    
        // Perform the query
        $query = new \WP_Query($args);
    
        // Start the output buffer
        \ob_start(); ?>
    
        <div <?php echo $wrapper_attributes; ?>>
            QUERY BLOCK RENDER TEST 123 <?php echo $query_post_id; ?>
            <ul>
                <?php if ($query->have_posts()) : ?>
                    <?php while ($query->have_posts()) : $query->the_post(); ?>
                        <?php
                        // Set up post data for the current post
                        global $post;
                        $post = get_post();
                        setup_postdata($post);
    
                        // Prepare context for inner blocks
                        $context = array(
                            'postId' => $post->ID,
                            'postType' => $post->post_type,
                        );
    
                        // Loop through the inner blocks and render them
                        if ( ! empty( $block->parsed_block['innerBlocks'] ) ) {

                            foreach ( $block->parsed_block['innerBlocks'] as $inner_block ) {


                                // Manually render the inner block using its attributes and context
                                $inner_block_instance = new \WP_Block( $inner_block, $context );


                                echo $inner_block_instance->render();
                            }
                        }
                        ?>
                    <?php endwhile; ?>
                    <?php \wp_reset_postdata(); ?>
                <?php else : ?>
                    <li><?php _e('No posts found', 'f3'); ?></li>
                <?php endif; ?>
            </ul>
        </div>
    
        <?php return \ob_get_clean();
    }    
      

}