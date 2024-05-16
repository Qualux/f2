<?php 

namespace F3\Form;

class FormRoutes {

    public function __construct() {

        add_action( 'rest_api_init', function () {

            // Fetch many endpoint.
            register_rest_route( 'f3/v1', '/form', array(
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
                        'post_type'      => 'form',
                        'posts_per_page' => $records_per_page,
                        'paged'          => $page,
                        'order'          => $order,
                        'orderby'        => $orderby, // meta_value, meta_value_num
                        'meta_key'       => $meta_key,
                    ];

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
                                'records'  => [],
                                'count'   => 0,
                                'message' => 'No forms found.'
                            )
                        );
                    }

                    $records = [];
                    foreach( $query->posts as $p ) {
                        $r = new Form();
                        $r->load( $p->ID );
                        $records[] = $r;
                    }

                    return new \WP_REST_Response(
                        array(
                            'status'        => 200,
                            'query'         => $query,
                            'records'       => $records,
                            'message'       => 'Records loaded.',
                            'max_num_pages' => $query->max_num_pages,
                            'found_posts'   => $query->found_posts,
                        )
                    );
                    
                },
                'permission_callback' => '__return_true',
            ));

        });

    }

}   