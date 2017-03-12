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
    
    self.data = {};
    self.data.search = '';
    
    self.search = '';
    self.searchObj = {};
    self.searchTextTitleContent = '';
    
    //shoul this be app.filter?
    //called for every item in ngrepeat array
    self.searchTitleContent = function(item){
      //input empty set true for all items show all
      if(!self.searchTextTitleContent){
        return true;
      }else{
        var text = self.searchTextTitleContent.toLowerCase();
        var title = item.title.rendered.toLowerCase();
        var body = item.content.rendered.toLowerCase();
        if(title.indexOf(text) != -1 || body.indexOf(text) != -1){
          return true;
        }
        return false;
      }
    };
    
  
    
    
    
    
    
    
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
    
    
    
      
    
    self.getPartial = function(partial){
      //console.log(baseThemeUrl+'/viewsAngular/partialsAngular/'+partial);
      return baseThemeUrl+'/viewsAngular/partialsAngular/'+partial;
    };
    
    //eg. as variable
    self.partialTiles = baseThemeUrl+'/viewsAngular/partialsAngular/view.tiles.html';
    
    
    
    
    
    
        
  }//end CR
    

    
})();