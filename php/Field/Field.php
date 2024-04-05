<?php 

namespace Zero\Field;
use \Zero\FieldType\FieldType;

class Field {

    public $id;
    public $type;
    public $title;
    public $name;
    public $storage;
    public $label;

    public function load( $id ) {

        $post          = get_post( $id );
        $this->id      = $id;
        $this->title   = $post->post_title;
        $this->name    = get_post_meta( $id, 'z_field_name', 1 );
        $this->storage = get_post_meta( $id, 'z_field_storage', 1 );
        $this->type    = get_post_meta( $id, 'z_field_type', 1 );
        $this->label   = 'Field Label 1';

    }

    public function render( $value = null, $return = false ) {

        $ft = new FieldType( $this );
        return $ft->render( $value, $return );

    }

}