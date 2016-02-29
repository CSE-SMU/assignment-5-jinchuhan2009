angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})
.factory('BeerData',function(){
   return {data:{}};
   })
.controller('SearchCtrl',function($scope,$http,$state,BeerData){
            $scope.form  = {};
            $scope.search  = function()
            {
            //$state.go('app.beers');
            $http({
                  method: 'GET',
                  url: 'https://salty-taiga-88147.herokuapp.com/beers',
                  params:{
                   name: $scope.form.name,
                   id: $scope.form.id,
                   year: $scope.form.year,
                   abv: $scope.form.abv,
                   isOrganic: $scope.form.organ
                  
                  }
                  }).then(function successCallback(response){
                          BeerData.data = response.data;
                         
                         $state.go('app.beers');
                          });
            }
            })
.controller('BeersCtrl', function($scope,BeerData,$state) {
           //console.log(BeerData.data.data);
           $scope.Beerlist=[];
             //$scope.Beerlist=BeerData.data;
            //$scope.c=BeerData[1].name;
           for (i=0;i<BeerData.data.data.length;i++)
           {
               
            $scope.Beerlist.push( BeerData.data.data[i]
                                    );
            }
            $scope.Back=function()
            {
               $scope.Beerlist=[];         
               $state.go('app.search');
            }
})

.controller('BeerCtrl', function($scope, $stateParams,BeerData,$state) {
   console.log(BeerData);
    for (i=0;i<BeerData.data.data.length;i++)
   {
      if(BeerData.data.data[i].id==$stateParams.id)
      {
         $scope.Beer = BeerData.data.data[i];
      }
   }   
   $scope.Back=function()
   {
       $scope.Beer={};              
      $state.go('app.search');
   }
   });
