<?php 

namespace F3\SDO;

class Model {

    public $sdo       = null;
    public $id        = 0;
    public $post_type = '';

    public function load( $id ) {

        $post        = get_post( $id );
        $this->id    = $id;
        $this->title = $post->post_title;
        $this->load_meta();

    }

    public function load_meta() {

        // @TODO refactor to safely check for values.
        foreach( $this->sdo['field_groups'] as $fg ) {
            foreach( $fg['fields'] as $f ) {
                
                $this->{$f['field_name']} = get_post_meta( $this->id, $f['field_name'], 1 );

            }
        }

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

        $this->save_meta();

    }

    public function save_meta() {

        // @TODO refactor to safely check for values.
        foreach( $this->sdo['field_groups'] as $fg ) {
            foreach( $fg['fields'] as $f ) {
                
                update_post_meta( $this->id, $f['field_name'], $this->{$f['field_name']} );

            }
        }

    }

}