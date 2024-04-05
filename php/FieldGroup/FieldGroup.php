<?php 

namespace Zero\FieldGroup;

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

    public function render( $values = null ) {
        $c = '';
        $c .= '<input id="z-'.$this->name.'" name="z-'.$this->name.'" type="text" value="'.$render_value.'" placeholder="'. $this->title .'" z-id="' . $this->id . '" z-name="' . $this->name . '" z-storage="' . $this->storage . '"/>';
        echo $c;
    }

}