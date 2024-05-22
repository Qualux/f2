<?php 

/*
 * Plugin Name: F3
 * Description: F3 is a fields system for WordPress that enables you to create structured data.
 * Author: SaberWP 
 * Author URL: https://saberwp.com 
 * Version: 0.0.1
 */

namespace F3;

define( 'F3_URL', plugin_dir_url( __FILE__ ) );
define( 'F3_PATH', plugin_dir_path( __FILE__ ) );
define( 'F3_VERSION', '0.0.1' );

class Plugin {

    public function __construct() {

        /* SDO Classes */
        require_once( F3_PATH . '/php/SDO/Model.php' );
        require_once( F3_PATH . '/php/SDO/API_Routes.php' );
        new SDO\API_Routes();
        require_once( F3_PATH . '/php/SDO/PostTypes.php' );
        new SDO\PostTypes();

        require_once( F3_PATH . '/php/AdminMenu.php' );
        $c = new AdminMenu();

        require_once( F3_PATH . '/php/Enqueue.php' );
        $e = new Enqueue();

        require_once( F3_PATH . '/php/Field/Field.php' );

        require_once( F3_PATH . '/php/Field/FieldPostType.php' );
        $fpt = new Field\FieldPostType();

        require_once( F3_PATH . '/php/Field/FieldShortcodes.php' );
        $fs = new Field\FieldShortcodes();

        require_once( F3_PATH . '/php/Field/FieldRoutes.php' );
        $r = new Field\FieldRoutes();

        require_once( F3_PATH . '/php/Metabox/Metabox.php' );
        $m = new Metabox\Metabox();

        require_once( F3_PATH . '/php/FieldGroup/FieldGroup.php' );
        $fgpt = new FieldGroup\FieldGroup();

        require_once( F3_PATH . '/php/FieldGroup/FieldGroupPostType.php' );
        $fgpt = new FieldGroup\FieldGroupPostType();

        require_once( F3_PATH . '/php/FieldGroup/FieldGroupShortcodes.php' );
        $fgs = new FieldGroup\FieldGroupShortcodes();

        require_once( F3_PATH . '/php/FieldGroup/FieldGroupRoutes.php' );
        $fgr = new FieldGroup\FieldGroupRoutes();

        /*
         * Form internal SDO.
         */
        require_once( F3_PATH . '/php/Form/Form.php' );
        require_once( F3_PATH . '/php/Form/FormPostType.php' );
        $frt = new Form\FormPostType();
        require_once( F3_PATH . '/php/Form/FormRoutes.php' );
        new Form\FormRoutes();

        require_once( F3_PATH . '/php/FieldType/FieldType.php' );
        require_once( F3_PATH . '/php/FieldType/FieldTypeText.php' );
        require_once( F3_PATH . '/php/FieldType/FieldTypeSelect.php' );
        require_once( F3_PATH . '/php/FieldType/FieldTypeNumber.php' );

        require_once( F3_PATH . '/php/DataStructure/F3_PostType.php' );
        $dspt = new DataStructure\F3_PostType();

        require_once( F3_PATH . '/php/DataStructure/F3_Taxonomy.php' );
        $dstax = new DataStructure\F3_Taxonomy();

        require_once( F3_PATH . '/php/DataStructure/F3_OptionsPage.php' );
        $dsop = new DataStructure\F3_OptionsPage();

        /* Dashboard Routes */
        require_once( F3_PATH . '/php/Dashboard/DashboardDataRoutes.php' );
        new Dashboard\DashboardDataRoutes();

    }

    public static function activate() {

    }

}

new Plugin();

register_activation_hook( __FILE__, array( '\F3\Plugin', 'activate' ) );