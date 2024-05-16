<?php

namespace F3\DataStructure;

class F3_Taxonomy {

    public function __construct() {

        add_action( 'init', [$this, 'register_post_type'], 1 );
        add_action( 'init', [$this, 'register_custom_taxonomies'], 2 );

    }

    function register_post_type() {
        $labels = array(
            'name'               => __( 'F3 Taxonomy', 'f3' ),
            'singular_name'      => __( 'F3 Taxonomy', 'f3' ),
            'menu_name'          => __( 'F3 Taxonomy', 'f3' ),
            'name_admin_bar'     => __( 'F3 Taxonomy', 'f3' ),
            'add_new'            => __( 'Add New', 'f3' ),
            'add_new_item'       => __( 'Add New F3 Taxonomy', 'f3' ),
            'new_item'           => __( 'New F3 Taxonomy', 'f3' ),
            'edit_item'          => __( 'Edit F3 Taxonomy', 'f3' ),
            'view_item'          => __( 'View F3 Taxonomy', 'f3' ),
            'all_items'          => __( 'All F3 Taxonomys', 'f3' ),
            'search_items'       => __( 'Search F3 Taxonomys', 'f3' ),
            'parent_item_colon'  => __( 'Parent F3 Taxonomys:', 'f3' ),
            'not_found'          => __( 'No F3 Taxonomies found.', 'f3' ),
            'not_found_in_trash' => __( 'No F3 Taxonomies found in Trash.', 'f3' )
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
    
        register_post_type( 'f3-taxonomy', $args );
    }

    public function register_custom_taxonomies() {

        $f3_taxonomies = get_posts([
            'post_type'   => 'f3-taxonomy',
            'numberposts' => -1,
        ]);

        if( empty( $f3_taxonomies )) { return; }

        foreach( $f3_taxonomies as $tax ) {

            $taxonomy_key  = $tax->post_name;
            $name_plural   = get_post_meta( $pt->ID, 'name_plural', 1 );

            $labels = array(
                'name'                       => __( 'Custom Taxonomies', 'f3' ),
                'singular_name'              => __( 'Custom Taxonomy', 'f3' ),
                'menu_name'                  => __( 'Custom Taxonomy', 'f3' ),
                'all_items'                  => __( 'All Custom Taxonomies', 'f3' ),
                'edit_item'                  => __( 'Edit Custom Taxonomy', 'f3' ),
                'view_item'                  => __( 'View Custom Taxonomy', 'f3' ),
                'update_item'                => __( 'Update Custom Taxonomy', 'f3' ),
                'add_new_item'               => __( 'Add New Custom Taxonomy', 'f3' ),
                'new_item_name'              => __( 'New Custom Taxonomy Name', 'f3' ),
                'search_items'               => __( 'Search Custom Taxonomies', 'f3' ),
                'not_found'                  => __( 'No custom taxonomies found', 'f3' ),
                'not_found_in_trash'         => __( 'No custom taxonomies found in Trash', 'f3' ),
            );
        
            $args = array(
                'labels'                     => $labels,
                'public'                     => true,
                'hierarchical'               => true,
                'show_ui'                    => true,
                'show_admin_column'          => true,
                'query_var'                  => true,
                'rewrite'                    => array( 'slug' => $taxonomy_key ),
            );
        
            register_taxonomy( $taxonomy_key, array( 'post' ), $args );
    
        }

    }

}

