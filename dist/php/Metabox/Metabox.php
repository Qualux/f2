<?php 

/*
 * Metabox 
 * 
 * Renders one or more metaboxes to output field groups.
 * 
 */

namespace Zero\Metabox;
use Zero\FieldGroup\FieldGroup;

class Metabox {

    /*
     *
     * Reference: https://developer.wordpress.org/reference/functions/add_meta_box/
     */
    public function __construct() {

        add_action( 'add_meta_boxes', function( $post_type ) {


            // @TODO query field-group by meta key storage_post_type to match current post_type.
            // @TODO pass args to metabox callback to indicate which field group to render.

            $fgs = get_posts([
                'post_type'   => 'field-group',
                'numberposts' => -1,
                'meta_query' => [
                    [
                        'key'     => 'z_fg_storage_post_type',
                        'value'   => $post_type,
                        'compare' => '=',
                    ]
                ]
            ]);

            if( empty( $fgs )) { return; }

            foreach( $fgs as $fg_post ) {

                $fg = new FieldGroup();
                $fg->load( $fg_post->ID );

                add_meta_box( 
                    'zero_metabox_' . $fg->id, 
                    'Zero Metabox for FG ' . $fg->id, 
                    [ $this, 'content' ], 
                    $fg->storage_post_type, 
                    'advanced', 
                    'default',
                    [ 'field_group_id' => $fg->id ],
                );

            }

            
        });

    }

    public function content( $post, $box ) {

        $field_group_id = $box['args']['field_group_id'];
        echo '<div id="zero-fg" data-field-group="'.$field_group_id.'"></div>';
        
    }

}