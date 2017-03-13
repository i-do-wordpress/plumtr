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
    
    self.data = {};
    self.data.search = '';
    
    self.search = '';
    self.searchObj = {};
    self.searchTextTitleContent = '';
    
    self.activeCats = [7]; //4dairy, 7grains
    self._activeCats = []; //4dairy, 7grains
    self.catFilter = {};
    
    self.allWpCats = [];
    
    self.filterByCat_Id = {};
    self.filterByCat_Id.categories = '';
    
    
    self.allFilter = {};
    self.allFilter.checked = true;
     
    
    
    
    //console.log(self.catFilter);
    
    self.postCat = {};
    self.postCat.active = true;
    self.postCat.name = 'dairy';
    self.postCat.id = 4;
    
    
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
    
  
    self.filterByCatId = function(item){
      var show = false;
      var cats = item.categories;
      for(var i=0, len=cats.length; i<len; i++){
        for(var n=0, _len=self.activeCats.length; n<_len; n++){
          //second for loop for ative
          if(cats[i] === self.activeCats[n]){
            show = true;
            break;
          }
        }  
      }
      return show;
    };
    
    
    
    
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
        console.log(self.cats);
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
    
    
    
    
    self.displayCat = function(id){
      //console.log(this); //no it is CTRL
      console.log('aa', id); //no it is CTRL
    };
    
    
    
    self.toggleAll = function(){
      //console.log(self.allFilter.checked);
      var nodes = angular.element(document).find('.cat-filter-checkbox input');
      var len = nodes.length;
      if(self.allFilter.checked){
        for(var i = 0; i<len; i++){
          var node = nodes[i];
          console.log(node);
        }
      }
    };
    
    /*
    (function initCatsCheckboxes(){
      
      $scope.$watch(function(){
        var nodes = angular.element(document).find('.cat-filter-checkbox input');
        var len = nodes.length;
        return len;
      }, function(){
        var nodes = angular.element(document).find('.cat-filter-checkbox input');
        var len = nodes.length;
        var checked = self.allFilter.checked;
        console.log(len, checked);
        for(var i = 0; i<len; i++){
          var node = nodes[i];
          if(checked){
            angular.element(node).attr('checked', true);
          }else{
            angular.element(node).attr('checked', false);
          }
        }
        $scope.$apply();
      });
      
      
      
      
    })();
    */
    
    
    /*
    var _old = 0;
    var _new = 0;
    var _stop = setInterval(function(){
      _new = self.allWpCats.length;
      console.log(_new, _old);
      if(_new === _old && _new>0){
        clearInterval(_stop);
        
        (function doStuff(){
          var nodes = angular.element(document).find('.cat-filter-checkbox input');
          var len = nodes.length;
          var checked = self.allFilter.checked;
          console.log(len, checked);
          for(var i = 0; i<len; i++){
            var node = nodes[i];
            if(checked){
              $(node).attr('checked', true);
            }else{
              $(node).attr('checked', false);
            }
          }
        $scope.$apply();
      })();
        
        
      }
      _new = _old < _new ? _new : _old;
      _old = _new;
      
    }, 1000);  
    
    */
    
    
    /*
    (function initCatsCheckboxes(){
      
      $scope.$watch(function(){
        var nodes = angular.element(document).find('.cat-filter-checkbox input');
        var len = nodes.length;
        return len;
      }, function (){
        var nodes = angular.element(document).find('.cat-filter-checkbox input');
        var len = nodes.length;
        var checked = self.allFilter.checked;
        console.log(len, checked);
        for(var i = 0; i<len; i++){
          var node = nodes[i];
          if(checked){
            angular.element(node).attr('checked', true);
          }else{
            angular.element(node).attr('checked', false);
          }
        }
       // $scope.$apply();
      });
      
      
      
      
    })();
    */
    
    
    
    self.activeRadio = function(activeCat, $element){
      console.log(activeCat, $element);
    };
    
    
    
        
  }//end CR
    

    
})();