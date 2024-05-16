<?php 

namespace F3\Field;

class FieldPostType {

    public function __construct() {

        add_action( 'init', function() {
            $this->field_cpt();
        });

    }

    public function field_cpt() {

    $labels = array(

    'name'                     => __( 'Field', 'f3' ),
    'singular_name'            => __( 'Field', 'f3' ),
    'add_new'                  => __( 'Add New', 'f3' ),
    'add_new_item'             => __( 'Add New Field', 'f3' ),
    'edit_item'                => __( 'Edit Field', 'f3' ),
    'new_item'                 => __( 'New Field', 'f3' ),
    'view_item'                => __( 'View Field', 'f3' ),
    'view_items'               => __( 'View Fields', 'f3' ),
    'search_items'             => __( 'Search Fields', 'f3' ),
    'not_found'                => __( 'No Fields found.', 'f3' ),
    'not_found_in_trash'       => __( 'No Fields found in Trash.', 'f3' ),
    'parent_item_colon'        => __( 'Parent Fields:', 'f3' ),
    'all_items'                => __( 'All Fields', 'f3' ),
    'archives'                 => __( 'Field Archives', 'f3' ),
    'attributes'               => __( 'Field Attributes', 'f3' ),
    'insert_into_item'         => __( 'Insert into Field', 'f3' ),
    'uploaded_to_this_item'    => __( 'Uploaded to this Field', 'f3' ),
    'featured_image'           => __( 'Field Image', 'f3' ),
    'set_featured_image'       => __( 'Set featured image', 'f3' ),
    'remove_featured_image'    => __( 'Remove featured image', 'f3' ),
    'use_featured_image'       => __( 'Use as featured image', 'f3' ),
    'menu_name'                => __( 'Fields', 'f3' ),
    'filter_items_list'        => __( 'Filter Field list', 'f3' ),
    'filter_by_date'           => __( 'Filter by date', 'f3' ),
    'items_list_navigation'    => __( 'Fields list navigation', 'f3' ),
    'items_list'               => __( 'Fields list', 'f3' ),
    'item_published'           => __( 'Field published.', 'f3' ),
    'item_published_privately' => __( 'Field published privately.', 'f3' ),
    'item_reverted_to_draft'   => __( 'Field reverted to draft.', 'f3' ),
    'item_scheduled'           => __( 'Field scheduled.', 'f3' ),
    'item_updated'             => __( 'Field updated.', 'f3' ),
    'item_link'                => __( 'Field Link', 'f3' ),
    'item_link_description'    => __( 'A link to a field.', 'f3' ),

    );

    $args = array(

    'labels'                => $labels,
    'description'           => __( 'Create fields.', 'f3' ),
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
    'supports'              => array( 'title', 'editor', 'revisions' ),
    'taxonomies'            => array(),
    'has_archive'           => false,
    'query_var'             => true,
    'can_export'            => true,
    'delete_with_user'      => false,
    'template'              => array(),
    'template_lock'         => false,

    );

    $result = register_post_type( 'field', $args );

    }

}