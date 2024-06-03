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

    /*
     * @TODO we need to know the "type" of meta (post/user/term), or if it's options. 
     * ---- Currently we're presuming it's post meta data. Which is fine for SDO. 
     * ---- Won't work in Record, and maybe that's a good reason to keep Record separate from this Model.
     */
    public function load_meta() {

        foreach( $this->sdo['field_groups'] as $fg ) {
            foreach( $fg['fields'] as $f ) {

                // Use FieldType to load value and format value using field type classes if needed.
                $ft = new \F3\FieldType\FieldType();
                $ft->set_field( $f );
                $ft->load_value_post_meta( $this->id );   

                // Set model property with loaded field value.
                $this->{$f['name']} = $ft->get_value();

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
                    'ID'           => $this->id,
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
                
                update_post_meta( $this->id, $f['name'], $this->{$f['name']} );

            }
        }

    }

}