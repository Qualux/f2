<?php 

namespace Zero\Field;

class Field {

    public $id;
    public $title;

    public function render() {
        $c = '';
        $c .= '<input id="zero-field" name="zero-field" type="text" value=""/>';
        echo $c;
    }

}