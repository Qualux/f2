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
            'add_new_item'       => __( 'Add New ' . $settings['label'] . '', 'f3' ),
            'new_item'           => __( 'New ' . $settings['label'] . '', 'f3' ),
            'edit_item'          => __( 'Edit ' . $settings['label'] . '', 'f3' ),
            'view_item'          => __( 'View ' . $settings['label'] . '', 'f3' ),
            'all_items'          => __( 'All ' . $settings['label'] . 's', 'f3' ),
            'search_items'       => __( 'Search ' . $settings['label'] . 's', 'f3' ),
            'parent_item_colon'  => __( 'Parent ' . $settings['label'] . 's:', 'f3' ),
            'not_found'          => __( 'No ' . $settings['label'] . 's found.', 'f3' ),
            'not_found_in_trash' => __( 'No ' . $settings['label'] . 's found in Trash.', 'f3' )
        );

        $show_ui = false;
        if( isset( $settings['show_ui' ] ) ) {
            $show_ui = $settings['show_ui' ];
        }

        $show_in_menu = false;
        if( isset( $settings['show_in_menu' ] ) ) {
            $show_in_menu = $settings['show_in_menu' ];
        }
    
        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => $show_ui,
            'show_in_menu'       => $show_in_menu,
            'show_in_rest'       => true,
            'query_var'          => true,
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false,
            'menu_position'      => 20,
            'supports'           => array( 'title', 'author')
        );

        if( isset( $settings['supports_editor' ] ) && $settings['supports_editor'] ) {
            $args['supports'][] = 'editor';
        }

        // Add support for template and template_lock based on settings
        $template_args = array();
        if( isset( $settings['template' ] ) ) {
            $template_args['template'] = $settings['template' ];
        }

        if( isset( $settings['template_lock' ] ) ) {
            $template_args['template_lock'] = $settings['template_lock' ];
        }

        // Merge template arguments with $args
        $args = array_merge($args, $template_args);
    
        register_post_type( $settings['post_type_key'], $args );
    }

}

