<?php

namespace F3\DataStructure;

class F3_Taxonomy {

    public function __construct() {

        add_action( 'init', [$this, 'register_custom_taxonomies'], 2 );

    }

    public function register_custom_taxonomies() {

        $f3_taxonomies = get_posts([
            'post_type'   => 'f3-taxonomy',
            'numberposts' => -1,
        ]);

        if( empty( $f3_taxonomies )) { return; }

        foreach( $f3_taxonomies as $tax ) {

            $name          = $tax->post_title;
            $taxonomy_key  = get_post_meta( $tax->ID, 'taxonomy_key', 1 );
            $object_type   = get_post_meta( $tax->ID, 'object_type', 1 );
            $public              = get_post_meta( $tax->ID, 'public', 1 );
            $publicly_queryable  = get_post_meta( $tax->ID, 'publicly_queryable', 1 );

            if( $public ) {
                $public = true;
            }

            if( $publicly_queryable ) {
                $publicly_queryable = true;
            }

            $labels = array(
                'name'                       => __( $name, 'f3' ),
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
                'public'                     => $public,
                'public_queryable'           => $publicly_queryable,
                'hierarchical'               => true,
                'show_ui'                    => true,
                'show_admin_column'          => true,
                'show_in_rest'               => true,
                'query_var'                  => true,
                'rewrite'                    => array( 'slug' => $taxonomy_key ),
            );
        
            register_taxonomy( $taxonomy_key, $object_type, $args );
    
        }

    }

}

