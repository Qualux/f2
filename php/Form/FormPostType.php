<?php 

namespace F3\Form;

class FormPostType {

    public function __construct() {

        add_action( 'init', function() {
            $this->cpt();
        });

    }

    public function cpt() {

    $labels = array(

    'name'                     => __( 'Form', 'f3' ),
    'singular_name'            => __( 'Form', 'f3' ),
    'add_new'                  => __( 'Add New', 'f3' ),
    'add_new_item'             => __( 'Add New Form', 'f3' ),
    'edit_item'                => __( 'Edit Form', 'f3' ),
    'new_item'                 => __( 'New Form', 'f3' ),
    'view_item'                => __( 'View Form', 'f3' ),
    'view_items'               => __( 'View Forms', 'f3' ),
    'search_items'             => __( 'Search Forms', 'f3' ),
    'not_found'                => __( 'No Forms found.', 'f3' ),
    'not_found_in_trash'       => __( 'No Forms found in Trash.', 'f3' ),
    'parent_item_colon'        => __( 'Parent Forms:', 'f3' ),
    'all_items'                => __( 'All Forms', 'f3' ),
    'archives'                 => __( 'Form Archives', 'f3' ),
    'attributes'               => __( 'Form Attributes', 'f3' ),
    'insert_into_item'         => __( 'Insert into Form', 'f3' ),
    'uploaded_to_this_item'    => __( 'Uploaded to this Form', 'f3' ),
    'featured_image'           => __( 'Form Image', 'f3' ),
    'set_featured_image'       => __( 'Set featured image', 'f3' ),
    'remove_featured_image'    => __( 'Remove featured image', 'f3' ),
    'use_featured_image'       => __( 'Use as featured image', 'f3' ),
    'menu_name'                => __( 'Forms', 'f3' ),
    'filter_items_list'        => __( 'Filter Form list', 'f3' ),
    'filter_by_date'           => __( 'Filter by date', 'f3' ),
    'items_list_navigation'    => __( 'Forms list navigation', 'f3' ),
    'items_list'               => __( 'Forms list', 'f3' ),
    'item_published'           => __( 'Form published.', 'f3' ),
    'item_published_privately' => __( 'Form published privately.', 'f3' ),
    'item_reverted_to_draft'   => __( 'Form reverted to draft.', 'f3' ),
    'item_scheduled'           => __( 'Form scheduled.', 'f3' ),
    'item_updated'             => __( 'Form updated.', 'f3' ),
    'item_link'                => __( 'Form Link', 'f3' ),
    'item_link_description'    => __( 'A link to a field.', 'f3' ),

    );

    $args = array(

    'labels'                => $labels,
    'description'           => __( 'Create forms.', 'f3' ),
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

    $result = register_post_type( 'form', $args );

    }

}