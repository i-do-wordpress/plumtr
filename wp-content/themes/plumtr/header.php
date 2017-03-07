<!DOCTYPE html>
<html lang="en" ng-app="plumtr" ng-controller="CtrlRoot as CR">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>
      <?php 
        if(is_home()){
          bloginfo('name');
        }else{
          wp_title('|', true, 'right');
        }
      ?>
    </title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.css" />
    
    
    <script>
      var baseThemeUrl = "<?php bloginfo('template_url'); ?>";
      var baseUrl = "<?php echo get_site_url(); ?>";
      var baseRest = baseUrl + '/wp-json/wp/v2';
    </script>
    
    
    <?php
    /*
    <!--no php commnts in src-->
    <link href="<?php bloginfo('template_url'); ?>/style.css" rel="stylesheet">
    */
    ?>
    
    <?php wp_head(); ?>
  </head>

  <body <?php body_class(); ?> >




