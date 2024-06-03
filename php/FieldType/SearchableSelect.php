<?php 

/*
 * Generic FieldType handler for any field that doesn't have a dedicated class for special handling.
 */

namespace F3\FieldType;

class SearchableSelect {

    function format_value( $value ) {

        return $value['value'];

    }

}