<?php 

namespace Zero\FieldType;

class FieldType {

    public $field;

    public function __construct( $field = null ) {

        $this->field = $field;

    }

    public function render( $value = null, $return = false ) {

        $types = $this->get_field_type_list();
        

        $type_def = $types->{$this->field->type};
        $type = new $type_def['class'];

        echo '<pre>';
        var_dump($type);
        echo '</pre>';


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

        $c .= '<input id="z-'.$this->field->name.'" name="z-'.$this->field->name.'" type="text" value="'.$render_value.'" placeholder="'. $this->field->title .'" z-id="' . $this->field->id . '" z-name="' . $this->field->name . '" z-storage="' . $this->field->storage . '"/>';
        
        if( $return ) {
            return $c;
        }
        
        echo $c;
        return;

    }

    public function get_field_type_list() {
        $json        = file_get_contents( ZERO_PATH . '/data/field_types/field_types_internal.json'); 
        $types_array = json_decode( $json, true); 
        $types = new \stdClass;
        foreach( $types_array as $t ) {
            $types->{$t['name']} = $t;
        }
        return $types;
    }


}