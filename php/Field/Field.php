<?php 

namespace Zero\Field;

class Field {

    public $id;
    public $title;
    public $name;
    public $storage;

    public function load( $id ) {
        $post        = get_post( $id );
        $this->id    = $id;
        $this->title = $post->post_title;
        $this->name  = get_post_meta( $id, 'z-name', 1 );
        $this->storage  = get_post_meta( $id, 'z-storage', 1 );
    }

    public function render( $value = null ) {
        if($value) {
            $render_value = $value;
        } else {
            $render_value = '';
        }
        $c = '';
        $c .= '<input id="z-'.$this->name.'" name="z-'.$this->name.'" type="text" value="'.$render_value.'" placeholder="'. $this->title .'" z-name="' . $this->name . '" z-storage="' . $this->storage . '"/>';
        echo $c;
    }

}