<?php

add_action('wp_enqueue_scripts', 'plumtrAddScripts');
add_action('after_setup_theme', 'plumtrAddPostFormatsAndFeaturedImages');

//add_action('init', 'plumtrCPT');

add_filter('rest_prepare_post', 'plumtrCustomizeRestResponse', 10, 3);



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
    add_image_size('300x180', 300, 180, true); //true crop
    add_image_size('100x100', 100, 100, true); //true crop
  }
}

/*
function plumtrCPT(){
  register_post_type();
}
*/


//adding extra fields to make one api request
//initially /posts request returned only image id
//and second api call needed
if(!function_exists('plumtrCustomizeRestResponse')){
  function plumtrCustomizeRestResponse($data, $post, $request){
  	
  	//get form $post
  	$thumbId = get_post_thumbnail_id( $post->ID );
	  
	  $thumb100x100Url = wp_get_attachment_image_src( $thumbId, '100x100' );
	  $thumb300x180Url = wp_get_attachment_image_src( $thumbId, '300x180' );
	  $thumbMediumUrl = wp_get_attachment_image_src( $thumbId, 'medium' );
	  
	  $postCats = get_the_category($post->id);
	  
	  
	  
	  //add to json
	  $_data = $data->data;
	  
	  $_data['thumb100x100Url'] = $thumb100x100Url[0];
	  $_data['thumb300x180Url'] = $thumb300x180Url[0];
	  $_data['thumbMediumUrl'] = $thumbMediumUrl[0];
	  
	  //in rest wp json there is already 'categories' = [1,2,3] property which holds [] of cat ids
	  //to not doing another ajax based on ids we get cats names here:
	  $_data['cats'] = $postCats;
	  
	  
	  $data->data = $_data;
  	return $data;

  }
}
 








?>