<?php 

namespace Zero\Form;

class FormPostType {

    public function __construct() {

        add_action( 'init', function() {
            $this->cpt();
        });

    }

    public function cpt() {

    $labels = array(

    'name'                     => __( 'Form', 'zero' ),
    'singular_name'            => __( 'Form', 'zero' ),
    'add_new'                  => __( 'Add New', 'zero' ),
    'add_new_item'             => __( 'Add New Form', 'zero' ),
    'edit_item'                => __( 'Edit Form', 'zero' ),
    'new_item'                 => __( 'New Form', 'zero' ),
    'view_item'                => __( 'View Form', 'zero' ),
    'view_items'               => __( 'View Forms', 'zero' ),
    'search_items'             => __( 'Search Forms', 'zero' ),
    'not_found'                => __( 'No Forms found.', 'zero' ),
    'not_found_in_trash'       => __( 'No Forms found in Trash.', 'zero' ),
    'parent_item_colon'        => __( 'Parent Forms:', 'zero' ),
    'all_items'                => __( 'All Forms', 'zero' ),
    'archives'                 => __( 'Form Archives', 'zero' ),
    'attributes'               => __( 'Form Attributes', 'zero' ),
    'insert_into_item'         => __( 'Insert into Form', 'zero' ),
    'uploaded_to_this_item'    => __( 'Uploaded to this Form', 'zero' ),
    'featured_image'           => __( 'Form Image', 'zero' ),
    'set_featured_image'       => __( 'Set featured image', 'zero' ),
    'remove_featured_image'    => __( 'Remove featured image', 'zero' ),
    'use_featured_image'       => __( 'Use as featured image', 'zero' ),
    'menu_name'                => __( 'Forms', 'zero' ),
    'filter_items_list'        => __( 'Filter Form list', 'zero' ),
    'filter_by_date'           => __( 'Filter by date', 'zero' ),
    'items_list_navigation'    => __( 'Forms list navigation', 'zero' ),
    'items_list'               => __( 'Forms list', 'zero' ),
    'item_published'           => __( 'Form published.', 'zero' ),
    'item_published_privately' => __( 'Form published privately.', 'zero' ),
    'item_reverted_to_draft'   => __( 'Form reverted to draft.', 'zero' ),
    'item_scheduled'           => __( 'Form scheduled.', 'zero' ),
    'item_updated'             => __( 'Form updated.', 'zero' ),
    'item_link'                => __( 'Form Link', 'zero' ),
    'item_link_description'    => __( 'A link to a field.', 'zero' ),

    );

    $args = array(

    'labels'                => $labels,
    'description'           => __( 'Create forms.', 'zero' ),
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