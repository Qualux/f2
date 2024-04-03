<?php 

namespace Zero;

class Shortcodes {

    public function __construct() {

        /* Greeting Shortcode */
        add_shortcode( 'greeting', function( $atts = [], $content = null, $tag = '' ) {

            $atts = array_change_key_case( (array) $atts, CASE_LOWER );

            $v = shortcode_atts(
                array(
                    'title' => 'Feature Title',
                    'classes' => 'flex gap-12',
                ), $atts, $tag
            );
            return '
                <div class="' . $v['classes'] . '">
                    <div>' . $v['title'] . '</div>
                    <div>What is up my amigos?</div>
                </div>
            ';
        });

        /* Feature Shortcode */
        add_shortcode( 'feature', function( $atts = [], $content = null, $tag = '' ) {

            $atts = array_change_key_case( (array) $atts, CASE_LOWER );

            $v = shortcode_atts(
                array(
                    'id' => 0,
                    'classes' => 'flex gap-12',
                ), $atts, $tag
            );

            $id = $v['id'];

            if( $id === 0 ) {
                return 'Sorry, no feature found with this ID.';
            }

            $feature = get_post( $id );

            return '
                <div class="' . $v['classes'] . '">
                    <div>' . $feature->post_title . '</div>
                    <div>' . $feature->post_content . '</div>
                </div>
            ';
        });

        /* Feature Shortcode */
        add_shortcode( 'collection', function( $atts = [], $content = null, $tag = '' ) {

            $atts = array_change_key_case( (array) $atts, CASE_LOWER );

            $v = shortcode_atts(
                array(
                    'post_type' => 'post',
                    'classes' => 'flex gap-12',
                ), $atts, $tag
            );

            $args = [
                'post_type' => $v['post_type']
            ];
            $query = new \WP_Query( $args );

            $content = '';

            if ( $query->have_posts() ) {
                while ( $query->have_posts() ) {
                    $query->the_post();
                    $content .= '<div class="flex gap-12 items-center">';
                    $content .= '<h2>';
                    $content .= get_the_title();
                    $content .= '</h2>';
                    $content .= '<div>';
                    $content .= get_the_content();
                    $content .= '</div>';
                    $content .= '</div>';
                }  

            }
            
            return $content;

        });

    }

}