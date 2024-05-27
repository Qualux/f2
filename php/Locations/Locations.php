<?php 

/*
 * Locations 
 * 
 * Detects if F3 Forms are assigned to an admin location.
 * 
 */

namespace F3\Locations;
use F3\Metabox\Metabox;

class Locations {

    public function __construct() {

        add_action('current_screen', [$this, 'run_location_check']);

    }

    public function run_location_check() {

        $screen = get_current_screen();

        // Check for F3 options page.
        if (strpos($screen->base, 'toplevel_page_') === 0) {

            $slug = substr($screen->base, strlen('toplevel_page_'));

            $options_page_posts = get_posts([
                'post_type'   => 'f3-options-page',
                'numberposts' => -1,
                'meta_query' => [
                    [
                        'key'     => 'page_slug',
                        'value'   => $slug,
                        'compare' => '=',
                    ]
                ]
            ]);

            if( empty( $options_page_posts )) { return; }

            $this->handle_options_page( $screen );

        }


        // Check for post editor or Gutenberg editor
        if ($screen->is_block_editor) {
            // This is a post editor screen
            $this->handle_block_editor( $screen );
        }

        if ($screen->base === 'post' || $screen->base === 'edit') {
            // This is a post editor screen
            $this->handle_post_editor( $screen );
        }

        // Check for taxonomy editor
        if ($screen->base === 'edit-tags') {
            $this->handle_term_add( $screen );
        }

        // Check for term editor
        if ($screen->base === 'term') {
            $this->handle_term_edit( $screen );
        }

        if ( $screen->base === 'user' ) {
            $this->handle_user_add( $screen );
        }

        if ( $screen->base === 'user-edit' ) {
            $this->handle_user_edit( $screen );
        }

    }

    function handle_block_editor( $screen ) {

        $post_type = $screen->post_type;

        $form_posts = get_posts([
            'post_type'   => 'f3-form',
            'numberposts' => -1,
            'meta_query' => [
                [
                    'key'     => 'admin_location',
                    'value'   => 'post_type',
                    'compare' => '=',
                ]
            ]
        ]);

        if( empty( $form_posts )) { return; }

        foreach( $form_posts as $form_post ) {

            add_action('add_meta_boxes', function($post_type) use ($form_post) {

                add_meta_box( 
                    'f3_metabox_form_' . $form_post->ID, 
                    $form_post->post_title, 
                    function( $post, $box ) {
                        $form_id = $box['args']['form_id'];
                        echo '<div class="f3-form" data-form="'.$form_id.'"></div>';
                    }, 
                    $post_type, 
                    'advanced', 
                    'default',
                    [ 'form_id' => $form_post->ID ],
                );
            });

        }

    }

    function handle_post_editor( $screen ) {

        $post_type = $screen->post_type;

        $form_posts = get_posts([
            'post_type'   => 'f3-form',
            'numberposts' => -1,
            'meta_query' => [
                [
                    'key'     => 'admin_location',
                    'value'   => 'post_type',
                    'compare' => '=',
                ]
            ]
        ]);

        if( empty( $form_posts )) { return; }

        foreach( $form_posts as $form_post ) {

            add_action('add_meta_boxes', function($post_type) use ($form_post) {

                add_meta_box( 
                    'f3_metabox_form_' . $form_post->ID, 
                    $form_post->post_title, 
                    function( $post, $box ) {
                        $form_id = $box['args']['form_id'];
                        echo '<div class="f3-form" data-form="'.$form_id.'"></div>';
                    }, 
                    $post_type, 
                    'advanced', 
                    'default',
                    [ 'form_id' => $form_post->ID ],
                );
            });

        }

    }

    /* Taxonomy Locations. */

    function handle_term_add( $screen ) {

        $form_posts = get_posts([
            'post_type'   => 'f3-form',
            'numberposts' => -1,
            'meta_query' => [
                [
                    'key'     => 'admin_location',
                    'value'   => 'taxonomy',
                    'compare' => '=',
                ]
            ]
        ]);

        if( empty( $form_posts )) { return; }

        add_action( $screen->taxonomy.'_add_form_fields', function( $taxonomy ) use ($form_posts) {

            foreach( $form_posts as $form_post ) {

                echo '<div class="f3-form" data-form="'.$form_post->ID.'"></div>';

            }

        });

    }

    function handle_term_edit( $screen ) {

        $form_posts = get_posts([
            'post_type'   => 'f3-form',
            'numberposts' => -1,
            'meta_query' => [
                [
                    'key'     => 'admin_location',
                    'value'   => 'taxonomy',
                    'compare' => '=',
                ]
            ]
        ]);

        if( empty( $form_posts )) { return; }

        add_action( $screen->taxonomy.'_edit_form_fields', function( $taxonomy ) use ($form_posts) {

            foreach( $form_posts as $form_post ) {
                echo '
                    <tr class="form-field term-description-wrap">
                        <th scope="row"></th>
                        <td>
                            <div class="f3-form" data-form="'.$form_post->ID.'"></div>
                        </td>
                    </tr>
                ';
            }

        });

    }

    function handle_user_add( $screen ) {
    
        $form_posts = get_posts([
            'post_type'   => 'f3-form',
            'numberposts' => -1,
            'meta_query' => [
                [
                    'key'     => 'admin_location',
                    'value'   => 'user',
                    'compare' => '=',
                ]
            ]
        ]);

        if( empty( $form_posts )) { return; }

        add_action( 'user_new_form', function( $user ) use ($form_posts) {

            error_log('Doing edit_user_profile hook...');

            foreach( $form_posts as $form_post ) {
                echo '<div class="f3-form" data-form="'.$form_post->ID.'"></div>';
            }

        });

    }

    function handle_user_edit( $screen ) {
    
        $form_posts = get_posts([
            'post_type'   => 'f3-form',
            'numberposts' => -1,
            'meta_query' => [
                [
                    'key'     => 'admin_location',
                    'value'   => 'user',
                    'compare' => '=',
                ]
            ]
        ]);

        if( empty( $form_posts )) { return; }

        add_action( 'edit_user_profile', function( $user ) use ( $form_posts ) {

            foreach( $form_posts as $form_post ) {
                echo '<div class="f3-form" data-form="'.$form_post->ID.'"></div>';
            }

        });

    }

    function handle_options_page( $screen ) {

        $form_posts = get_posts([
            'post_type'   => 'f3-form',
            'numberposts' => -1,
            'meta_query' => [
                [
                    'key'     => 'admin_location',
                    'value'   => 'options_page',
                    'compare' => '=',
                ]
            ]
        ]);

        if( empty( $form_posts )) { return; }

        add_action( 'f3_options_page_render', function( $options_page_id ) use ( $form_posts ) {

            foreach( $form_posts as $form_post ) {
                echo '<div class="f3-form" data-form="'.$form_post->ID.'"></div>';
            }

        });

    }

}