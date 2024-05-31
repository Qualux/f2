<?php 

/*
 *
 * Save Class
 * 
 * Registers the /f3/v1/save [POST] route.
 * 
 * Saves form data from defined fields as post_meta, user_meta, term_meta and options.
 * 
 * Needs initialization in Plugin Main to hook into rest_api_init.
 * 
 * 
 */

namespace F3;

class Save {

    function __construct() {

        add_action( 'rest_api_init', [$this, 'register_routes'] );

    }

    function register_routes() {

        \register_rest_route( 'f3/v1', '/save', 
            array(
                'methods' => 'POST',
                'callback' => function( \WP_REST_Request $req ) {

                    $params = $req->get_json_params();
                    $form   = $params['form'];

                    return new \WP_REST_Response(
                        array(
                            'status'   => 200,
                            'message'  => __( 'Saved.', 'f3' ),
                            'form'     => $form,
                        )
                    );

                },
                'permission_callback' => function() {
                    return true;
                    //return current_user_can('edit_others_posts');
                },
            )
        );

    }

}