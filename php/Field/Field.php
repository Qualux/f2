<?php 

namespace Zero\Field;

class Field {

    public $id;
    public $title;

    public function render() {
        $c = '';
        $c .= '<input type="text" value=""/>';
        echo $c;
    }

}