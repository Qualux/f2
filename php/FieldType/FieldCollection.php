<?php 

/*
 * Special handler for FieldGroupCollection (field_group_collection) fields.
 */

namespace F3\FieldType;
use F3\SDO\Model;

class FieldCollection {

    function format_load_value( $value ) {

        if( empty( $value ) || ! is_array( $value ) ) {
            return $value; // If empty or not array, then just return the value.
        }

        $sdo = $this->get_sdo();

        $fs = array();
        foreach( $value as $fid ) {
            $model            = new Model();
            $model->post_type = 'f3-field';
            $model->sdo       = $sdo;
            $model->load( $fid );
            $fs[]             = $model;
        }

        return $fs;

    }

    function inline_create( $value_array ) {

        $fs = array();

        foreach( $value_array as $single_value ) {
 
            if( isset( $single_value['recordId'] ) && $single_value['recordId'] > 0 ) {
                $fs[] = $single_value['recordId'];
            } else {
                $save_result = $this->do_save( $single_value );

                if( ! $save_result ) {
                    continue; // Save failed.
                }
                $fs[] = $save_result;
            }

        }

        return $fs;

    }

    function do_save( $field_array ) {

        $sdo          = $this->get_sdo();
        $m            = new \F3\SDO\Model;
        $m->sdo       = $sdo;
        $m->post_type = $sdo['post_type']['post_type_key'];

        foreach( $sdo['field_groups'] as $fg ) {
            foreach( $fg['fields'] as $f ) {

                $ft = new \F3\FieldType\FieldType();
                $ft->set_field( $f );
                $value_exists = $ft->value_in_params( $field_array );
                if( ! $value_exists ) {
                    continue;
                }
                $ft->parse_value_from_params( $field_array );
                $ft->format_value();
                $m->{$f['name']} = $ft->get_value();

            }
        }

        $m->save();
        return $m->id;

    }

    private function get_sdo() {
        $sdo_json = file_get_contents( F3_PATH . '/data/sdo/field.json' );
        return json_decode( $sdo_json, 1 );
    }

}