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

        require_once( ZERO_PATH . '/php/Enqueue.php' );
        $e = new Enqueue();

        require_once( ZERO_PATH . '/php/Field/Field.php' );

        require_once( ZERO_PATH . '/php/Field/Routes.php' );
        $r = new Field\Routes();

        require_once( ZERO_PATH . '/php/Field/Metabox.php' );
        $m = new Field\Metabox();

        require_once( ZERO_PATH . '/php/FieldGroup/FieldGroup.php' );
        $fgpt = new FieldGroup\FieldGroup();

        require_once( ZERO_PATH . '/php/FieldGroup/FieldGroupPostType.php' );
        $fgpt = new FieldGroup\FieldGroupPostType();

        require_once( ZERO_PATH . '/php/FieldGroup/FieldGroupShortcodes.php' );
        $fgs = new FieldGroup\FieldGroupShortcodes();

        require_once( ZERO_PATH . '/php/FieldGroup/FieldGroupRoutes.php' );
        $fgr = new FieldGroup\FieldGroupRoutes();

        require_once( ZERO_PATH . '/php/FieldType/FieldType.php' );
        require_once( ZERO_PATH . '/php/FieldType/FieldTypeText.php' );
        require_once( ZERO_PATH . '/php/FieldType/FieldTypeSelect.php' );

    }

    public static function activate() {

    }

}

new Plugin();

register_activation_hook( __FILE__, array( '\Zero\Plugin', 'activate' ) );