;(function(){
  
  
  /*global angular, baseThemeUrl, baseRest $*/  
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
    self.cats = [];
    
    self.searchTextTitleContent = '';
    
    self.filterByCat_Id = {};
    self.filterByCat_Id.categories = '';
    
    self.multiChecks = [];
    self.multiChecksAll = false;
    
    self.radioFilter = true;
    self.checkboxFilter = false;
    
    
    $http.get(baseRest+'/posts?per_page=50').then(function(response){
      if(response.data.length){
        self.posts = response.data;
        //console.log(self.posts[0]);
        //console.log(self.posts.length);
      }
    });
    
    
    $http.get(baseRest+'/categories').then(function(response){
      if(response.data.length){
        self.cats = response.data;
        self.multiChecksAll = true;
        self._toggleAll();
      }
    });
    
    
    
    self.toggleFilter = function(filterType){
      if(filterType === 'radio'){
        self.radioFilter = true;  
        self.checkboxFilter = false;  
      }
      if(filterType === 'checkbox'){
        self.radioFilter = false;  
        self.checkboxFilter = true;  
      }
    };
  
  
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
    
    
    self._filterByCatCheckbox = function(item){
      var show = false;
      var cats = item.categories;
      for(var i=0, len=cats.length; i<len; i++){
        for(var n=0, _len=self.multiChecks.length; n<_len; n++){ 
          //second for loop for ative
          if(cats[i] === self.multiChecks[n]){
            show = true;
            break;
          }
        }  
      }
      return show;
    };
    
    
    
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
    
    
    
    
    
    //dont change checked attr !!! of nodes, change nodes models!
    //think in models!!!! it updates itself!!!
    
    self._toggleAll = function(){
      
      self.multiChecks = [];
      
      if(self.multiChecksAll){
        for(var i = 0, len = self.cats.length; i<len; i++){
          var id = self.cats[i].id;
          self.multiChecks.push(id);
        }
      }else{
        for(var _i = 0, _len = self.cats.length; _i<_len; _i++){
          self.multiChecks.push(false); //otherwise array contains false vals
        }
      }
    };
    

    
    
    
    
    
    //-----------------------------------------------------------

    //no need check for node, or node attr, just watch models!
    
    //instead of watch - faster 
    //
    //no need for broadcast as these vars are watched/updated by view
    self.checkboxClicked = function(){
      var all = self.multiChecks;
      var len = all.length;
      for(var i=0; i<len; i++){
        if(all[i] == false){
          self.multiChecksAll = false;
          break;
        }else{
          self.multiChecksAll = true;
        }
      }
    };
    
    
    
    /*
    //broadcast make it faster?
    //ok but slow?
    $scope.$watch(function(){
      var all = self.multiChecks;
      var len = all.length;
      var notAll = false;
      for(var i = 0; i<len; i++){
        if(all[i] == false){
          notAll = true;
          break;
        }else{
          notAll = false;
        }
      }
      return notAll;
    }, function(newVal){
      //console.log(newVal);
      if(newVal){
        self.multiChecksAll = false;
      }else{
        self.multiChecksAll = true;
      }
    });
    
    */
    //----------------------------------------------------------
    
    
    
        
  }//end CR
    
  
  
  
  
    
})();