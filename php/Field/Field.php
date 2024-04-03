<?php 

namespace Zero\Field;

class Field {

    public $id;
    public $title;

    public function load( $id ) {
        $post        = get_post( $id );
        $this->id    = $id;
        $this->title = $post->post_title;
    }

    public function render() {
        $c = '';
        $c .= '<input id="zero-field" name="zero-field" type="text" value="" placeholder="'. $this->title .'"/>';
        echo $c;
    }

}