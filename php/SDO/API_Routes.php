<?php 

namespace F2\SDO;

class API_Routes {

    public function __construct() {

        add_action( 'rest_api_init', [$this, 'register'] );

    }

    public function register() {

        $sdo_json      = file_get_contents( F3_PATH . '/data/system_sdos.json' );
        $sdo_list      = json_decode( $sdo_json, 1 );

        foreach( $sdo_list as $sdo_key => $sdo ) {

            \register_rest_route( '/f2/v1', '/' . $sdo['routeBase'], 
                array(
                    'methods' => 'GET',
                    'callback' => function( \WP_REST_Request $req ) use ( $sdo ) {

                        // Explictly set limit with default no limit applied. 
                        $records_per_page_param = $req->get_param( 'records_per_page' );
                        $records_per_page = $records_per_page_param;
                        if( ! $records_per_page ) {
                            $records_per_page = 10;
                        } 

                        // Parse page request, default 0. 
                        $page_param = $req->get_param( 'page' );
                        $page = $page_param;
                        if( ! $page_param ) {
                            $page = 1;
                        } 

                        // Parse orderby.
                        $meta_key = null;
                        $orderby_param = $req->get_param( 'orderby' );
                        $orderby = $orderby_param;
                        if( ! $orderby ) {
                            $orderby = 'ID';
                        } 
                        if( $orderby !== 'ID' && $orderby !== 'title' ) {
                            $meta_key = $orderby;
                            $orderby  = 'meta_value';
                        }

                        // Parse order.
                        $order_param = $req->get_param( 'order' );
                        $order = $order_param;
                        if( ! $order ) {
                            $order = 'ASC';
                        } 

                        $query_params = [
                            'post_type'      => $sdo['post_type'],
                            'posts_per_page' => $records_per_page,
                            'paged'          => $page,
                            'order'          => $order,
                            'orderby'        => $orderby, // meta_value, meta_value_num
                            'meta_key'       => $meta_key,
                        ];

                        // Search filter. 
                        $search_param = $req->get_param( 'search' );
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
                                    'message' => 'No records found.'
                                )
                            );
                        }

                        $models = [];
                        foreach( $query->posts as $p ) {
                            $m            = new Model();
                            $m->sdo       = $sdo;
                            $m->post_type = $sdo['post_type'];
                            $m->load( $p->ID );
                            $models[] = $m;
                        }

                        return new \WP_REST_Response(
                            array(
                                'status'        => 200,
                                'query'         => $query,
                                'records'       => $models,
                                'message'       => 'Fields loaded.',
                                'max_num_pages' => $query->max_num_pages,
                                'found_posts'   => $query->found_posts,
                            )
                        );
        
                    },
                    'permission_callback' => function() { return true; },
                )
            );

            register_rest_route( 'f2/v1', '/' . $sdo['routeBase'] . '/(?P<id>\d+)', array(
                'methods' => 'GET',
                'callback' => function( \WP_REST_Request $req ) use ( $sdo ) {
                    $id = $req->get_param( 'id' );
                    
                    $m            = new Model();
                    $m->sdo       = $sdo;
                    $m->post_type = $sdo['post_type'];
                    $m->load( $id );

                    return new \WP_REST_Response(
                        array(
                            'status' => 200,
                            'record' => $m,
                        )
                    );
                },
                'permission_callback' => '__return_true',
            ));

            \register_rest_route( '/f2/v1', '/' . $sdo['routeBase'], 
                array(
                    'methods' => 'POST',
                    'callback' => function( \WP_REST_Request $req ) use ( $sdo ) {

                        $params = $req->get_json_params();

                        $m            = new Model();
                        $m->sdo       = $sdo;
                        $m->post_type = $sdo['post_type'];

                        foreach( $sdo['field_groups'] as $fg ) {
                            foreach( $fg['fields'] as $f ) {
                                $m->{$f['field_name']} = $params[$f['field_name']];
                            }
                        }

                        $m->save();
                        
                        return new \WP_REST_Response(
                            array(
                                'status'   => 200,
                                'message'  => __( 'Saved.', 'f2' ),
                                'params'   => $params,
                                'model'    => $m,
                                'sdo'      => $sdo,
                            )
                        );
        
                    },
                    'permission_callback' => function() { return true; },
                )
            );

            \register_rest_route( '/f2/v1', '/' . $sdo['routeBase'] . '/(?P<id>\d+)', 
                array(
                    'methods' => 'DELETE',
                    'callback' => function( \WP_REST_Request $req ) use ( $sdo ) {

                        $id = $req->get_param( 'id' );
                        $result = \wp_delete_post( $id, 1 );

                        return new \WP_REST_Response(
                            array(
                                'status'  => 200,
                                'message' => 'Deleted attempted.',
                                'result'  => $result,
                            )
                        );
        
                    },
                    'permission_callback' => function() { return true; },
                )
            );

        }  

    }

}