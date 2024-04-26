<?php 

namespace Zero\FieldGroup;
use Zero\Field\Field;

class FieldGroup {

    public $id;
    public $title;
    public $fields = [];
    public $fields_numeric = [];
    public $fields_name = [];
    public $fields_id = [];
    public $storage_post_type = null;
    public $values = false;

    public function load( $id, $post_id = 0 ) {

        if( $id === '003' ) {
            $this->system_load( $id );
        } else {
            $this->database_load( $id );
        }

        // Load values if post_id available.
        if( $post_id ) {

            $this->values = new \stdClass;
            if( ! empty( $this->fields_name ) ) {
                foreach( $this->fields_name as $field ) {
                    $this->values->{$field->field_name} = get_post_meta( $post_id, $field->field_name, 1 );
                } 
            }

        }
        

    }

    public function system_load( $id ) {

        // Construct the full path to the JSON file
        $file = ZERO_PATH . '/apps/fields/src/data/system_field_groups.json';

        if (file_exists( $file )) {
            $contents = file_get_contents( $file );
            $data = json_decode( $contents );

            if ( $data !== null ) {
                $fg = $data->{'003'};
                $this->id                = $fg->id;
                $this->title             = 'F2 Post Types Field Group';
                $this->storage_post_type = 'f2-post-type';
                $this->fields            = $fg->fields_numeric;
                $this->fields_name       = new \stdClass;
                foreach( $this->fields as $field ) {
                    $this->fields_name->{$field->field_name} = $field;
                }
            } else {
                // Handle JSON decoding error
                echo 'Error decoding JSON file.';
            }
        }

    }

    public function database_load( $id ) {
        $post                     = get_post( $id );
        $this->id                 = $id;
        $this->title              = $post->post_title;
        $this->fields             = get_post_meta( $id, 'z_fg_fields', 1 );
        $this->storage_post_type  = get_post_meta( $id, 'z_fg_storage_post_type', 1 );
        if( ! empty( $this->fields ) ) {
            foreach( $this->fields as $fid ) {
                $f = new Field();
                $f->load( $fid );
                $this->fields_numeric[] = $f;
                $this->fields_name[$f->field_name] = $f;
                $this->fields_id[$fid] = $f;
            }
        }
    }

}