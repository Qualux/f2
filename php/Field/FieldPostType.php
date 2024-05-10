<?php 

namespace Zero\Field;

class FieldPostType {

    public function __construct() {

        add_action( 'init', function() {
            $this->field_cpt();
        });

    }

    public function field_cpt() {

    $labels = array(

    'name'                     => __( 'Field', 'zero' ),
    'singular_name'            => __( 'Field', 'zero' ),
    'add_new'                  => __( 'Add New', 'zero' ),
    'add_new_item'             => __( 'Add New Field', 'zero' ),
    'edit_item'                => __( 'Edit Field', 'zero' ),
    'new_item'                 => __( 'New Field', 'zero' ),
    'view_item'                => __( 'View Field', 'zero' ),
    'view_items'               => __( 'View Fields', 'zero' ),
    'search_items'             => __( 'Search Fields', 'zero' ),
    'not_found'                => __( 'No Fields found.', 'zero' ),
    'not_found_in_trash'       => __( 'No Fields found in Trash.', 'zero' ),
    'parent_item_colon'        => __( 'Parent Fields:', 'zero' ),
    'all_items'                => __( 'All Fields', 'zero' ),
    'archives'                 => __( 'Field Archives', 'zero' ),
    'attributes'               => __( 'Field Attributes', 'zero' ),
    'insert_into_item'         => __( 'Insert into Field', 'zero' ),
    'uploaded_to_this_item'    => __( 'Uploaded to this Field', 'zero' ),
    'featured_image'           => __( 'Field Image', 'zero' ),
    'set_featured_image'       => __( 'Set featured image', 'zero' ),
    'remove_featured_image'    => __( 'Remove featured image', 'zero' ),
    'use_featured_image'       => __( 'Use as featured image', 'zero' ),
    'menu_name'                => __( 'Fields', 'zero' ),
    'filter_items_list'        => __( 'Filter Field list', 'zero' ),
    'filter_by_date'           => __( 'Filter by date', 'zero' ),
    'items_list_navigation'    => __( 'Fields list navigation', 'zero' ),
    'items_list'               => __( 'Fields list', 'zero' ),
    'item_published'           => __( 'Field published.', 'zero' ),
    'item_published_privately' => __( 'Field published privately.', 'zero' ),
    'item_reverted_to_draft'   => __( 'Field reverted to draft.', 'zero' ),
    'item_scheduled'           => __( 'Field scheduled.', 'zero' ),
    'item_updated'             => __( 'Field updated.', 'zero' ),
    'item_link'                => __( 'Field Link', 'zero' ),
    'item_link_description'    => __( 'A link to a field.', 'zero' ),

    );

    $args = array(

    'labels'                => $labels,
    'description'           => __( 'Create fields.', 'zero' ),
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