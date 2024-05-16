<?php 

namespace F3\DataStructure;

class F3_PostType {

    public function __construct() {

        add_action( 'init', [$this, 'register_f3_post_type'], 1 );
        add_action( 'init', [$this, 'register_cpts'], 2 );

    }

    function register_f3_post_type() {
        $labels = array(
            'name'               => __( 'F3 Post Type', 'f3' ),
            'singular_name'      => __( 'F3 Post Type', 'f3' ),
            'menu_name'          => __( 'F3 Post Type', 'f3' ),
            'name_admin_bar'     => __( 'F3 Post Type', 'f3' ),
            'add_new'            => __( 'Add New', 'f3' ),
            'add_new_item'       => __( 'Add New F3 Post Type', 'f3' ),
            'new_item'           => __( 'New F3 Post Type', 'f3' ),
            'edit_item'          => __( 'Edit F3 Post Type', 'f3' ),
            'view_item'          => __( 'View F3 Post Type', 'f3' ),
            'all_items'          => __( 'All F3 Post Types', 'f3' ),
            'search_items'       => __( 'Search F3 Post Types', 'f3' ),
            'parent_item_colon'  => __( 'Parent F3 Post Types:', 'f3' ),
            'not_found'          => __( 'No F3 post types found.', 'f3' ),
            'not_found_in_trash' => __( 'No F3 post types found in Trash.', 'f3' )
        );
    
        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'show_in_rest'       => true,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => 'f3-post-type' ),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => null,
            'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
        );
    
        register_post_type( 'f3-post-type', $args );
    }

    public function register_cpts() {

        $f3_post_types = get_posts([
            'post_type'   => 'f3-post-type',
            'numberposts' => -1,
        ]);

        if( empty( $f3_post_types )) { return; }

        foreach( $f3_post_types as $pt ) {

            $post_type_key = $pt->post_name;
            $name_plural   = get_post_meta( $pt->ID, 'name_plural', 1 );

            $labels = array(
                'name'               => __( $name_plural, 'f3' ),
                'singular_name'      => __( $name_plural, 'f3' ),
                'menu_name'          => __( $name_plural, 'f3' ),
                'name_admin_bar'     => __( $name_plural, 'f3' ),
                'add_new'            => __( 'Add New', 'f3' ),
                'add_new_item'       => __( 'Add New F3 Post Type', 'f3' ),
                'new_item'           => __( 'New F3 Post Type', 'f3' ),
                'edit_item'          => __( 'Edit F3 Post Type', 'f3' ),
                'view_item'          => __( 'View F3 Post Type', 'f3' ),
                'all_items'          => __( 'All F3 Post Types', 'f3' ),
                'search_items'       => __( 'Search F3 Post Types', 'f3' ),
                'parent_item_colon'  => __( 'Parent F3 Post Types:', 'f3' ),
                'not_found'          => __( 'No F3 post types found.', 'f3' ),
                'not_found_in_trash' => __( 'No F3 post types found in Trash.', 'f3' )
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

