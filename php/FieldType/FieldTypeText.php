<?php 

namespace Zero\FieldType;

class FieldTypeText {

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
        $c .= '<label for="'.$field_id.'">';
        $c .= $this->field->label;
        $c .= '</label>';

        $c .= '<input id="z-'.$this->field->name.'" name="z-'.$this->field->name.'" type="text" value="'.$render_value.'" placeholder="'. $this->field->title .'" z-id="' . $this->field->id . '" z-name="' . $this->field->name . '" z-storage="' . $this->field->storage . '"/>';
        
        if( $return ) {
            return $c;
        }
        
        echo $c;
        return;
        
    }

}