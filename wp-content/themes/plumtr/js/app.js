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
  
  p.$inject = ['$http', '$scope', '$rootScope'];
  
  function CtrlRoot($http, $scope, $rootScope){
    var self = this;
    self.posts = [];
    
    $http.get(baseRest+'/posts?per_page=20').then(function(response){
      if(response.data.length){
        self.posts = response.data;
        //console.log(self.posts[0]);
        //console.log(self.posts.length);
      }
    });
    
    
    
    //set even height for all items
    $scope.$watch(
      function(){
        var wells = angular.element(document).find('._well');
        var len = wells.length;
        return len;
      },
      function(newVal, oldVal){
        var wells = angular.element(document).find('._well');
        angular.element(document).find('img.thumb100').load(
          function(){
            wells.matchHeight();  
          }  
        );
      }
    ); //end watch
    
    
    
      
    
    
    
    
    
    
    
    
    
    
        
  }//end CR
    

    
})();