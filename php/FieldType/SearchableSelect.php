<?php 

/*
 * Generic FieldType handler for any field that doesn't have a dedicated class for special handling.
 */

namespace F3\FieldType;

class SearchableSelect {

    function format_value( $value ) {

        // @TODO investigate why under one context this is an array and others it is a string (value only?
        if( is_array( $value ) ) {
            return $value['value'];
        }
        return $value;
        

    }

}