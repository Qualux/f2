<?php 

/*
 * FieldInstance
 * Field object combined with it's value. 
 * A field is a defined object, while FieldInstance is a runtime representation of a field instance including it's current state.
 */

namespace Zero\Field;

class FieldInstance {

    public $field;
    public $value;

    public function load( $id ) {

        $f = new Field();
        $f->load( $id );
        $this->field = $f;
        $storage_key = 'z_'.$f->name;

        if( $f->storage === 'option') {
            $this->value = get_option( $storage_key );
        }

        if( $f->storage === 'post_meta') {
            global $post;
            $this->value = get_post_meta( $post->ID, $storage_key, 1 );
        }
        
    }

    public function value() {
        echo '<h3>' . $this->value . '</h3>';
    }

    public function render() {
        $this->field->render( $this->value );
    }

}