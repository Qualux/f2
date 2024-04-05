<?php 

namespace Zero\FieldGroup;

class FieldGroupPostType {

    public function __construct() {

        add_action( 'init', function() {
            $this->field_group_cpt();
        });

    }

    public function field_group_cpt() {

    $labels = array(

    'name'                     => __( 'Field Group', 'zero' ),
    'singular_name'            => __( 'Field Group', 'zero' ),
    'add_new'                  => __( 'Add New', 'zero' ),
    'add_new_item'             => __( 'Add New Field Group', 'zero' ),
    'edit_item'                => __( 'Edit Field Group', 'zero' ),
    'new_item'                 => __( 'New Field Group', 'zero' ),
    'view_item'                => __( 'View Field Group', 'zero' ),
    'view_items'               => __( 'View Field Groups', 'zero' ),
    'search_items'             => __( 'Search Field Groups', 'zero' ),
    'not_found'                => __( 'No Field Groups found.', 'zero' ),
    'not_found_in_trash'       => __( 'No Field Groups found in Trash.', 'zero' ),
    'parent_item_colon'        => __( 'Parent Field Groups:', 'zero' ),
    'all_items'                => __( 'All Field Groups', 'zero' ),
    'archives'                 => __( 'Field Group Archives', 'zero' ),
    'attributes'               => __( 'Field Group Attributes', 'zero' ),
    'insert_into_item'         => __( 'Insert into Field Group', 'zero' ),
    'uploaded_to_this_item'    => __( 'Uploaded to this Field Group', 'zero' ),
    'featured_image'           => __( 'Field Group Image', 'zero' ),
    'set_featured_image'       => __( 'Set featured image', 'zero' ),
    'remove_featured_image'    => __( 'Remove featured image', 'zero' ),
    'use_featured_image'       => __( 'Use as featured image', 'zero' ),
    'menu_name'                => __( 'Field Groups', 'zero' ),
    'filter_items_list'        => __( 'Filter Field Group list', 'zero' ),
    'filter_by_date'           => __( 'Filter by date', 'zero' ),
    'items_list_navigation'    => __( 'Field Groups list navigation', 'zero' ),
    'items_list'               => __( 'Field Groups list', 'zero' ),
    'item_published'           => __( 'Field Group published.', 'zero' ),
    'item_published_privately' => __( 'Field Group published privately.', 'zero' ),
    'item_reverted_to_draft'   => __( 'Field Group reverted to draft.', 'zero' ),
    'item_scheduled'           => __( 'Field Group scheduled.', 'zero' ),
    'item_updated'             => __( 'Field Group updated.', 'zero' ),
    'item_link'                => __( 'Field Group Link', 'zero' ),
    'item_link_description'    => __( 'A link to a field type.', 'zero' ),

    );

    $args = array(

    'labels'                => $labels,
    'description'           => __( 'Create field groups to organize related fields.', 'zero' ),
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

    $result = register_post_type( 'field-group', $args );

    }

}