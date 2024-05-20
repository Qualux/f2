<?php 

namespace F3\Dashboard;

class DashboardDataRoutes {

    public function __construct() {

        add_action( 'rest_api_init', function () {

            $this->routes();

        });

    }

    public function routes() {

        // Fetch counts for dashboard display.
        register_rest_route( 'f3/v1', '/dashboard/data', array(
            'methods' => 'GET',
            'callback' => function( \WP_REST_Request $req ) {

                $sdo_counts = [
                    'options_pages' => wp_count_posts('f3-options-page'),
                    'taxonomies'    => wp_count_posts('f3-taxonomy'),
                    'post_types'    => wp_count_posts('f3-post-type'),
                    'fields'        => wp_count_posts('field'),
                    'field_groups'  => wp_count_posts('field-group'),
                    'forms'          => wp_count_posts('form'),
                ];

                return new \WP_REST_Response(
                    array(
                        'status'        => 200,
                        'sdo_counts'    => $sdo_counts,
                    )
                );
                
            },
            'permission_callback' => '__return_true',
        ));

    }

}