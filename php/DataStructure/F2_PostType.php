<?php 

namespace Zero\DataStructure;

class F2_PostType {

    public function __construct() {

        add_action( 'init', [$this, 'register_f2_post_type'], 1 );
        add_action( 'init', [$this, 'register_cpts'], 2 );

    }

    function register_f2_post_type() {
        $labels = array(
            'name'               => __( 'F2 Post Type', 'f2' ),
            'singular_name'      => __( 'F2 Post Type', 'f2' ),
            'menu_name'          => __( 'F2 Post Type', 'f2' ),
            'name_admin_bar'     => __( 'F2 Post Type', 'f2' ),
            'add_new'            => __( 'Add New', 'f2' ),
            'add_new_item'       => __( 'Add New F2 Post Type', 'f2' ),
            'new_item'           => __( 'New F2 Post Type', 'f2' ),
            'edit_item'          => __( 'Edit F2 Post Type', 'f2' ),
            'view_item'          => __( 'View F2 Post Type', 'f2' ),
            'all_items'          => __( 'All F2 Post Types', 'f2' ),
            'search_items'       => __( 'Search F2 Post Types', 'f2' ),
            'parent_item_colon'  => __( 'Parent F2 Post Types:', 'f2' ),
            'not_found'          => __( 'No F2 post types found.', 'f2' ),
            'not_found_in_trash' => __( 'No F2 post types found in Trash.', 'f2' )
        );
    
        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'show_in_rest'       => true,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => 'f2-post-type' ),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => null,
            'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
        );
    
        register_post_type( 'f2-post-type', $args );
    }

    public function register_cpts() {

        $f2_post_types = get_posts([
            'post_type'   => 'f2-post-type',
            'numberposts' => -1,
        ]);

        if( empty( $f2_post_types )) { return; }

        foreach( $f2_post_types as $pt ) {

            $post_type_key = $pt->post_name;
            $name_plural   = get_post_meta( $pt->ID, 'name_plural', 1 );

            $labels = array(
                'name'               => __( $name_plural, 'f2' ),
                'singular_name'      => __( $name_plural, 'f2' ),
                'menu_name'          => __( $name_plural, 'f2' ),
                'name_admin_bar'     => __( $name_plural, 'f2' ),
                'add_new'            => __( 'Add New', 'f2' ),
                'add_new_item'       => __( 'Add New F2 Post Type', 'f2' ),
                'new_item'           => __( 'New F2 Post Type', 'f2' ),
                'edit_item'          => __( 'Edit F2 Post Type', 'f2' ),
                'view_item'          => __( 'View F2 Post Type', 'f2' ),
                'all_items'          => __( 'All F2 Post Types', 'f2' ),
                'search_items'       => __( 'Search F2 Post Types', 'f2' ),
                'parent_item_colon'  => __( 'Parent F2 Post Types:', 'f2' ),
                'not_found'          => __( 'No F2 post types found.', 'f2' ),
                'not_found_in_trash' => __( 'No F2 post types found in Trash.', 'f2' )
            );
        
            $args = array(
                'labels'             => $labels,
                'public'             => true,
                'publicly_queryable' => true,
                'show_ui'            => true,
                'show_in_menu'       => true,
                'show_in_rest'       => true,
                'query_var'          => true,
                'rewrite'            => array( 'slug' => $post_type_key ),
                'capability_type'    => 'post',
                'has_archive'        => true,
                'hierarchical'       => false,
                'menu_position'      => null,
                'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
            );
        
            register_post_type( $post_type_key, $args );
    
        }

    }

}

