<?php 

/*
 *
 * Save Class
 * 
 * Registers the /f3/v1/save [POST] route.
 * 
 * Saves form data from defined fields as post_meta, user_meta, term_meta and options.
 * 
 * Needs initialization in Plugin Main to hook into rest_api_init.
 * 
 * 
 */

namespace F3;

class Save {

    function __construct() {

        add_action( 'rest_api_init', [$this, 'register_routes'] );

    }

    function register_routes() {

        \register_rest_route( 'f3/v1', '/save', 
            array(
                'methods' => 'POST',
                'callback' => function( \WP_REST_Request $req ) {

                    $params   = $req->get_json_params();
                    
                    $location = $params['location'];
                    $record   = $params['record'];
                    $form     = $params['form'];
                    $values   = $params['values'];

                    $result = $this->process( $location, $record, $form, $values );

                    return new \WP_REST_Response(
                        array(
                            'status'   => 200,
                            'message'  => __( 'Saved.', 'f3' ),
                            'location' => $location,
                            'record'   => $record,
                            'form'     => $form,
                            'values'   => $values,
                            'result'   => $result,
                        )
                    );

                },
                'permission_callback' => function() {
                    return true;
                    //return current_user_can('edit_others_posts');
                },
            )
        );

    }

    function process( $location, $record, $form, $values ) {

        $result = '';

        // Pair the fields and their values.

        $field_values = array();
        foreach( $form['field_groups'] as $field_group ) {
            foreach( $field_group['fields'] as $field ) {
                $field_value = array(
                    'field' => $field['name'],
                    'value' => $values[ $field['name'] ],
                );
                $field_values[] = $field_value;
            }
        }

        foreach( $field_values as $field_value ) {

            switch( $location ) {
                case 'post':
                    update_post_meta( $record, $field_value['field'], $field_value['value'] );
                    $result .= 'Stored post meta key ' . $field_value['field'] . '.';
                    break;
                case 'term':
                    update_term_meta( $record, $field_value['field'], $field_value['value'] );
                    $result .= 'Stored term meta key ' . $field_value['field'] . '.';
                    break;
                case 'user':
                    update_user_meta( $record, $field_value['field'], $field_value['value'] );
                    $result .= 'Stored user meta key ' . $field_value['field'] . '.';
                    break;
                case 'option':
                    update_option( $field_value['field'], $field_value['value'] );
                    $result .= 'Stored option key ' . $field_value['field'] . '.';
                    break;
            }

        }

        return $result;

    }

}