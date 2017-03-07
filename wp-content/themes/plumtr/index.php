<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>
      <?php 
        if(is_home()){
          bloginfo('name');
        }else{
          wp_title('');
        }
      ?>
    </title>
    <script>
      var baseThemeUrl = "<?php bloginfo('template_url'); ?>";
    </script>
    
    
    
    <!--temp--><!--no php commnts in src-->
    <link href="<?php bloginfo('template_url'); ?>/style.css" rel="stylesheet">
    <?php wp_head(); ?>
  </head>

  <body <?php body_class(); ?> >
    
    
    
    
    
    
    
    hello
    
    
    
    <!--temp-->
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-cookies.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-route.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-touch.min.js"></script>
    
    
    <script src="<?php bloginfo('template_url'); ?>/js/app.js"></script>
    
    
    <?php wp_footer(); ?>
    
  </body>
</html>




