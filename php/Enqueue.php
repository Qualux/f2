<?php 

namespace F3;

class Enqueue {

    public function __construct() {

        // Render fields app UI for F3 admin. 

        // @TODO Selectively render scripts required for Options Pages, Taxonomy and User editing only when needed.

        add_action( 'admin_enqueue_scripts', function() {

            $screen = \get_current_screen();
            if( $screen->base !== 'toplevel_page_f3' ) {
                return;
            }

            // Enqueue F3 admin. 
            wp_enqueue_script(
                'f3-admin',
                F3_URL . '/apps/admin/build/index.js',
                ['wp-element', 'wp-mediaelement', 'wp-blocks', 'wp-i18n', 'wp-editor'],
                time(),   
            );

            wp_enqueue_style( 
                'f3-admin', 
                F3_URL . 'apps/admin/build/index.css', 
                array(), 
                time(),
                'all' 
            );

            $this->localize_f3_settings( 'f3-admin' );

        });

        // Enqueue assets for field rendering in Gutenberg.

        add_action('enqueue_block_editor_assets', function() {

            $this->enqueue_render_app();

            // Enqueue F3 admin. TESTING GB BLOCKS.
            wp_enqueue_script(
                'f3-admin',
                F3_URL . '/apps/admin/build/index.js',
                ['wp-element', 'wp-mediaelement', 'wp-blocks', 'wp-i18n', 'wp-editor'],
                time(),   
            );

            wp_enqueue_style( 
                'f3-admin', 
                F3_URL . 'apps/admin/build/index.css', 
                array(), 
                time(),
                'all' 
            );
        
        });

        // Enqueue render app back. 
        add_action( 'admin_enqueue_scripts', function() {

            $this->enqueue_render_app();

        });

        // Enqueue render app front. 
        add_action( 'wp_enqueue_scripts', function() {

            $this->enqueue_render_app();
            
        });
        
    }

    function enqueue_render_app() {

        wp_enqueue_script(
            'f3-render',
            F3_URL . '/apps/render/build/index.js',
            ['wp-element', 'wp-mediaelement'],
            time(),
            [
                'in_footer' => true,
            ]      
        );

        wp_enqueue_style( 
            'f3-render', 
            F3_URL . 'apps/render/build/index.css', 
            array(), 
            time(),
            'all' 
        );

        $this->localize_f3_settings( 'f3-render' );

    }

    function localize_f3_settings( $script_id ) {

        wp_localize_script( 
            $script_id, 
            'f3Settings', 
            array( 
                'apiRoot'        => esc_url_raw( rest_url() ),
                'apiF3Root'      => esc_url_raw( rest_url() ) . 'f3/v1/',
                'nonce'          => wp_create_nonce( 'wp_rest' ),
                'apiCorePrefix'  => rest_get_url_prefix(),
            ) 
        );

    }

}