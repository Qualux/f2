<?php 

namespace F3\Record;

class RecordModel {

    public $type = 'post';

    public function __construct() {


    }

    function set_record_type( $type ) {

        $this->type = $type;
        
    }

}