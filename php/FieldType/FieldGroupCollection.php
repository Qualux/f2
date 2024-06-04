<?php 

/*
 * Special handler for FieldGroupCollection (field_group_collection) fields.
 */

namespace F3\FieldType;
use F3\SDO\Model;

class FieldGroupCollection {

    function format_load_value( $value ) {

        if( empty( $value ) || ! is_array( $value ) ) {
            error('value was not array??');
            return $value; // If empty or not array, then just return the value.
        }

        $sdo = $this->get_sdo();

        $fgs = array();
        foreach( $value as $fg_id ) {
            $fg_model            = new Model();
            $fg_model->post_type = 'f3-field-group';
            $fg_model->sdo       = $sdo;
            $fg_model->load( $fg_id );
            $fgs[]               = $fg_model;
        }

        return $fgs;

    }

    /* Expect array value. */
    function format_value( $value_array ) {

        $fgs = array();

        foreach( $value_array as $single_value ) {
 
            if( isset( $single_value['recordId'] ) && $single_value['recordId'] > 0 ) {
                $fgs[] = $single_value['recordId'];
            } else {
                // Do save field groups. 
                if( ! isset( $single_value['fields'] ) || empty( $single_value['fields'] ) ) {
                    // Skip this field group if it is empty of fields.
                    continue;
                }
                $save_result = $this->do_save( $single_value );

                if( ! $save_result ) {
                    continue; // Save failed.
                }
                $fgs[] = $save_result;
            }

        }

        return $fgs;

    }

    function do_save( $field_group_array ) {

        // Create new object for saving. 
        // Replace with $m = new F3\SDO\Model(); and this will require SDO def available.
        $m = new \stdClass;
        $m->title  = $field_group_array['title'];
        $m->repeat = $field_group_array['repeat'];
        $m->fields = $field_group_array['fields'];
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

        // Save field group meta data including fields (FieldCollection field type).
        $sdo = $this->get_sdo();
        foreach( $sdo['field_groups'] as $fg ) {
            foreach( $fg['fields'] as $f ) {
                
                switch( $f['type'] ) {
                    case 'field_collection':
                        $fc = new FieldCollection();
                        $value = $fc->inline_create( $m->{$f['name']} );
                        update_post_meta( $fg_id, $f['name'], $value );
                        break;
                    default:
                        update_post_meta( $fg_id, $f['name'], $m->{$f['name']} );
                        break;
                }

            }
        }

        return $fg_id;

    }

    private function get_sdo() {
        $sdo_json = file_get_contents( F3_PATH . '/data/sdo/field_group.json' );
        return json_decode( $sdo_json, 1 );
    }

}