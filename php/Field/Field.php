<?php 

namespace Zero\Field;
use \Zero\FieldType\FieldType;

class Field {

    public $id = 0;
    public $field_title;
    public $field_name;
    public $field_type;
    public $field_storage;
    public $field_label;
    public $field_choices;
    public $field_placeholder;

    public function load( $id ) {

        $post                    = get_post( $id );
        $this->id                = $id;
        $this->field_title       = $post->post_title;
        $this->field_name        = get_post_meta( $id, 'field_name', 1 );
        $this->field_type        = get_post_meta( $id, 'field_type', 1 );
        $this->field_storage     = get_post_meta( $id, 'field_storage', 1 );
        $this->field_label       = get_post_meta( $id, 'field_label', 1 );
        $this->field_choices     = get_post_meta( $id, 'field_choices', 1 );
        $this->field_placeholder = get_post_meta( $id, 'field_placeholder', 1 );

    }

    public function render( $value = null, $return = false ) {

        $ft = new FieldType( $this );
        return $ft->render( $value, $return );

    }

    public static function value( $name, $post_id ) {
        return get_post_meta( $post_id, $name, 1 );
    }

    public function save() {

        // Create post if no ID set.
        if( ! $this->id ) {

            $this->id = wp_insert_post(
                [
                    'post_type'    => 'field',
                    'post_title'   => $this->field_title,
                    'post_content' => '',
                    'post_status'  => 'publish',
                ]
            );

        } else {
            // Update title.
            wp_update_post(
                [
                    'ID'           => $id,
                    'post_title'   => $this->field_title,
                ]
            );
        }

        // Save field values.

        update_post_meta( $this->id, 'field_type', $this->field_type );
        update_post_meta( $this->id, 'field_label', $this->field_label );
        update_post_meta( $this->id, 'field_name', $this->field_name );
        update_post_meta( $this->id, 'field_storage', $this->field_storage );
        update_post_meta( $this->id, 'field_placeholder', $this->field_placeholder );

        if( $this->field_type === 'select' ) {
            update_post_meta( $this->id, 'field_choices', $this->field_choices );
        }

    }

}