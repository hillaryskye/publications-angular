app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    })
    .when('/publications/new', {
      templateUrl: 'partials/new.html',
      controller: 'NewCtrl'
    })
    .when('/publications/:id/edit', {
      templateUrl: 'partials/edit.html',
      controller: 'EditCtrl'
    })
    .when('/publications/:id', {
      templateUrl: 'partials/show.html',
      controller: 'ShowCtrl'
    })
    .otherwise({ redirectTo: '/' });
}]);
