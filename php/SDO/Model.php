<?php 

namespace F2\SDO;

class Model {

    public $id        = 0;
    public $post_type = '';

    public function load( $id ) {

        $post        = get_post( $id );
        $this->id    = $id;
        $this->title = $post->post_title;

    }

    public function save() {

        // @TODO parse SDO JSON and loop over field groups to set meta storage. 

        if( ! $this->id ) {

            $this->id = wp_insert_post(
                [
                    'post_type'    => $this->post_type,
                    'post_title'   => $this->title,
                    'post_content' => '',
                    'post_status'  => 'publish',
                ]
            );

        } else {
            wp_update_post(
                [
                    'ID'           => $id,
                    'post_title'   => $this->title,
                ]
            );
        }

    }

}