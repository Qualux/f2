<?php 

namespace F3\Grid;

class GridPostType {

    public function __construct() {

        add_action( 'init', function() {
            $this->cpt();
        });

    }

    public function cpt() {

    $labels = array(

    'name'                     => __( 'Grid', 'f3' ),
    'singular_name'            => __( 'Grid', 'f3' ),
    'add_new'                  => __( 'Add New', 'f3' ),
    'add_new_item'             => __( 'Add New Grid', 'f3' ),
    'edit_item'                => __( 'Edit Grid', 'f3' ),
    'new_item'                 => __( 'New Grid', 'f3' ),
    'view_item'                => __( 'View Grid', 'f3' ),
    'view_items'               => __( 'View Grids', 'f3' ),
    'search_items'             => __( 'Search Grids', 'f3' ),
    'not_found'                => __( 'No Grids found.', 'f3' ),
    'not_found_in_trash'       => __( 'No Grids found in Trash.', 'f3' ),
    'parent_item_colon'        => __( 'Parent Grids:', 'f3' ),
    'all_items'                => __( 'All Grids', 'f3' ),
    'archives'                 => __( 'Grid Archives', 'f3' ),
    'attributes'               => __( 'Grid Attributes', 'f3' ),
    'insert_into_item'         => __( 'Insert into Grid', 'f3' ),
    'uploaded_to_this_item'    => __( 'Uploaded to this Grid', 'f3' ),
    'featured_image'           => __( 'Grid Image', 'f3' ),
    'set_featured_image'       => __( 'Set featured image', 'f3' ),
    'remove_featured_image'    => __( 'Remove featured image', 'f3' ),
    'use_featured_image'       => __( 'Use as featured image', 'f3' ),
    'menu_name'                => __( 'Grids', 'f3' ),
    'filter_items_list'        => __( 'Filter Grid list', 'f3' ),
    'filter_by_date'           => __( 'Filter by date', 'f3' ),
    'items_list_navigation'    => __( 'Grids list navigation', 'f3' ),
    'items_list'               => __( 'Grids list', 'f3' ),
    'item_published'           => __( 'Grid published.', 'f3' ),
    'item_published_privately' => __( 'Grid published privately.', 'f3' ),
    'item_reverted_to_draft'   => __( 'Grid reverted to draft.', 'f3' ),
    'item_scheduled'           => __( 'Grid scheduled.', 'f3' ),
    'item_updated'             => __( 'Grid updated.', 'f3' ),
    'item_link'                => __( 'Grid Link', 'f3' ),
    'item_link_description'    => __( 'A link to a field.', 'f3' ),

    );

    $args = array(

    'labels'                => $labels,
    'description'           => __( 'Create F3 grids.', 'f3' ),
    'public'                => false,
    'hierarchical'          => false,
    'exclude_from_search'   => true,
    'publicly_queryable'    => true,
    'show_ui'               => false,
    'show_in_menu'          => true,
    'show_in_nav_menus'     => false,
    'show_in_admin_bar'     => false,
    'show_in_rest'          => true,
    'menu_position'         => null,
    'menu_icon'             => 'dashicons-megaphone',
    'capability_type'       => 'post',
    'capabilities'          => array(),
    'supports'              => array( 'title' ),
    'taxonomies'            => array(),
    'has_archive'           => false,
    'query_var'             => true,
    'can_export'            => true,
    'delete_with_user'      => false,
    'template'              => array(),
    'template_lock'         => false,

    );

    $result = register_post_type( 'f3-grid', $args );

    }

}