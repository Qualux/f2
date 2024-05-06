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

                    $f                    = new Field();
                    $f->field_title       = $params['field_title'];
                    $f->field_name        = $params['field_name'];
                    $f->field_type        = $params['field_type'];
                    $f->field_label       = $params['field_label'];
                    $f->field_storage     = $params['field_storage'];
                    $f->field_placeholder = $params['field_placeholder'];
                    $f->field_choices     = $params['field_choices'];
                    $f->save();
                    
                    return new \WP_REST_Response(
                        array(
                            'status'   => 200,
                            'message'  => __( 'Saved field with ID '. $f->id . '.', 'f2' ),
                            'field_id' => $f->id,
                            'params'   => $params,
                        )
                    );

                },
                'permission_callback' => function() { return true; },
            ));

            // Update endpoint.
            register_rest_route( 'zero/v1', '/field/(?P<id>\d+)', array(

                'methods' => 'POST',
                'callback' => function( \WP_REST_Request $request ) {

                    $field_id = $request->get_param( 'id' );
                    $params   = $request->get_json_params();

                    $f                    = new Field();
                    $f->id                = $field_id;
                    $f->title             = $params['title'];
                    $f->field_name        = $params['field_name'];
                    $f->field_type        = $params['field_type'];
                    $f->field_label       = $params['field_label'];
                    $f->field_storage     = $params['field_storage'];
                    $f->field_placeholder = $params['field_placeholder'];
                    $f->field_choices     = $params['field_choices'];
                    $f->save();

                    return new \WP_REST_Response(
                        array(
                            'status'   => 200,
                            'message'  => 'Saved field with ID '. $f->id . '.',
                            'field_id' => $f->id,
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

                    // Explictly set limit with default no limit applied. 
                    $records_per_page_param = $request->get_param( 'records_per_page' );
                    $records_per_page = $records_per_page_param;
                    if( ! $records_per_page ) {
                        $records_per_page = 10;
                    } 

                    // Parse page request, default 0. 
                    $page_param = $request->get_param( 'page' );
                    $page = $page_param;
                    if( ! $page_param ) {
                        $page = 1;
                    } 

                    // Parse orderby.
                    $meta_key = null;
                    $orderby_param = $request->get_param( 'orderby' );
                    $orderby = $orderby_param;
                    if( ! $orderby ) {
                        $orderby = 'ID';
                    } 
                    if( $orderby !== 'ID' && $orderby !== 'title' ) {
                        $meta_key = $orderby;
                        $orderby  = 'meta_value';
                    }

                    // Parse order.
                    $order_param = $request->get_param( 'order' );
                    $order = $order_param;
                    if( ! $order ) {
                        $order = 'ASC';
                    } 

                    $query_params = [
                        'post_type'      => 'field',
                        'posts_per_page' => $records_per_page,
                        'paged'          => $page,
                        'order'          => $order,
                        'orderby'        => $orderby, // meta_value, meta_value_num
                        'meta_key'       => $meta_key,
                    ];

                    // Field type filter.
                    $field_type_param = $request->get_param( 'field_type' );
                    if( $field_type_param ) {
                        $query_params['meta_query'] = array(
                            array(
                                'key'   => 'field_type',
                                'value' => $field_type_param
                            ),
                        );
                    } 

                    // Search filter. 
                    $search_param = $request->get_param( 'search' );
                    if( $search_param ) {
                        $query_params['s'] = $search_param;
                    } 

                    $query = new \WP_Query( $query_params );

                    if( empty( $query->posts ) ) {
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
                    foreach( $query->posts as $fp ) {
                        $f = new Field();
                        $f->load( $fp->ID );
                        $fields[] = $f;
                    }

                    return new \WP_REST_Response(
                        array(
                            'status'  => 200,
                            'query'   => $query,
                            'fields'  => $fields,
                            'message' => 'Fields loaded.',
                            'max_num_pages' => $query->max_num_pages,
                            'found_posts'   => $query->found_posts,
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