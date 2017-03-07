<?php

add_action('wp_enqueue_scripts', 'plumtrAddScripts');
add_action('after_setup_theme', 'plumtrAddPostFormatsAndFeaturedImages');

//add_action('init', 'plumtrCPT');

if(!function_exists('plumtrAddScripts')){
  function PlumtrAddScripts(){
    //styles
    wp_enqueue_style( 'style', get_stylesheet_uri());
    
    //add scripts, just egzmple
    wp_enqueue_script( 'js', get_template_directory_uri() . '/js/js.js',
    array('jquery'), 1.0, true);
    
    //rest
    wp_localize_script( "js", "plumtrGlobals", array(
      
      'nonce' => wp_create_nonce('authUser'), //action authUser is optional, returns token
      //then can be added to POST as plumtrGlobals.nonce
      //request.setRequestHeader('X-WP-Nonce', plumtrGlobals.nonce)
      
      //baseUrl also in header  
      'siteUrl' => get_site_url(),
    ));
    
    
  }
}

if(!function_exists('plumtrAddPostFormatsAndFeaturedImages')){
  function plumtrAddPostFormatsAndFeaturedImages(){
    
    add_theme_support('post-thumbnails');  
    add_theme_support('post-formats', array('aside', 'link', 'gallery', 'status', 'quote', 'image' )); 
    
    add_image_size('plumtr-thumb', 200, 200, true); //true crop
  }
}

/*
function plumtrCPT(){
  register_post_type();
}
*/




?>