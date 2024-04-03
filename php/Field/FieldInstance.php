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

    public function render() {
        echo '<h3>' . $this->value . '</h3>';
    }

}