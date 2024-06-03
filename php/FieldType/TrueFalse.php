<?php 

/*
 * Special handler for TrueFalse fields. 
 * 
 * WordPress meta storage stores boolean true as string "1". It stores false as empty string.
 * 
 * Here we ensure that the value set for true_false fields is true or false.
 * 
 */

namespace F3\FieldType;

class TrueFalse {

    function format_load_value( $value ) {

        if( $value === "1" ) {
            return true;
        }
        return false;

    }

}