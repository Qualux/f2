<?php 

namespace Zero\Field;

class Routes {
    
    public function __construct() {

        add_action( 'rest_api_init', function () {

            // Create endpoint.
            register_rest_route( 'zero/v1', '/field', array(
                'methods' => 'POST',
                'callback' => function( $req ) {

                    $params  = $req->get_json_params();
                    $title   = $params['title'];
                    $name    = $params['name'];
                    $storage = $params['storage'];

                    $post_id = wp_insert_post(
                        [
                            'post_type'    => 'field',
                            'post_title'   => $title,
                            'post_content' => '',
                            'post_status'  => 'publish',
                        ]
                    );

                    update_post_meta( $post_id, 'z_field_name', $name );
                    update_post_meta( $post_id, 'z_field_storage', $storage );

                    return new \WP_REST_Response(
                        array(
                            'status'  => 200,
                            'message' => 'Saved field with ID='.$post_id,
                            'params'  => $params,
                        )
                    );

                },
                'permission_callback' => function() { return true; },
            ));

            // Fetch one endpoint.
            register_rest_route( 'zero/v1', '/field/(?P<id>\d+)', array(
                'methods' => 'GET',
                'callback' => function() {

                },
                'permission_callback' => '__return_true',
            ));

            // Save value endpoint.
            register_rest_route( 'zero/v1', '/field/value', array(
                'methods' => 'POST',
                'callback' => function( $req ) {

                    global $post;

                    $params   = $req->get_json_params();
                    $value    = $params['value'];
                    $name     = $params['name'];
                    $field_id = $params['id'];
                    $post_id  = (int) $params['post_id'];

                    $f = new Field();
                    $f->load( $field_id );
                    $storage_key = 'z_'.$name;

                    if( $f->storage === 'post_meta' ) {
                        update_post_meta( $post_id, $storage_key, $value );
                    } else {
                        update_option( $storage_key, $value );
                    }
                    

                    return new \WP_REST_Response(
                        array(
                            'status'  => 200,
                            'message' => 'value saved',
                            'params'  => $params,
                            'post_id' => $post_id,
                            'field'   => $f,
                        )
                    );

                },
                'permission_callback' => function() { return true; },
            ));

        });  

    }

}