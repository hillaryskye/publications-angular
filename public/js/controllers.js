app.controller("HomeCtrl", ["$scope", "$http",  "$routeParams", "$location", "$route", function($scope, $http, $routeParams, $location, $route) {
  $http.get('http://localhost:8080/api/publications')
  .then(function(response) {
    $scope.publications = response.data;
    console.log('results', $scope.publications)
  }, function(response) {
    console.log('error')
  });
}])

app.controller("NewCtrl", ["$scope", "$routeParams", "$http", "$route", "$location", function($scope, $routeParams, $http, $route, $location) {
  console.log('from newCtrl')

  $scope.addPublication = function(publication) {
    console.log('publication', publication)
      var publication = {
        name: $scope.publication.name,
        desc: $scope.publication.desc,
        topics: $scope.publication.topics,
        price: $scope.publication.price,
        physical: $scope.publication.physical,
        schedule: $scope.publication.schedule
      }
      // $http.post('http://localhost:8080/api/publications', publication)
      $http.post('process.env.MONGOLAB_URI/api/publications', publication)
      .then(function(response) {
        console.log(response)
        $location.path('/');
      }), function(response) {
        console.log("Invalid URL")
      $route.reload()
      }
    }
  }])

  app.controller("ShowCtrl", ["$scope", "$routeParams", "$http", "$route", "$location", function($scope, $routeParams, $http, $route, $location) {
  console.log('routeParams', $routeParams.id)
  $http.get('http://localhost:8080/api/publications/' + $routeParams.id)
  .then(function(response) {
    console.log(response)
    $scope.publication = response.data;
    console.log('response.data', response.data)
  }, function(response) {
    console.log('error')
  });

  $scope.newSubscription = function(publication) {
    $scope.addSubscription = false;
    console.log('newSubscription')
    console.log('publication', publication)

  var subscription = {
    name: publication.subscription.name,
    address: publication.subscription.address,
    email: publication.subscription.email
  }

    console.log('subscription', subscription)
    var subscriptions = publication.subscriptions || [];

    subscriptions.push(subscription);
      publication.subscription.name = null
      publication.subscription.address = null
      publication.subscription.email = null

  publication.subscriptions = subscriptions

  $http.put('http://localhost:8080/api/publications/' + publication._id, publication)
    .then(function(response) {
      console.log("added");
  }, function(response) {
    console.log("Invalid URL");
    });
  };

  $scope.deleteSubscription = function(publication, subscribe) {
    console.log('Deleting')
    console.log('subscribe', subscribe)
    var index = publication.subscriptions.indexOf(subscribe)
    console.log('index', index)
    publication.subscriptions.splice(index, 1)
    $http.put('http://localhost:8080/api/publications/' + publication._id, publication)
    .then(function(response) {
       console.log("deleted.");
     }, function(response) {
       console.log("Invalid URL");
     });
   }
}])

app.controller("EditCtrl", ["$scope", "$routeParams", "$http", "$route", "$location", function($scope, $routeParams, $http, $route, $location) {
console.log('from Editctrl')
console.log('routeparams', $routeParams.id)

$http.get('http://localhost:8080/api/publications/' + $routeParams.id)
  .then(function(response) {
    console.log(response)
    $scope.publication = response.data;
    console.log('response.data', response.data)
  }, function(response) {
    console.log('error')
  });

  $scope.editPublication = function(publication) {
    console.log('publication',publication)
    console.log('id', $routeParams.id)

    var publication = {
      name: $scope.publication.name,
      desc: $scope.publication.desc,
      topics: $scope.publication.topics,
      price: $scope.publication.price,
      physical: $scope.publication.physical,
      schedule: $scope.publication.schedule
    }

    $http.put('http://localhost:8080/api/publications/' + $routeParams.id, publication)
      .then(function(response) {
       console.log("update");
       $location.path('/');
     }, function(response) {
       console.log("Invalid URL");
    });
  }

  $scope.deletePublication = function(publication) {
    console.log('delete', publication)
    $http.delete('http://localhost:8080/api/publications/' + publication._id, publication)
    .then(function(response) {
      $route.reload()
    }, function(response) {
      console.log("Invalid URL")
      })
    }
}])
