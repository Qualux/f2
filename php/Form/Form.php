<?php 

namespace Zero\Form;

class Form {

    public $id = 0;
    public $title;

    public function load( $id ) {

        $post        = get_post( $id );
        $this->id    = $id;
        $this->title = $post->post_title;

    }

    public function save() {

        // Create post if no ID set.
        if( ! $this->id ) {

            $this->id = wp_insert_post(
                [
                    'post_type'    => 'form',
                    'post_title'   => $this->title,
                    'post_content' => '',
                    'post_status'  => 'publish',
                ]
            );

        } else {
            // Update title.
            wp_update_post(
                [
                    'ID'           => $id,
                    'post_title'   => $this->title,
                ]
            );
        }

    }


}