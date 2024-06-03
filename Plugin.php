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

        /*
         * Form internal SDO.
         */

        require_once( F3_PATH . '/php/DataStructure/F3_PostType.php' );
        $dspt = new DataStructure\F3_PostType();

        require_once( F3_PATH . '/php/DataStructure/F3_Taxonomy.php' );
        $dstax = new DataStructure\F3_Taxonomy();

        require_once( F3_PATH . '/php/DataStructure/F3_OptionsPage.php' );
        $dsop = new DataStructure\F3_OptionsPage();

        /* Dashboard Routes */
        require_once( F3_PATH . '/php/Dashboard/DashboardDataRoutes.php' );
        new Dashboard\DashboardDataRoutes();

        /* Locations Handler */
        require_once( F3_PATH . '/php/Locations/Locations.php' );
        new Locations\Locations();

        /* Save Handler */
        require_once( F3_PATH . '/php/Save.php' );
        new Save();
        require_once( F3_PATH . '/php/FieldType/FieldType.php' );
        require_once( F3_PATH . '/php/FieldType/SearchableSelect.php' );
        require_once( F3_PATH . '/php/FieldType/FieldGroupCollection.php' );
        require_once( F3_PATH . '/php/FieldType/FieldCollection.php' );
        require_once( F3_PATH . '/php/FieldType/TrueFalse.php' );

        /* Block Type Register */
        require_once( F3_PATH . '/php/Block/BlockRegister.php' );
        new Block\BlockRegister();

    }

    public static function activate() {

    }

}

new Plugin();

register_activation_hook( __FILE__, array( '\F3\Plugin', 'activate' ) );