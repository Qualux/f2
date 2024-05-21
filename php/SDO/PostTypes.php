<?php

namespace F3\SDO;

class PostTypes {

    public function __construct() {

        add_action( 'init', [$this, 'register_post_types'], 5 );

    }

    function register_post_types() {

        $sdo_list_json = file_get_contents( F3_PATH . '/data/sdo/reference.json' );
        $sdo_list      = json_decode( $sdo_list_json, 1 );
        foreach( $sdo_list as $sdo_ref ) {

            

            $sdo_json = file_get_contents( F3_PATH . '/data/sdo/' . $sdo_ref['file'] );
            $sdo      = json_decode( $sdo_json, 1 );
            $this->post_type( $sdo['post_type'] );
        }

    }

    function post_type( $settings ) {

        $labels = array(
            'name'               => __( $settings['label'], 'f3' ),
            'singular_name'      => __( $settings['label'], 'f3' ),
            'menu_name'          => __( $settings['label'], 'f3' ),
            'name_admin_bar'     => __( $settings['label'], 'f3' ),
            'add_new'            => __( 'Add New', 'f3' ),
            'add_new_item'       => __( 'Add New F3 Options Page', 'f3' ),
            'new_item'           => __( 'New F3 Options Page', 'f3' ),
            'edit_item'          => __( 'Edit F3 Options Page', 'f3' ),
            'view_item'          => __( 'View F3 Options Page', 'f3' ),
            'all_items'          => __( 'All F3 Options Pages', 'f3' ),
            'search_items'       => __( 'Search F3 Options Pages', 'f3' ),
            'parent_item_colon'  => __( 'Parent F3 Options Pages:', 'f3' ),
            'not_found'          => __( 'No F3 Options Pages found.', 'f3' ),
            'not_found_in_trash' => __( 'No F3 Options Pages found in Trash.', 'f3' )
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
            'supports'           => array( 'title', 'author')
        );
    
        register_post_type( $settings['post_type_key'], $args );
    }

}

