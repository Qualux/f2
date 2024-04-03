<?php 

/*
 * Plugin Name: Zero
 */

namespace Zero;

define( 'ZERO_URL', plugin_dir_url( __FILE__ ) );
define( 'ZERO_PATH', plugin_dir_path( __FILE__ ) );
define( 'ZERO_VERSION', '0.0.1' );

class Plugin {

    public function __construct() {

        require_once( ZERO_PATH . '/php/AdminMenu.php' );
        $c = new AdminMenu();
        
        require_once( ZERO_PATH . '/php/PostTypes.php' );
        $p = new PostTypes();

        require_once( ZERO_PATH . '/php/PostTypeFieldType.php' );
        $f = new PostTypeFieldType();

        require_once( ZERO_PATH . '/php/Shortcodes.php' );
        $s = new Shortcodes();

        require_once( ZERO_PATH . '/php/Enqueue.php' );
        $e = new Enqueue();

        require_once( ZERO_PATH . '/php/Field/Field.php' );
        require_once( ZERO_PATH . '/php/Field/FieldInstance.php' );

    }

    public static function activate() {

    }

}

new Plugin();

register_activation_hook( __FILE__, array( '\Zero\Plugin', 'activate' ) );