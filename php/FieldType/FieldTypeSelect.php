<?php 

namespace F3\FieldType;

class FieldTypeSelect {

    public $field;

    public function __construct( $field ) {
        $this->field = $field;
    }

    public function render( $value = null, $return = false ) {

        $field_id = 'z-'.$this->field->name;

        if($value) {
            $render_value = $value;
        } else {
            $render_value = '';
        }

        $c = '';
        $c .= '<label for='.$field_id.'>';
        $c .= $this->field->label;
        $c .= '</label>';

        $c .= '<select id="'.$field_id.'" name="'.$field_id.'" >';
        $c .= '<option>Option 1</option>';
        $c .= '<option>Option 2</option>';
        $c .= '<option>Option 3</option>';
        $c .= '</select>';

        if( $return ) {
            return $c;
        }
        
        echo $c;
        return;
        
    }

}