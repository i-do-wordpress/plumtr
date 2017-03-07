
/*global $*/
$(function(){
  
  //match wells height
  var _len = 0;
  var stop = setInterval(function(){
    var len = $('._well').length;
    if(len && (_len === len)){
      clearInterval(stop);
      
      $('._well').matchHeight(); //ok
      
      /* //todo: might try set common height manually based on highest value
      $('._well').each(function(i){
        console.log(i, this.offsetHeight);
        console.log(i, this.outerHeight(true));
      });    
      */
      
      return;
    }else{
      _len = len;
    }
  }, 1000/30);
  
  
  
  
  
});



