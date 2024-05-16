<?php 

namespace F3\FieldGroup;

class FieldGroupShortcodes {

    public function __construct() {

        /* Greeting Shortcode */
        add_shortcode( 'f3_fg', function( $atts = [], $content = null, $tag = '' ) {

            $atts = array_change_key_case( (array) $atts, CASE_LOWER );

            $v = shortcode_atts(
                array(
                    'id' => 0,
                ), $atts, $tag
            );

            $fg = new FieldGroup();
            $fg->load( $v['id'] );
            $c = $fg->render( null, true );

            return '
                <div>
                    ' . $c . '
                </div>
            ';
        });

    }

}