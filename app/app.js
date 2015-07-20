'use strict';
var companyApp = angular.module('companyApp', ['solo.table', 'ngRoute']);

companyApp.config(['$routeProvider',function($routeProvider){

  $routeProvider.when('/',{
    templateUrl:'partials/all-info-company.html',
    controller:'ListCtrl'
  })
      .when('/profile/:profileid',{
        templateUrl:'partials/profile.html',
        controller:'ProfileController'
      })
      .otherwise({
        //default routing
        redirectTo:'/'
      });
}]);

companyApp.controller('ListCtrl', function ($scope, $http) {
  $http.get('http://dev-api.adrout.net/for_test').success(function(data) {
    $scope.lists = data;
    $scope.view = 'table';
  });
});

companyApp.controller('ProfileController',function($scope,$http,$log,$routeParams){

  $scope.profileid = $routeParams.profileid;

  $scope.companyInfo={};

  $scope.notFound = false;

    $http.get('http://dev-api.adrout.net/for_test').success(function(data){

        if(data.notFound === true)
        {

          $scope.notFound = true;
          return;
        }

        $scope.companyInfo=data[$scope.profileid-1];

        $log.info(data);
      })
      .error(function(data){
        //Log error Data
        $log.info(data);
      });
});


companyApp.directive('pbTableCompany', function () {
  return {
    restrict: 'E',
    scope: {
      list: '='
    },
    templateUrl: 'partials/new-teg.html'
  }
});

