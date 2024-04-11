<?php 

namespace Zero\FieldType;

class FieldType {

    public $field;

    public function __construct( $field = null ) {

        $this->field = $field;

    }

    public function render( $value = null, $return = false ) {

        $types = $this->get_field_type_list();

        if ( ! property_exists($types, $this->field->type) ) {
            return 'Property type does not exist.';
        }

        $type_def = $types->{$this->field->type};
        $type = new $type_def['class']($this->field);
        return $type->render( $value, $return );

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