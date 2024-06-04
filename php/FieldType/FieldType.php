<?php 

/*
 * Generic FieldType handler for any field that doesn't have a dedicated class for special handling.
 */

namespace F3\FieldType;

class FieldType {

    public $field;

    function set_field( $field ) {
        $this->field = $field;
    }

    function value_in_params( $params ) {

        $field_name = $this->field['name'];
        if ( array_key_exists( $field_name, $params ) ) {
            return true;
        } 
        return false;

    }

    function parse_value_from_params($params) {
        $field_name = $this->field['name'];
        $raw_value = isset($params[$field_name]) ? $params[$field_name] : null;
    
        $sanitized_value = $this->sanitize_value($raw_value);
    
        $this->value = $sanitized_value;
    }
    
    private function sanitize_value($value) {
        if (is_array($value)) {
            return array_map([$this, 'sanitize_value'], $value);
        } elseif (is_string($value)) {
            return sanitize_text_field($value);
        } elseif (is_bool($value)) {
            return filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        } elseif (is_numeric($value)) {
            return filter_var($value, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        } else {
            error_log('Could not sanitize data for field value in FieldType sanitize_value.');
            return $value; // Return the raw value if it cannot be sanitized
        }
    }    

    function format_value() {

        switch( $this->field['type'] ) {
            case 'searchable_select':
                $ft_handler = new SearchableSelect();
                $this->value = $ft_handler->format_value( $this->value );
                break;
            case 'field_group_collection':
                $ft_handler = new FieldGroupCollection();
                $this->value = $ft_handler->format_value( $this->value );
                break;
            case 'field_collection':
                $ft_handler = new FieldCollection();
                $this->value = $ft_handler->format_value( $this->value );
                break;
            default: 
                return;
        }

    }

    function get_value() {
        return $this->value;
    }

    function load_value_post_meta( $record_id ) {

        $value = get_post_meta( $record_id, $this->field['name'], 1 );



        switch( $this->field['type'] ) {
            case 'field_group_collection':
                $ft_handler = new FieldGroupCollection();
                $value = $ft_handler->format_load_value( $value );
                break;
            case 'field_collection':
                $ft_handler = new FieldCollection();
                $value = $ft_handler->format_load_value( $value );
                break;
            case 'true_false':
                $ft_handler = new TrueFalse();
                $value = $ft_handler->format_load_value( $value );
                break;
        }

        $this->value = $value;

    }
    

}