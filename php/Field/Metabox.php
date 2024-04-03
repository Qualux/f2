<?php 

namespace Zero\Field;

class Metabox {

    public function __construct() {

        add_action( 'add_meta_boxes', function( $post_type ) {
            add_meta_box( 
                'zero_metabox', 
                'Zero Metabox', 
                [ $this, 'content' ], 
                'field', 
                'advanced', 
                'default',
                [ 'post_type' => $post_type ],
            );
        });

    }

    public function content() {
        $fi = new FieldInstance();
        $fi->load(50);
        $fi->render();

        $fi2 = new FieldInstance();
        $fi2->load(58);
        $fi2->render();
    }

}