<?php

namespace Zero\DataStructure;

class F2_Taxonomy {

    public function __construct() {

        add_action( 'init', [$this, 'register_post_type'], 1 );
        add_action( 'init', [$this, 'register_custom_taxonomies'], 2 );

    }

    function register_post_type() {
        $labels = array(
            'name'               => __( 'F2 Taxonomy', 'f2' ),
            'singular_name'      => __( 'F2 Taxonomy', 'f2' ),
            'menu_name'          => __( 'F2 Taxonomy', 'f2' ),
            'name_admin_bar'     => __( 'F2 Taxonomy', 'f2' ),
            'add_new'            => __( 'Add New', 'f2' ),
            'add_new_item'       => __( 'Add New F2 Taxonomy', 'f2' ),
            'new_item'           => __( 'New F2 Taxonomy', 'f2' ),
            'edit_item'          => __( 'Edit F2 Taxonomy', 'f2' ),
            'view_item'          => __( 'View F2 Taxonomy', 'f2' ),
            'all_items'          => __( 'All F2 Taxonomys', 'f2' ),
            'search_items'       => __( 'Search F2 Taxonomys', 'f2' ),
            'parent_item_colon'  => __( 'Parent F2 Taxonomys:', 'f2' ),
            'not_found'          => __( 'No F2 Taxonomies found.', 'f2' ),
            'not_found_in_trash' => __( 'No F2 Taxonomies found in Trash.', 'f2' )
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
    
        register_post_type( 'f2-taxonomy', $args );
    }

    public function register_custom_taxonomies() {

        $f2_taxonomies = get_posts([
            'post_type'   => 'f2-taxonomy',
            'numberposts' => -1,
        ]);

        if( empty( $f2_taxonomies )) { return; }

        foreach( $f2_taxonomies as $tax ) {

            $taxonomy_key  = $tax->post_name;
            $name_plural   = get_post_meta( $pt->ID, 'name_plural', 1 );

            $labels = array(
                'name'                       => __( 'Custom Taxonomies', 'f2' ),
                'singular_name'              => __( 'Custom Taxonomy', 'f2' ),
                'menu_name'                  => __( 'Custom Taxonomy', 'f2' ),
                'all_items'                  => __( 'All Custom Taxonomies', 'f2' ),
                'edit_item'                  => __( 'Edit Custom Taxonomy', 'f2' ),
                'view_item'                  => __( 'View Custom Taxonomy', 'f2' ),
                'update_item'                => __( 'Update Custom Taxonomy', 'f2' ),
                'add_new_item'               => __( 'Add New Custom Taxonomy', 'f2' ),
                'new_item_name'              => __( 'New Custom Taxonomy Name', 'f2' ),
                'search_items'               => __( 'Search Custom Taxonomies', 'f2' ),
                'not_found'                  => __( 'No custom taxonomies found', 'f2' ),
                'not_found_in_trash'         => __( 'No custom taxonomies found in Trash', 'f2' ),
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

