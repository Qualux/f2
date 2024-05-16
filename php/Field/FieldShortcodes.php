<?php 

namespace F3\Field;

class FieldShortcodes {

    public function __construct() {

        /* Greeting Shortcode */
        add_shortcode( 'f3_field', function( $atts = [], $content = null, $tag = '' ) {

            $atts = array_change_key_case( (array) $atts, CASE_LOWER );

            $v = shortcode_atts(
                array(
                    'name' => null,
                    'post' => 0,
                ), $atts, $tag
            );

            global $post;
            $value = Field::value( $v['name'], $post->ID );

            return '
                <div>
                    ' . $value . '
                </div>
            ';
        });

    }

}