<?php 

namespace Zero\Field;

class Field {

    public function render() {
        $c = '';
        $c .= '<input type="text" value=""/>';
        echo $c;
    }

}