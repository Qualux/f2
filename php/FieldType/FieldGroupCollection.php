<?php 

/*
 * Special handler for FieldGroupCollection (field_group_collection) fields.
 */

namespace F3\FieldType;
use F3\SDO\Model;

class FieldGroupCollection {

    function format_load_value( $value ) {

        error_log('FieldGroupCollection value in format_load_value:');
        error_log(print_r($value,1));

        if( empty( $value ) || ! is_array( $value ) ) {
            error('value was not array??');
            return $value; // If empty or not array, then just return the value.
        }

        $sdo_json = file_get_contents( F3_PATH . '/data/sdo/field_group.json' );
        $sdo      = json_decode( $sdo_json, 1 );

        $fgs = array();
        foreach( $value as $fg_id ) {
            $fg_model            = new Model();
            $fg_model->post_type = 'f3-field-group';
            $fg_model->sdo       = $sdo;
            $fg_model->load( $fg_id );
            $fgs[]               = $fg_model;
        }

        error_log('FieldGroupCollection value after loading records:');
        error_log(print_r($fgs,1));

        return $fgs;

    }

    /* Expect array value. */
    function format_value( $value_array ) {

        $fgs = array();

        foreach( $value_array as $single_value ) {

            error_log('SINGLE RECORD:');
            error_log( print_r( $single_value, 1 ));

            
            if( isset( $single_value['recordId'] ) && $single_value['recordId'] > 0 ) {
                $fgs[] = $single_value['recordId'];
            } else {
                // Do save field groups. 
                if( ! isset( $single_value['fields'] ) || empty( $single_value['fields'] ) ) {
                    // Skip this field group if it is empty of fields.
                    continue;
                }
                $save_result = $this->do_save( $single_value );

                error_log('SAVE RESULT:');
                error_log( print_r($save_result ,1));

                if( ! $save_result ) {
                    continue; // Save failed.
                }
                $fgs[] = $save_result;
            }

        }

        error_log('Running FG Collection handler:');
        error_log(print_r($fgs, 1));

        return $fgs;


    }

    function do_save( $field_group_array ) {

        // Handle fields.
        $fs = array();
        foreach( $field_group_array['fields'] as $field_array ) {

            if( isset( $field_array['recordId'] ) && $field_array['recordId'] > 0 ) {
                $fs[] = $field_array['recordId'];
            }

        }

        // Create new object for saving. 
        // Replace with $m = new F3\SDO\Model(); and this will require SDO def available.
        $m = new \stdClass;
        $m->title  = $field_group_array['title'];
        $m->repeat = $field_group_array['repeat'];
        $m->fields = $fs;
        $fg_id     = \wp_insert_post(
            [
                'post_type'    => 'f3-field-group',
                'post_title'   => $m->title,
                'post_content' => '',
                'post_status'  => 'publish',
            ]
        );
        if( ! $fg_id ) {
            return false;
        }
        \update_post_meta( $fg_id, 'repeat', $m->repeat );
        \update_post_meta( $fg_id, 'fields', $m->fields );
        return $fg_id;

    }

}