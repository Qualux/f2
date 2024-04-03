<?php 

namespace Zero;

class Enqueue {

    public function __construct() {

        add_action( 'wp_enqueue_scripts', function() {
            wp_enqueue_style( 'zero-main', ZERO_URL . 'css/main.css', array(), '1.0.0', 'all' );
        });

        add_action( 'admin_enqueue_scripts', function() {
            wp_enqueue_script( 'zero-main', ZERO_URL . 'js/main.js', array(), '1.0.0', 1 );
        });

    }

}