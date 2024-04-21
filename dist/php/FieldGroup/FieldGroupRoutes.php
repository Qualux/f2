<?php 

namespace Zero\FieldGroup;

class FieldGroupRoutes {
    
    public function __construct() {

        add_action( 'rest_api_init', function () {

            // Create endpoint.
            register_rest_route( 'zero/v1', '/field-group', array(
                'methods' => 'POST',
                'callback' => function( $req ) {

                    $params            = $req->get_json_params();
                    $title             = $params['title'];
                    $fields            = $params['fields'];
                    $storage_post_type = $params['storage_post_type'];

                    $post_id = wp_insert_post(
                        [
                            'post_type'    => 'field-group',
                            'post_title'   => $title,
                            'post_content' => '',
                            'post_status'  => 'publish',
                        ]
                    );

                    update_post_meta( $post_id, 'z_fg_fields', $fields );
                    update_post_meta( $post_id, 'z_fg_storage_post_type', $storage_post_type );

                    return new \WP_REST_Response(
                        array(
                            'status'  => 200,
                            'message' => 'Saved field group with ID '. $post_id . '.',
                            'save_id' => $post_id,
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
                    $storage_post_type = $params['storage_post_type'];

                    wp_update_post(
                        [
                            'ID'           => $id,
                            'post_title'   => $title,
                            'post_status'  => 'publish',
                        ]
                    );

                    update_post_meta( $id, 'z_fg_fields', $fields );
                    update_post_meta( $id, 'z_fg_storage_post_type', $storage_post_type );

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
            register_rest_route( 'zero/v1', '/field-group/(?P<id>\d+)', array(
                'methods' => 'GET',
                'callback' => function( \WP_REST_Request $request ) {

                    $id      = $request->get_param( 'id' );
                    $post_id = $request->get_param( 'post_id' );

                    $fg = new FieldGroup();
                    $fg->load( $id, $post_id );
                    return new \WP_REST_Response(
                        array(
                            'status' => 200,
                            'field_group'  => $fg,
                        )
                    );

                },
                'permission_callback' => '__return_true',
            ));

            // Fetch many endpoint.
            register_rest_route( 'zero/v1', '/field-group', array(
                'methods' => 'GET',
                'callback' => function( \WP_REST_Request $request ) {

                    $fg_posts = get_posts([
                        'post_type'   => 'field-group',
                        'numberposts' => -1,
                    ]);

                    if( empty( $fg_posts ) ) {
                        return new \WP_REST_Response(
                            array(
                                'status'  => 200,
                                'field_groups'  => [],
                                'count'   => 0,
                                'message' => 'No field groups found.'
                            )
                        );
                    }

                    $fgs = [];
                    foreach( $fg_posts as $fgp ) {
                        $fg = new FieldGroup();
                        $fg->load( $fgp->ID );
                        $fgs[] = $fg;
                    }

                    return new \WP_REST_Response(
                        array(
                            'status'        => 200,
                            'field_groups'  => $fgs,
                            'count'         => count($fgs),
                            'message'       => 'Fields loaded.'
                        )
                    );
                    
                },
                'permission_callback' => '__return_true',
            ));

            // Delete field group endpoint.
            register_rest_route( 'zero/v1', '/field-group/(?P<id>\d+)', array(

                'methods' => 'DELETE',
                'callback' => function( \WP_REST_Request $request ) {

                    global $post;

                    $id = $request->get_param( 'id' );

                    $fg = new FieldGroup();
                    $fg->load( $id );
                    
                    $result = \wp_delete_post( $id, 1 );

                    return new \WP_REST_Response(
                        array(
                            'status'      => 200,
                            'message'     => 'Field group deleted.',
                            'field_group' => $fg,
                            'result'      => $result,
                        )
                    );

                },
                'permission_callback' => function() { return true; },
            ));


            /*
            * Save Values 
            * 
            * Save post meta or option values. 
            * If field group assigned to post type, either update or create the post. 
            */
            register_rest_route( 'zero/v1', '/field-group/values/(?P<id>\d+)', array(

                'methods' => 'POST',
                'callback' => function( \WP_REST_Request $request ) {

                    $id        = $request->get_param( 'id' );
                    $params    = $request->get_json_params();
                    $post_id   = $params['post_id'];
                    $values    = $params['values'];

                    $fg = new FieldGroup();
                    $fg->load( $id );

                    $mode = null;

                    if( $post_id ) {

                        $mode = 'update';

                    }

                    if( ! $post_id ) {

                        $mode = 'create';
                        $post_id = wp_insert_post(
                            [
                                'post_type'    => $fg->post_type,
                                'post_title'   => 'New post ' . time(),
                                'post_content' => '',
                                'post_status'  => 'publish',
                            ]
                        );
                        
                    }

                    // Setup result logging.
                    $result = [
                        'field_save_count' => 0,
                        'field_save_log'   => [],
                    ];

                    if( $post_id && ! empty( $fg->fields_name ) ) {
                        foreach( $fg->fields_name as $field ) {
                            if( array_key_exists( $field->field_name, $values ) ) {
                                
                                $meta_value = $values[$field->field_name];
                                update_post_meta( $post_id, $field->field_name, $meta_value );

                                $result['field_save_count']++;
                                $result['field_save_log'][] = 'Save attempt for field name ' . $field->field_name . ' with value ' . $meta_value . ' saved to post ID ' . $post_id . '.';
                            }   
                        }  
                    }

                    return new \WP_REST_Response(
                        array(
                            'status'      => 200,
                            'message'     => 'Saved field group.',
                            'result'      => $result,
                            'mode'        => $mode,
                            'post_id'     => $post_id,
                            'field_group' => $fg,
                            'values'      => $values,
                            'params'      => $params,
                        )
                    );

                },
                'permission_callback' => function() { return true; },
            ));

        });

    }

}