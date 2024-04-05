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
            register_rest_route( 'zero/v1', '/field-group/(?P<id>\d+)', array(
                'methods' => 'GET',
                'callback' => function( \WP_REST_Request $request ) {
                    $id = $request->get_param( 'id' );
                    $fg = new FieldGroup();
                    $fg->load( $id );
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
                                'fields'  => [],
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

        });

    }

}