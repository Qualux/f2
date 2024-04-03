<?php 

namespace Zero;

class PostTypes {

    public function __construct() {

        add_action( 'init', function() {
            $this->wpdocs_register_announcement_cpt();
            $this->feature_cpt();
            $this->model_cpt();
            $this->field_cpt();
        });

    }

    public function wpdocs_register_announcement_cpt() {

        $labels = array(
     
           'name'                     => __( 'Announcements', 'zero' ),
           'singular_name'            => __( 'Announcement', 'zero' ),
           'add_new'                  => __( 'Add New', 'zero' ),
           'add_new_item'             => __( 'Add New Announcement', 'zero' ),
           'edit_item'                => __( 'Edit Announcement', 'zero' ),
           'new_item'                 => __( 'New Announcement', 'zero' ),
           'view_item'                => __( 'View Announcement', 'zero' ),
           'view_items'               => __( 'View Announcements', 'zero' ),
           'search_items'             => __( 'Search Announcements', 'zero' ),
           'not_found'                => __( 'No Announcements found.', 'zero' ),
           'not_found_in_trash'       => __( 'No Announcements found in Trash.', 'zero' ),
           'parent_item_colon'        => __( 'Parent Announcements:', 'zero' ),
           'all_items'                => __( 'All Announcements', 'zero' ),
           'archives'                 => __( 'Announcement Archives', 'zero' ),
           'attributes'               => __( 'Announcement Attributes', 'zero' ),
           'insert_into_item'         => __( 'Insert into Announcement', 'zero' ),
           'uploaded_to_this_item'    => __( 'Uploaded to this Announcement', 'zero' ),
           'featured_image'           => __( 'Featured Image', 'zero' ),
           'set_featured_image'       => __( 'Set featured image', 'zero' ),
           'remove_featured_image'    => __( 'Remove featured image', 'zero' ),
           'use_featured_image'       => __( 'Use as featured image', 'zero' ),
           'menu_name'                => __( 'Announcements', 'zero' ),
           'filter_items_list'        => __( 'Filter Announcement list', 'zero' ),
           'filter_by_date'           => __( 'Filter by date', 'zero' ),
           'items_list_navigation'    => __( 'Announcements list navigation', 'zero' ),
           'items_list'               => __( 'Announcements list', 'zero' ),
           'item_published'           => __( 'Announcement published.', 'zero' ),
           'item_published_privately' => __( 'Announcement published privately.', 'zero' ),
           'item_reverted_to_draft'   => __( 'Announcement reverted to draft.', 'zero' ),
           'item_scheduled'           => __( 'Announcement scheduled.', 'zero' ),
           'item_updated'             => __( 'Announcement updated.', 'zero' ),
           'item_link'                => __( 'Announcement Link', 'zero' ),
           'item_link_description'    => __( 'A link to an announcement.', 'zero' ),
     
        );
     
        $args = array(
     
           'labels'                => $labels,
           'description'           => __( 'organize and manage company announcements', 'zero' ),
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
           'rewrite'               => array( 'slug' => 'announcement' ),
           'query_var'             => true,
           'can_export'            => true,
           'delete_with_user'      => false,
           'template'              => array(),
           'template_lock'         => false,
     
        );
     
        $result = register_post_type( 'announcement', $args );
     
     }

     public function feature_cpt() {

        $labels = array(
     
           'name'                     => __( 'Feature', 'zero' ),
           'singular_name'            => __( 'Feature', 'zero' ),
           'add_new'                  => __( 'Add New', 'zero' ),
           'add_new_item'             => __( 'Add New Feature', 'zero' ),
           'edit_item'                => __( 'Edit Feature', 'zero' ),
           'new_item'                 => __( 'New Feature', 'zero' ),
           'view_item'                => __( 'View Feature', 'zero' ),
           'view_items'               => __( 'View Models', 'zero' ),
           'search_items'             => __( 'Search Models', 'zero' ),
           'not_found'                => __( 'No Models found.', 'zero' ),
           'not_found_in_trash'       => __( 'No Models found in Trash.', 'zero' ),
           'parent_item_colon'        => __( 'Parent Models:', 'zero' ),
           'all_items'                => __( 'All Models', 'zero' ),
           'archives'                 => __( 'Feature Archives', 'zero' ),
           'attributes'               => __( 'Feature Attributes', 'zero' ),
           'insert_into_item'         => __( 'Insert into Feature', 'zero' ),
           'uploaded_to_this_item'    => __( 'Uploaded to this Feature', 'zero' ),
           'featured_image'           => __( 'Featured Image', 'zero' ),
           'set_featured_image'       => __( 'Set featured image', 'zero' ),
           'remove_featured_image'    => __( 'Remove featured image', 'zero' ),
           'use_featured_image'       => __( 'Use as featured image', 'zero' ),
           'menu_name'                => __( 'Features', 'zero' ),
           'filter_items_list'        => __( 'Filter Feature list', 'zero' ),
           'filter_by_date'           => __( 'Filter by date', 'zero' ),
           'items_list_navigation'    => __( 'Models list navigation', 'zero' ),
           'items_list'               => __( 'Models list', 'zero' ),
           'item_published'           => __( 'Model published.', 'zero' ),
           'item_published_privately' => __( 'Model published privately.', 'zero' ),
           'item_reverted_to_draft'   => __( 'Model reverted to draft.', 'zero' ),
           'item_scheduled'           => __( 'Model scheduled.', 'zero' ),
           'item_updated'             => __( 'Model updated.', 'zero' ),
           'item_link'                => __( 'Model Link', 'zero' ),
           'item_link_description'    => __( 'A link to a feature.', 'zero' ),
     
        );
     
        $args = array(
     
           'labels'                => $labels,
           'description'           => __( 'organize and manage company announcements', 'zero' ),
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
           'rewrite'               => array( 'slug' => 'feature' ),
           'query_var'             => true,
           'can_export'            => true,
           'delete_with_user'      => false,
           'template'              => array(),
           'template_lock'         => false,
     
        );
     
        $result = register_post_type( 'feature', $args );
     
     }

