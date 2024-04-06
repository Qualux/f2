<?php 

namespace Zero;

class Enqueue {

    public function __construct() {

        add_action( 'wp_enqueue_scripts', function() {
            wp_enqueue_style( 'zero-main', ZERO_URL . 'css/main.css', array(), '1.0.0', 'all' );
            wp_enqueue_script( 'zero-fields-save-form', ZERO_URL . 'js/save_form.js', array(), '1.0.0', 1 );

        });

        // App fields. 

        add_action( 'admin_enqueue_scripts', function() {

            wp_enqueue_script( 'zero-main', ZERO_URL . 'js/main.js', array(), '1.0.0', 1 );

            $screen = \get_current_screen();
            if( $screen->base !== 'toplevel_page_zero' ) {
                return;
            }


            $json  = file_get_contents( ZERO_PATH . '/apps/fields/build/asset-manifest.json'); 
            $build = json_decode( $json, true); 

            wp_enqueue_style( 'zero-app-fields', ZERO_URL . 'apps/fields/build' . $build['files']['main.css'], array(), '1.0.0', 'all' );
            wp_enqueue_script( 'zero-app-fields', ZERO_URL . 'apps/fields/build' . $build['files']['main.js'], array(), '1.0.0', 1 );
        });

    }

}