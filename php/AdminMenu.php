<?php 

namespace Zero;

class AdminMenu {

    public function __construct() {

        add_action('admin_menu', function() {

            add_menu_page(
                'Zero Editor', // Page title
                'Zero Editor',    // Menu title
                'manage_options', // Capability
                'zero', // Menu slug
                [ $this, 'page' ], // Callback function
                'dashicons-admin-generic', // Icon URL (optional)
                10 // Position (optional)
            );

        });
        

    }

    public function page() {

        echo '<h1>Admin Page Title</h1>';
        echo '<button>Add Field</button>';

        $f = new Field\Field();
        $f->load(43);
        $f->render();

        $fi = new Field\FieldInstance();
        $fi->load(43);
        $fi->render();

    }

}