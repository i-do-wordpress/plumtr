
/*global $*/
$(function(){
  
  
  //window.onresize = function(){
    //window.location.reload();
  //};
  
  window.onresize = function(){
    window.$('._well').matchHeight();
  };
  

});  
  
Array.prototype.plumInArray = function(e){
  var inArray = false; 
  //console.log(this, typeof this);
  for(var i = 0, len = this.length; i<len; i++){
    if(e === this[i]){
      inArray = true;
      break;
    }
  }
  return inArray;
};  
  
  
  
Array.prototype.plumRemove = function(elemVal){
  var i = this.indexOf(elemVal);
  if(i>-1){
    this.splice(i, 1);
  }
};
  
  
  




