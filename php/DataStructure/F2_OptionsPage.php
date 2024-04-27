<?php

namespace Zero\DataStructure;

class F2_OptionsPage {

    public function __construct() {

        add_action( 'init', [$this, 'register_post_type'], 1 );
        add_action( 'admin_menu', [$this, 'register_options_pages'], 2 );

    }

    function register_post_type() {
        $labels = array(
            'name'               => __( 'F2 Options Page', 'f2' ),
            'singular_name'      => __( 'F2 Options Page', 'f2' ),
            'menu_name'          => __( 'F2 Options Page', 'f2' ),
            'name_admin_bar'     => __( 'F2 Options Page', 'f2' ),
            'add_new'            => __( 'Add New', 'f2' ),
            'add_new_item'       => __( 'Add New F2 Options Page', 'f2' ),
            'new_item'           => __( 'New F2 Options Page', 'f2' ),
            'edit_item'          => __( 'Edit F2 Options Page', 'f2' ),
            'view_item'          => __( 'View F2 Options Page', 'f2' ),
            'all_items'          => __( 'All F2 Options Pages', 'f2' ),
            'search_items'       => __( 'Search F2 Options Pages', 'f2' ),
            'parent_item_colon'  => __( 'Parent F2 Options Pages:', 'f2' ),
            'not_found'          => __( 'No F2 Options Pages found.', 'f2' ),
            'not_found_in_trash' => __( 'No F2 Options Pages found in Trash.', 'f2' )
        );
    
        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'show_in_rest'       => true,
            'query_var'          => true,
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => null,
            'supports'           => array( 'title', 'editor', 'author')
        );
    
        register_post_type( 'f2-options-page', $args );
    }

    public function register_options_pages() {

        $f2_options_pages = get_posts([
            'post_type'   => 'f2-options-page',
            'numberposts' => -1,
        ]);

        if( empty( $f2_options_pages )) { return; }

        foreach( $f2_options_pages as $op ) {

            $menu_title    = get_post_meta( $op->ID, 'menu_title', 1 );
            $slug          = get_post_meta( $op->ID, 'page_slug', 1 );

            // @TODO use WP core menu/submenu add functions.
            add_menu_page( 
                $menu_title, 
                $menu_title, 
                'manage_options', 
                $slug, 
                function() {
                    $field_group_id = 34;
                    echo '<div id="f2-options-fields" data-field-group="'.$field_group_id.'"></div>';
                },
            );
    
        }

    }

}
