<?php 

/*
 * Locations PHP Class
 * 
 * FQCN: F3\Locations\Locations
 * 
 * Detects if F3 Forms are assigned to an admin location.
 * Refines query to detect if current object type matches F3 form assignment.
 * Renders .f3-form DOM element to trigger field rendering with F3 React Render App.
 * Registers metaboxes for post type matches. 
 * Adds fields through WP core hooks for taxonomy and user forms. 
 * Handles matching F3 options pages using $screen object provided by WP core admin. 
 * 
 */

namespace F3\Locations;

class Locations {

    public function __construct() {

        add_action('current_screen', [$this, 'run_location_check']);

    }

    public function run_location_check() {

        $screen = get_current_screen();

        // Check for F3 options page.
        if ( strpos($screen->base, 'toplevel_page_' ) === 0 ) {

            // Isolate the page slug.
            $slug = substr( $screen->base, strlen('toplevel_page_' ));

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

            $this->handle_options_page( $screen, $options_page_posts[0]->ID );

        }


        // Check for post editor or Gutenberg editor
        if ( $screen->is_block_editor ) {
            $this->handle_block_editor( $screen );
        }

        if ($screen->base === 'post' || $screen->base === 'edit') {
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

        $form_posts = $this->forms_refinement_query( 'post_type', 'admin_location_post_type', $post_type );

        if( empty( $form_posts )) { return; }

        foreach( $form_posts as $form_post ) {

            add_action('add_meta_boxes', function( $post_type ) use ( $form_post ) {

                $this->metabox( $form_post );

            });

        }

    }

    function handle_post_editor( $screen ) {

        $post_type = $screen->post_type;

        $form_posts = $this->forms_refinement_query( 'post_type', 'admin_location_post_type', $post_type );

        if( empty( $form_posts )) { return; }

        foreach( $form_posts as $form_post ) {

            add_action('add_meta_boxes', function($post_type) use ($form_post) {

                $this->metabox( $form_post );

            });

        }

    }

    /* Taxonomy Locations. */

    function handle_term_add( $screen ) {

        $form_posts = $this->forms_refinement_query( 'taxonomy', 'admin_location_taxonomy', $screen->taxonomy );

        if( empty( $form_posts )) { return; }

        add_action( $screen->taxonomy.'_add_form_fields', function( $taxonomy ) use ($form_posts) {

            foreach( $form_posts as $form_post ) {

                echo '<div class="f3-form" data-form="'.$form_post->ID.'" data-location="term"></div>';

            }

        });

    }

    function handle_term_edit( $screen ) {

        $form_posts = $this->forms_refinement_query( 'taxonomy', 'admin_location_taxonomy', $screen->taxonomy );

        if( empty( $form_posts )) { return; }

        add_action( $screen->taxonomy.'_edit_form_fields', function( $taxonomy ) use ($form_posts) {

            foreach( $form_posts as $form_post ) {
                echo '
                    <tr class="form-field term-description-wrap">
                        <th scope="row"></th>
                        <td>
                            <div class="f3-form" data-form="'.$form_post->ID.'" data-location="term"></div>
                        </td>
                    </tr>
                ';
            }

        });

    }

    function handle_user_add( $screen ) {
    
        $form_posts = $this->forms_user_query();

        if( empty( $form_posts )) { return; }

        add_action( 'user_new_form', function( $user ) use ($form_posts) {

            foreach( $form_posts as $form_post ) {
                echo '<div class="f3-form" data-form="'.$form_post->ID.'" data-location="user"></div>';
            }

        });

    }

    function handle_user_edit( $screen ) {
    
        $form_posts = $this->forms_user_query();

        if( empty( $form_posts )) { return; }

        add_action( 'edit_user_profile', function( $user ) use ( $form_posts ) {

            foreach( $form_posts as $form_post ) {
                echo '<div class="f3-form" data-form="'.$form_post->ID.'" data-location="user"></div>';
            }

        });

    }

    function handle_options_page( $screen, $options_page_id ) {

        $form_posts = $this->forms_refinement_query( 'options_page', 'admin_location_options_page', $options_page_id );

        if( empty( $form_posts )) { return; }

        add_action( 'f3_options_page_render', function( $options_page_id ) use ( $form_posts ) {

            foreach( $form_posts as $form_post ) {
                echo '<div class="f3-form" data-form="'.$form_post->ID.'" data-location="option"></div>';
            }

        });

    }

    function forms_user_query() {

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

        return $form_posts;

    }

    function forms_refinement_query( $admin_location, $refinement_field_key, $refinement_field_value ) {

        $form_posts = get_posts([
            'post_type'   => 'f3-form',
            'numberposts' => -1,
            'meta_query' => [
                [
                    'key'     => 'admin_location',
                    'value'   => $admin_location,
                    'compare' => '=',
                ],
                [
                    'key'     => $refinement_field_key,
                    'value'   => $refinement_field_value,
                    'compare' => '=',
                ]
            ]
        ]);

        return $form_posts;

    }

    function metabox( $form_post ) {

        add_meta_box( 
            'f3_metabox_form_' . $form_post->ID, 
            $form_post->post_title, 
            function( $post, $box ) {
                $form_id = $box['args']['form_id'];
                echo '<div class="f3-form" data-form="' . $form_id . '" data-location="post"></div>';
            }, 
            $post_type, 
            'advanced', 
            'default',
            [ 'form_id' => $form_post->ID ],
        );

    }

}