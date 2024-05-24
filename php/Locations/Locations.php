<?php 

/*
 * Locations 
 * 
 * Detects if F3 Forms are assigned to an admin location.
 * 
 */

namespace F3\Locations;
use F3\FieldGroup\FieldGroup;
use F3\Metabox\Metabox;

class Locations {

    public function __construct() {

        add_action('current_screen', [$this, 'run_location_check']);

        

    }

    public function run_location_check() {

        echo 'Running location check...';

        add_action( 'category_edit_form_fields', function() {
            echo 'TAX EDITOR FIELDS';
        });
        

        $screen = get_current_screen();

        var_dump( $screen->base );

        // Check for post editor or Gutenberg editor
        if ($screen->is_block_editor) {
            // This is a post editor screen
            $this->handle_block_editor();
        }

        if ($screen->base === 'post' || $screen->base === 'edit') {
            // This is a post editor screen
            $this->handle_post_editor();
        }

        // Check for taxonomy editor
        if ($screen->base === 'edit-tags') {
            // This is a term editor screen
            $this->handle_taxonomy_editor( $screen );
        }

        // Check for term editor
        if ($screen->base === 'term') {
            // This is a term editor screen
            $this->handle_term_editor( $screen );
        }

        // Check for user form
        if ($screen->base === 'user-edit' || $screen->base === 'profile') {
            // This is a user form screen
            $this->handle_user_form();
        }
    }

    function handle_block_editor() {

        

        print "Detected block editor 1111111111";
    }

    function handle_post_editor() {

        $mb = new Metabox();
        $form = new \stdClass;
        $form->id = 100;
        $form->title = 'Test Form 1';
        $form->location_post_type = 'classic';
        $mb->form_meta_box( $form );

    }

    /* Taxonomy and Terms Locations. */

    function handle_taxonomy_editor( $screen ) {

        print "Detected taxonomy editor 5555555";
        var_dump($screen->taxonomy);

        add_action( 'category_edit_form_fields', function() {
            echo 'TAX EDITOR FIELDS';
        });

    }

    

    function handle_term_editor( $screen ) {
        print "Detected term editor 222222222";

        echo '<pre>';
        var_dump($screen);
        echo '</pre>';

        add_action( $screen->taxonomy.'_edit_form_fields', function() {
            echo 'TERM EDITOR FIELDS';
            echo '<div class="f3-form" style="margin-bottom: 100px; border-bottom:solid 10px red;"></div>';
            echo '<div class="f3-form" style="margin-bottom: 100px; border-bottom:solid 10px red;"></div>';
        });
    }

    function handle_user_form() {
        print "Detected user form 3333333";
    }

}