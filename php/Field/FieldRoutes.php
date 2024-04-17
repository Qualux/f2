<?php 

namespace Zero\Field;

class FieldRoutes {
    
    public function __construct() {

        add_action( 'rest_api_init', function () {

            // Create endpoint.
            register_rest_route( 'zero/v1', '/field', array(
                'methods' => 'POST',
                'callback' => function( $req ) {

                    $params      = $req->get_json_params();
                    $type        = $params['type'];
                    $title       = $params['title'];
                    $label       = $params['label'];
                    $name        = $params['name'];
                    $storage     = $params['storage'];
                    $choices     = $params['choices'];
                    $placeholder = $params['placeholder'];

                    $post_id = wp_insert_post(
                        [
                            'post_type'    => 'field',
                            'post_title'   => $title,
                            'post_content' => '',
                            'post_status'  => 'publish',
                        ]
                    );

                    update_post_meta( $post_id, 'z_field_type', $type );
                    update_post_meta( $post_id, 'z_field_label', $label );
                    update_post_meta( $post_id, 'z_field_name', $name );
                    update_post_meta( $post_id, 'z_field_storage', $storage );
                    update_post_meta( $post_id, 'z_field_placeholder', $placeholder );

                    if( $type === 'select' ) {
                        update_post_meta( $post_id, 'z_field_choices', $choices );
                    }
                    
                    return new \WP_REST_Response(
                        array(
                            'status'  => 200,
                            'message' => __( 'Saved field with ID '. $post_id . '.', 'f2' ),
                            'params'  => $params,
                        )
                    );

                },
                'permission_callback' => function() { return true; },
            ));

            // Update endpoint.
            register_rest_route( 'zero/v1', '/field/(?P<id>\d+)', array(

                'methods' => 'POST',
                'callback' => function( \WP_REST_Request $request ) {

                    $post_id = $request->get_param( 'id' );
                    $params  = $request->get_json_params();
                    $type    = $params['type'];
                    $title   = $params['title'];
                    $label   = $params['label'];
                    $name    = $params['name'];
                    $storage = $params['storage'];
                    $choices = $params['choices'];
                    $placeholder = $params['placeholder'];

                    wp_update_post(
                        [
                            'ID'           => $id,
                            'post_title'   => $title,
                            'post_status'  => 'publish',
                        ]
                    );

                    update_post_meta( $post_id, 'z_field_type', $type );
                    update_post_meta( $post_id, 'z_field_name', $name );
                    update_post_meta( $post_id, 'z_field_label', $label );
                    update_post_meta( $post_id, 'z_field_storage', $storage );
                    update_post_meta( $post_id, 'z_field_placeholder', $placeholder );

                    if( $type === 'select' ) {
                        update_post_meta( $post_id, 'z_field_choices', $choices );
                    }

                    return new \WP_REST_Response(
                        array(
                            'status'   => 200,
                            'message'  => 'Saved field with ID '. $post_id . '.',
                            'field_id' => $post_id,
                            'params'   => $params,
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

            // Delete field group endpoint.
            register_rest_route( 'zero/v1', '/field/(?P<id>\d+)', array(

                'methods' => 'DELETE',
                'callback' => function( \WP_REST_Request $request ) {

                    global $post;

                    $id = $request->get_param( 'id' );

                    $f = new Field();
                    $f->load( $id );
                    
                    $result = \wp_delete_post( $id, 1 );

                    return new \WP_REST_Response(
                        array(
                            'status'  => 200,
                            'message' => 'Field deleted.',
                            'field'   => $f,
                            'result'  => $result,
                        )
                    );

                },
                'permission_callback' => function() { return true; },
            ));

        });

    }

}