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
        

        $screen = get_current_screen();

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
            $this->handle_taxonomy_editor( $screen );
        }

        // Check for term editor
        if ($screen->base === 'term') {
            $this->handle_term_editor( $screen );
        }

        // Check for user form
        if ($screen->base === 'user-edit' || $screen->base === 'profile') {
            $this->handle_user_form();
        }
    }

    function handle_block_editor() {

        // @TODO handle block editor location output.

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

        add_action( $screen->taxonomy.'_add_form_fields', function() {
            echo '<div class="f3-form" style="margin-bottom: 100px; border-bottom:solid 10px red;"></div>';
        });

    }

    function handle_term_editor( $screen ) {

        add_action( $screen->taxonomy.'_edit_form_fields', function() {
            echo '<tr>';
            echo '<td>';
            echo '<div class="f3-form" style="margin-bottom: 100px; border-bottom:solid 10px red;"></div>';
            echo '</td>';
            echo '</tr>';
        }, 50);

    }

    function handle_user_form() {
        // @TODO handle user form location output.
    }

}