     public function model_cpt() {

      $labels = array(
   
         'name'                     => __( 'Model', 'zero' ),
         'singular_name'            => __( 'Model', 'zero' ),
         'add_new'                  => __( 'Add New', 'zero' ),
         'add_new_item'             => __( 'Add New Model', 'zero' ),
         'edit_item'                => __( 'Edit Model', 'zero' ),
         'new_item'                 => __( 'New Model', 'zero' ),
         'view_item'                => __( 'View Model', 'zero' ),
         'view_items'               => __( 'View Models', 'zero' ),
         'search_items'             => __( 'Search Models', 'zero' ),
         'not_found'                => __( 'No Models found.', 'zero' ),
         'not_found_in_trash'       => __( 'No Models found in Trash.', 'zero' ),
         'parent_item_colon'        => __( 'Parent Models:', 'zero' ),
         'all_items'                => __( 'All Models', 'zero' ),
         'archives'                 => __( 'Model Archives', 'zero' ),
         'attributes'               => __( 'Model Attributes', 'zero' ),
         'insert_into_item'         => __( 'Insert into Model', 'zero' ),
         'uploaded_to_this_item'    => __( 'Uploaded to this Model', 'zero' ),
         'featured_image'           => __( 'Model Image', 'zero' ),
         'set_featured_image'       => __( 'Set featured image', 'zero' ),
         'remove_featured_image'    => __( 'Remove featured image', 'zero' ),
         'use_featured_image'       => __( 'Use as featured image', 'zero' ),
         'menu_name'                => __( 'Models', 'zero' ),
         'filter_items_list'        => __( 'Filter Model list', 'zero' ),
         'filter_by_date'           => __( 'Filter by date', 'zero' ),
         'items_list_navigation'    => __( 'Models list navigation', 'zero' ),
         'items_list'               => __( 'Models list', 'zero' ),
         'item_published'           => __( 'Model published.', 'zero' ),
         'item_published_privately' => __( 'Model published privately.', 'zero' ),
         'item_reverted_to_draft'   => __( 'Model reverted to draft.', 'zero' ),
         'item_scheduled'           => __( 'Model scheduled.', 'zero' ),
         'item_updated'             => __( 'Model updated.', 'zero' ),
         'item_link'                => __( 'Model Link', 'zero' ),
         'item_link_description'    => __( 'A link to a model.', 'zero' ),
   
      );
   
      $args = array(
   
         'labels'                => $labels,
         'description'           => __( 'Organize data models', 'zero' ),
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
         'rewrite'               => array( 'slug' => 'model' ),
         'query_var'             => true,
         'can_export'            => true,
         'delete_with_user'      => false,
         'template'              => array(),
         'template_lock'         => false,
   
      );
   
      $result = register_post_type( 'model', $args );
   
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
         'item_link_description'    => __( 'A link to a model.', 'zero' ),
   
      );
   
      $args = array(
   
         'labels'                => $labels,
         'description'           => __( 'Create fields for forms.', 'zero' ),
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
         'rewrite'               => array( 'slug' => 'field' ),
         'query_var'             => true,
         'can_export'            => true,
         'delete_with_user'      => false,
         'template'              => array(),
         'template_lock'         => false,
   
      );
   
      $result = register_post_type( 'field', $args );
   
   }

}