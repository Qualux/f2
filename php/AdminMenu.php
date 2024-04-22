<?php 

namespace Zero;

class AdminMenu {

    public function __construct() {

        add_action('admin_menu', function() {

            add_menu_page(
                'F2', // Page title
                'F2',    // Menu title
                'manage_options', // Capability
                'zero', // Menu slug
                [ $this, 'page' ], // Callback function
                'dashicons-admin-generic', // Icon URL (optional)
                10 // Position (optional)
            );

        });
        

    }

    public function page() {
        echo '<div id="root" style="margin-left: -20px; background-color: #FFF;"></div>';
    }

}