<?php 

namespace Zero\DataStructure;

class F2_PostType {

    public function __construct() {

        add_action( 'init', [$this, 'register_f2_post_type'], 1 );
        add_action( 'init', [$this, 'register_cpts'], 2 );

    }

    function register_f2_post_type() {
        $labels = array(
            'name'               => __( 'F2 Post Type', 'text-domain' ),
            'singular_name'      => __( 'F2 Post Type', 'text-domain' ),
            'menu_name'          => __( 'F2 Post Type', 'text-domain' ),
            'name_admin_bar'     => __( 'F2 Post Type', 'text-domain' ),
            'add_new'            => __( 'Add New', 'text-domain' ),
            'add_new_item'       => __( 'Add New F2 Post Type', 'text-domain' ),
            'new_item'           => __( 'New F2 Post Type', 'text-domain' ),
            'edit_item'          => __( 'Edit F2 Post Type', 'text-domain' ),
            'view_item'          => __( 'View F2 Post Type', 'text-domain' ),
            'all_items'          => __( 'All F2 Post Types', 'text-domain' ),
            'search_items'       => __( 'Search F2 Post Types', 'text-domain' ),
            'parent_item_colon'  => __( 'Parent F2 Post Types:', 'text-domain' ),
            'not_found'          => __( 'No F2 post types found.', 'text-domain' ),
            'not_found_in_trash' => __( 'No F2 post types found in Trash.', 'text-domain' )
        );
    
        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
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

        $labels = array(
            'name'               => __( 'F2 Post Type', 'text-domain' ),
            'singular_name'      => __( 'F2 Post Type', 'text-domain' ),
            'menu_name'          => __( 'F2 Post Type', 'text-domain' ),
            'name_admin_bar'     => __( 'F2 Post Type', 'text-domain' ),
            'add_new'            => __( 'Add New', 'text-domain' ),
            'add_new_item'       => __( 'Add New F2 Post Type', 'text-domain' ),
            'new_item'           => __( 'New F2 Post Type', 'text-domain' ),
            'edit_item'          => __( 'Edit F2 Post Type', 'text-domain' ),
            'view_item'          => __( 'View F2 Post Type', 'text-domain' ),
            'all_items'          => __( 'All F2 Post Types', 'text-domain' ),
            'search_items'       => __( 'Search F2 Post Types', 'text-domain' ),
            'parent_item_colon'  => __( 'Parent F2 Post Types:', 'text-domain' ),
            'not_found'          => __( 'No F2 post types found.', 'text-domain' ),
            'not_found_in_trash' => __( 'No F2 post types found in Trash.', 'text-domain' )
        );
    
        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array( 'slug' => 'dog' ),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => null,
            'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
        );
    
        register_post_type( 'dog', $args );

    }


}

