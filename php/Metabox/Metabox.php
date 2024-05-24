<?php 

/*
 * Metabox 
 * 
 * Renders one or more metaboxes to output field groups.
 * 
 */

namespace F3\Metabox;
use F3\FieldGroup\FieldGroup;

class Metabox {

    /*
     *
     * Reference: https://developer.wordpress.org/reference/functions/add_meta_box/
     */
    public function __construct() {

        $this->add_metaboxes();
        $this->add_metaboxes_system();

    }

    public function add_metaboxes() {

        add_action( 'add_meta_boxes', function( $post_type ) {

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
                    'f3_metabox_' . $fg->id, 
                    $fg->title, 
                    [ $this, 'content' ], 
                    $fg->storage_post_type, 
                    'advanced', 
                    'default',
                    [ 'field_group_id' => $fg->id ],
                );

            }
 
        });

    }

    public function add_metaboxes_system() {

        add_action( 'add_meta_boxes', function( $post_type ) {

            $fgs = [
                [
                    'id'        => '003',
                    'name'      => 'f3_post_type', 
                    'post_type' => 'f3-post-type',
                ],
                [
                    'id'        => '004',
                    'name'      => 'f3_options_page', 
                    'post_type' => 'f3-options-page',
                ]
            ];

            foreach( $fgs as $fg ) {

                add_meta_box( 
                    'f3_metabox_' . $fg['id'], 
                    $fg['name'], 
                    [ $this, 'content' ], 
                    $fg['post_type'], 
                    'advanced', 
                    'default',
                    [ 'field_group_id' => $fg['id'] ],
                );

            }
 
        });

    }

    public function content( $post, $box ) {

        $field_group_id = $box['args']['field_group_id'];
        echo '<div id="f3-fg" data-field-group="'.$field_group_id.'"></div>';
        
    }

    /* Form metaboxes. Newer, after location switched from FG to Form. */

    function form_meta_box( $form ) {

        add_action('add_meta_boxes', function( $post_type ) use ( $form ) {

            echo 'adding metabox';
            echo 'post type is: ' . $post_type;
            var_dump($form);

            add_meta_box( 
                'f3_metabox_form_' . $form->id, 
                $form->title, 
                [ $this, 'form_content' ], 
                $form->location_post_type, 
                'advanced', 
                'default',
                [ 'form_id' => $form->id ],
            );

        });

    }

    function form_content( $post, $box ) {

        echo 'FORM METABOX';

    }

}