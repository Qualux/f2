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
        $option = 'z_'.$f->name;
        $this->value = get_option( $option );
    }

    public function value() {
        echo '<h3>' . $this->value . '</h3>';
    }

    public function render() {
        $this->field->render( $this->value );
    }

}