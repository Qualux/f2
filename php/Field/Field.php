<?php 

namespace Zero\Field;

class Field {

    public $id;
    public $title;
    public $name;
    public $storage;

    public function load( $id ) {
        $post          = get_post( $id );
        $this->id      = $id;
        $this->title   = $post->post_title;
        $this->name    = get_post_meta( $id, 'z_field_name', 1 );
        $this->storage = get_post_meta( $id, 'z_field_storage', 1 );
        $this->type    = get_post_meta( $id, 'z_field_type', 1 );
    }

    public function render( $value = null ) {
        if($value) {
            $render_value = $value;
        } else {
            $render_value = '';
        }
        $c = '';
        $c .= '<input id="z-'.$this->name.'" name="z-'.$this->name.'" type="text" value="'.$render_value.'" placeholder="'. $this->title .'" z-id="' . $this->id . '" z-name="' . $this->name . '" z-storage="' . $this->storage . '"/>';
        echo $c;
    }

}