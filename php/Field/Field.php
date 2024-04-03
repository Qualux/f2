<?php 

namespace Zero\Field;

class Field {

    public $id;
    public $title;
    public $name;

    public function load( $id ) {
        $post        = get_post( $id );
        $this->id    = $id;
        $this->title = $post->post_title;
        $this->name  = get_post_meta( $id, 'z-name', 1 );
    }

    public function render() {
        $c = '';
        $c .= '<input id="zero-field" name="zero-field" type="text" value="" placeholder="'. $this->title .'" z-name="' . $this->name . '"/>';
        echo $c;
    }

}