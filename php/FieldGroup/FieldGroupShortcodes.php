<?php 

namespace Zero\FieldGroup;

use Zero\Field\Field;

class FieldGroupShortcodes {

    public function __construct() {

        /* Greeting Shortcode */
        add_shortcode( 'zero_fg', function( $atts = [], $content = null, $tag = '' ) {

            $atts = array_change_key_case( (array) $atts, CASE_LOWER );

            $v = shortcode_atts(
                array(
                    'id' => 0,
                ), $atts, $tag
            );

            $fg = new FieldGroup();
            $fg->load( $v['id'] );

            $c = '<ul>';
            foreach( $fg->fields as $fid ) {
                $f = new Field();
                $f->load( $fid );
                $c .= '<li>';
                $c .= $f->render( null, true );
                $c .= '</li>';
            }
            $c .= '</ul>';

            return '
                <div>
                    ' . $c . '
                </div>
            ';
        });

    }

}