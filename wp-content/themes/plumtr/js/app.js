;(function(){
  
  
  /*global angular, baseThemeUrl, baseRest*/  
  var p = angular.module('plumtr', ['ngRoute']);  
  
  /////////////////////////////////////////
  
  p.config(['$locationProvider', function($locationProvider){
    $locationProvider.hashPrefix('');
    //$locationProvider.html5Mode(true);
  }]);
  
  
  p.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/',{
        //controller: 'CtrlHome',
        //controllerAs: 'CH',
        templateUrl: baseThemeUrl+'/viewsAngular/home.html'
      });
  }]);

  
  
  
  
  
  
  
  
  
  
  
  
  
  
    
  p.controller('CtrlRoot', CtrlRoot);
  
  p.$inject = ['$http'];
  
  function CtrlRoot($http){
    var self = this;
    self.posts = [];
    
    $http.get(baseRest+'/posts/').then(function(response){
      if(response.data.length){
        self.posts = response.data;
        //console.log(self.posts[0]);
      }
    });
    
    
        
  }//end CR
    

    
})();