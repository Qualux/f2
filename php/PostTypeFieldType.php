<?php 

namespace Zero;

class PostTypeFieldType {

    public function __construct() {

        add_action( 'init', function() {
            $this->field_type_cpt();
        });

    }

    public function field_type_cpt() {

    $labels = array(

    'name'                     => __( 'Field Type', 'zero' ),
    'singular_name'            => __( 'Field Type', 'zero' ),
    'add_new'                  => __( 'Add New', 'zero' ),
    'add_new_item'             => __( 'Add New Field Type', 'zero' ),
    'edit_item'                => __( 'Edit Field Type', 'zero' ),
    'new_item'                 => __( 'New Field Type', 'zero' ),
    'view_item'                => __( 'View Field Type', 'zero' ),
    'view_items'               => __( 'View Field Types', 'zero' ),
    'search_items'             => __( 'Search Field Types', 'zero' ),
    'not_found'                => __( 'No Field Types found.', 'zero' ),
    'not_found_in_trash'       => __( 'No Field Types found in Trash.', 'zero' ),
    'parent_item_colon'        => __( 'Parent Field Types:', 'zero' ),
    'all_items'                => __( 'All Field Types', 'zero' ),
    'archives'                 => __( 'Field Type Archives', 'zero' ),
    'attributes'               => __( 'Field Type Attributes', 'zero' ),
    'insert_into_item'         => __( 'Insert into Field Type', 'zero' ),
    'uploaded_to_this_item'    => __( 'Uploaded to this Field Type', 'zero' ),
    'featured_image'           => __( 'Field Type Image', 'zero' ),
    'set_featured_image'       => __( 'Set featured image', 'zero' ),
    'remove_featured_image'    => __( 'Remove featured image', 'zero' ),
    'use_featured_image'       => __( 'Use as featured image', 'zero' ),
    'menu_name'                => __( 'Field Types', 'zero' ),
    'filter_items_list'        => __( 'Filter Field Type list', 'zero' ),
    'filter_by_date'           => __( 'Filter by date', 'zero' ),
    'items_list_navigation'    => __( 'Field Types list navigation', 'zero' ),
    'items_list'               => __( 'Field Types list', 'zero' ),
    'item_published'           => __( 'Field Type published.', 'zero' ),
    'item_published_privately' => __( 'Field Type published privately.', 'zero' ),
    'item_reverted_to_draft'   => __( 'Field Type reverted to draft.', 'zero' ),
    'item_scheduled'           => __( 'Field Type scheduled.', 'zero' ),
    'item_updated'             => __( 'Field Type updated.', 'zero' ),
    'item_link'                => __( 'Field Type Link', 'zero' ),
    'item_link_description'    => __( 'A link to a field type.', 'zero' ),

    );

    $args = array(

    'labels'                => $labels,
    'description'           => __( 'Create field types to define different types of fields that can be created.', 'zero' ),
    'public'                => false,
    'hierarchical'          => false,
    'exclude_from_search'   => true,
    'publicly_queryable'    => true,
    'show_ui'               => true,
    'show_in_menu'          => true,
    'show_in_nav_menus'     => false,
    'show_in_admin_bar'     => false,
    'show_in_rest'          => true,
    'menu_position'         => null,
    'menu_icon'             => 'dashicons-megaphone',
    'capability_type'       => 'post',
    'capabilities'          => array(),
    'supports'              => array( 'title', 'editor', 'revisions' ),
    'taxonomies'            => array(),
    'has_archive'           => false,
    'query_var'             => true,
    'can_export'            => true,
    'delete_with_user'      => false,
    'template'              => array(),
    'template_lock'         => false,

    );

    $result = register_post_type( 'field-type', $args );

    }

}