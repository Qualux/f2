<?php 

namespace F2\SDO;

class API_Routes {

    public function __construct() {

        add_action( 'rest_api_init', [$this, 'register'] );

    }

    public function register() {

        $dso_json = file_get_contents( F2_PATH . '/data/system_sdos.json' );
        $dso_list = json_decode( $dso_json );

        foreach( $dso_list as $dso ) {

            // Create endpoint.
            register_rest_route( '/f2/v1', '/' . $dso->basePath, array(

                'methods' => 'POST',
                'callback' => function( $req ) {

                    $params  = $req->get_json_params();
                    
                    return new \WP_REST_Response(
                        array(
                            'status'   => 200,
                            'message'  => __( 'Saved.', 'f2' ),
                            'params'   => $params,
                        )
                    );

                },
                'permission_callback' => function() { return true; },
            ));

        }

    }

}