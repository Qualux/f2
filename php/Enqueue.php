<?php 

namespace F3;

class Enqueue {

    public function __construct() {

        // Render fields app UI for F3 admin. 

        // @TODO render scripts required for Options Pages, Taxonomy and User editing.

        add_action( 'admin_enqueue_scripts', function() {
            $screen = \get_current_screen();
            if( $screen->base !== 'toplevel_page_f3' ) {
                return;
            }
            $json  = file_get_contents( F3_PATH . '/apps/fields/build/asset-manifest.json'); 
            $build = json_decode( $json, true); 
            wp_enqueue_style( 'f3-app-fields', F3_URL . 'apps/fields/build' . $build['files']['main.css'], array(), '1.0.0', 'all' );
            wp_enqueue_script( 'f3-app-fields', F3_URL . 'apps/fields/build' . $build['files']['main.js'], array(), '1.0.0', 1 );
        });

        // Enqueue assets for field rendering in Gutenberg.

        add_action('enqueue_block_editor_assets', function() {
            $json = file_get_contents(F3_PATH . '/apps/fields/build/asset-manifest.json');
            $build = json_decode($json, true);
            wp_enqueue_style('f3-app-fields', F3_URL . 'apps/fields/build' . $build['files']['main.css'], array(), '1.0.0', 'all');
            wp_enqueue_script('f3-app-fields', F3_URL . 'apps/fields/build' . $build['files']['main.js'], array(), '1.0.0', true);
        });

        // Enqueue render app back. 
        add_action( 'admin_enqueue_scripts', function() {
            wp_enqueue_script(
                'f3-render',
                F3_URL . '/apps/render/build/index.js',
                ['wp-element'],
                time(), //For production use wp_get_theme()->get('Version')  
                [
                    'in_footer' => true,
                ]      
            );
        });

        // Enqueue render app front. 
        add_action( 'wp_enqueue_scripts', function() {
            wp_enqueue_script(
                'f3-render',
                F3_URL . '/apps/render/build/index.js',
                ['wp-element'],
                time(), //For production use wp_get_theme()->get('Version')  
                [
                    'in_footer' => true,
                ]      
            );
        });

    }

}