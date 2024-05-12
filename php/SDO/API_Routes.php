<?php 

namespace F2\SDO;

class API_Routes {

    public function __construct() {

        add_action( 'rest_api_init', [$this, 'register'] );

    }

    public function register() {

        $sdo_json      = file_get_contents( F2_PATH . '/data/system_sdos.json' );
        $sdo_list      = json_decode( $sdo_json, 1 );

        foreach( $sdo_list as $sdo_key => $sdo ) {

            \register_rest_route( '/f2/v1', '/' . $sdo['routeBase'], 
                array(
                    'methods' => 'POST',
                    'callback' => function( $req ) use ( $sdo ) {

                        $params = $req->get_json_params();

                        $m            = new Model();
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

        }

    }

}