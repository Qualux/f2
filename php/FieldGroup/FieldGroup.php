<?php 

namespace Zero\FieldGroup;
use Zero\Field\Field;

class FieldGroup {

    public $id;
    public $title;
    public $fields;

    public function load( $id ) {
        $post          = get_post( $id );
        $this->id      = $id;
        $this->title   = $post->post_title;
        $this->fields  = get_post_meta( $id, 'z_fg_fields', 1 );
    }

    public function render( $values = null, $return = false ) {
        $c = '';
        $c = '<div>';
        foreach( $this->fields as $fid ) {
            $f = new Field();
            $f->load( $fid );
            $c .= '<div>';
            $c .= $f->render( null, true );
            $c .= '</div>';
        }

        // Save button. 
        $c .= '<div>';
        $c .= '<button>';
        $c .= 'Save';
        $c .= '</button>';
        $c .= '</div>';

        $c .= '</div>';

        if( $return ) {
            return $c;
        }
        echo $c;
        return;
    }

}