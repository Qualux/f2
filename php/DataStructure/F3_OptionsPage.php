<?php

namespace F3\DataStructure;

/**
 * Class F3_OptionsPage
 *
 * Handles the registration of the F3 Options Page custom post type
 * and the creation of admin menu pages for each options page.
 *
 * @package F3\DataStructure
 */
class F3_OptionsPage {

    public function __construct() {

        add_action( 'admin_menu', [$this, 'register_options_pages'], 2 );

    }
    
    public function register_options_pages() {

        $f3_options_pages = get_posts([
            'post_type'   => 'f3-options-page',
            'numberposts' => -1,
        ]);

        if( empty( $f3_options_pages )) { return; }

        foreach( $f3_options_pages as $p ) {

            $menu_title    = $p->post_title;
            $slug          = get_post_meta( $p->ID, 'page_slug', 1 );
            $icon_url      = get_post_meta( $p->ID, 'icon_url', 1 );
            $position      = get_post_meta( $p->ID, 'position', 1 );

            // Validation $position is numeric. 
            if (!is_numeric($position)) {
                $position = 10; // Set to default 10 if not numeric position.
            }

            add_menu_page( 
                $menu_title, 
                $menu_title, 
                'manage_options', 
                $slug, 
                function() use ($p) {

                    $fgs = get_posts([
                        'post_type'   => 'field-group',
                        'numberposts' => -1,
                        'meta_query' => [
                            [
                                'key'     => 'storage_options_page',
                                'value'   => $p->ID,
                                'compare' => '=',
                            ]
                        ]
                    ]);
        
                    if( empty( $fgs )) { return; }

                    foreach( $fgs as $fg ) {
                        echo '<div id="f3-options-fields" data-field-group="'.$fg->ID.'"></div>';
                    }
                    
                },
                $icon_url,
                $position,
            );
    
        }

    }

}

