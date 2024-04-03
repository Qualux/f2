<?php 

namespace Zero;

class AdminMenu {

    public function __construct() {

        add_action('admin_menu', function() {

            add_menu_page(
                'My Custom Page', // Page title
                'Custom Menu',    // Menu title
                'manage_options', // Capability
                'my-custom-page', // Menu slug
                [ $this, 'page' ], // Callback function
                'dashicons-admin-generic', // Icon URL (optional)
                10 // Position (optional)
            );

        });
        

    }

    public function page() {

        $f = new Field\Field();
        echo '<h1>Admin Page Title</h1>';
        $f->render();
        echo '<button>Add Field</button>';
    }

}