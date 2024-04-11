<?php 

namespace Zero\FieldGroup;
use Zero\Field\Field;

class FieldGroup {

    public $id;
    public $title;
    public $fields = [];
    public $fields_numeric = [];
    public $fields_name = [];
    public $fields_id = [];

    public function load( $id ) {
        $post          = get_post( $id );
        $this->id      = $id;
        $this->title   = $post->post_title;
        $this->fields  = get_post_meta( $id, 'z_fg_fields', 1 );
        if( ! empty( $this->fields ) ) {
            foreach( $this->fields as $fid ) {
                $f = new Field();
                $f->load( $fid );
                $this->fields_numeric[] = $f;
                $this->fields_name[$f->name] = $f;
                $this->fields_id[$fid] = $f;
            }
        }
    }

    public function render( $values = null, $return = false ) {
        $c = '';
        $c .= '<div class="z-field-group">';
        $c .= '<form class="z-field-group-wrap id="zero-form" method="POST">';
        foreach( $this->fields as $fid ) {
            $f = new Field();
            $f->load( $fid );
            $c .= '<div>';
            $c .= $f->render( null, true );
            $c .= '</div>';
        }

        // Save button. 
        $c .= '<div class="z-form-submit-wrap">';
        $c .= '<button type="submit" id="zero-save-button">';
        $c .= 'Save 123';
        $c .= '</button>';
        $c .= '</div>';

        $c .= '</form>';
        $c .= '</div>';

        if( $return ) {
            return $c;
        }
        echo $c;
        return;
    }

}