<?php 

/*
 * Special handler for FieldGroupCollection (field_group_collection) fields.
 */

namespace F3\FieldType;
use F3\SDO\Model;

class FieldCollection {

    function format_load_value( $value ) {

        error_log('FieldCollection value in format_load_value:');
        error_log(print_r($value,1));

        if( empty( $value ) || ! is_array( $value ) ) {
            error('value was not array??');
            return $value; // If empty or not array, then just return the value.
        }

        $sdo_json = file_get_contents( F3_PATH . '/data/sdo/field.json' );
        $sdo      = json_decode( $sdo_json, 1 );

        $fs = array();
        foreach( $value as $fid ) {
            $model            = new Model();
            $model->post_type = 'f3-field';
            $model->sdo       = $sdo;
            $model->load( $fid );
            $fs[]             = $model;
        }

        error_log('FieldCollection value after loading records:');
        error_log(print_r($fs,1));

        return $fs;

    }

}