<?php 

namespace Zero\FieldGroup;

class FieldGroupRoutes {
    
    public function __construct() {

        add_action( 'rest_api_init', function () {

            // Create endpoint.
            register_rest_route( 'zero/v1', '/field-group', array(
                'methods' => 'POST',
                'callback' => function( $req ) {

                    $params  = $req->get_json_params();
                    $title   = $params['title'];
                    $fields  = $params['fields'];

                    $post_id = wp_insert_post(
                        [
                            'post_type'    => 'field-group',
                            'post_title'   => $title,
                            'post_content' => '',
                            'post_status'  => 'publish',
                        ]
                    );

                    update_post_meta( $post_id, 'z_fg_fields', $fields );

                    return new \WP_REST_Response(
                        array(
                            'status'  => 200,
                            'message' => 'Saved field group with ID='.$post_id,
                            'id'      => $post_id,
                            'params'  => $params,
                        )
                    );

                },
                'permission_callback' => function() { return true; },
            ));

            // Update endpoint.
            register_rest_route( 'zero/v1', '/field-group/(?P<id>\d+)', array(

                'methods' => 'POST',
                'callback' => function( \WP_REST_Request $request ) {

                    $id      = $request->get_param( 'id' );
                    $params  = $request->get_json_params();
                    $title   = $params['title'];
                    $fields  = $params['fields'];

                    wp_update_post(
                        [
                            'ID'           => $id,
                            'post_title'   => $title,
                            'post_status'  => 'publish',
                        ]
                    );

                    update_post_meta( $id, 'z_fg_fields', $fields );

                    return new \WP_REST_Response(
                        array(
                            'status'  => 200,
                            'message' => 'Saved field group with ID='.$id.'.',
                            'id'      => $id,
                            'params'  => $params,
                        )
                    );

                },
                'permission_callback' => function() { return true; },
            ));

            // Fetch one endpoint.
            register_rest_route( 'zero/v1', '/field/(?P<id>\d+)', array(
                'methods' => 'GET',
                'callback' => function( \WP_REST_Request $request ) {
                    $id = $request->get_param( 'id' );
                    $f = new Field();
                    $f->load( $id );
                    return new \WP_REST_Response(
                        array(
                            'status' => 200,
                            'field'  => $f,
                        )
                    );
                },
                'permission_callback' => '__return_true',
            ));

            // Fetch many endpoint.
            register_rest_route( 'zero/v1', '/field', array(
                'methods' => 'GET',
                'callback' => function( \WP_REST_Request $request ) {

                    $field_posts = get_posts([
                        'post_type'   => 'field',
                        'numberposts' => -1,
                    ]);

                    if( empty( $field_posts ) ) {
                        return new \WP_REST_Response(
                            array(
                                'status'  => 200,
                                'fields'  => [],
                                'count'   => 0,
                                'message' => 'No fields found.'
                            )
                        );
                    }

                    $fields = [];
                    foreach( $field_posts as $fp ) {
                        $f = new Field();
                        $f->load( $fp->ID );
                        $fields[] = $f;
                    }

                    return new \WP_REST_Response(
                        array(
                            'status'  => 200,
                            'fields'  => $fields,
                            'count'   => count($field_posts),
                            'message' => 'Fields loaded.'
                        )
                    );
                    
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