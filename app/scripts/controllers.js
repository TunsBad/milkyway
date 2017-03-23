'use strict';

angular.module('Milkyway')

.controller('HomeController', ['$scope', 'contactusFactory', function($scope, contactusFactory) {

	$scope.contactus = {
		name: "",
		email: "",
		phone: "",
		subject: "",
		comments: ""
	};

	$scope.sendInformation = function() {
		contactusFactory.save($scope.contactus)
        $scope.contactus = { name: "", email: "", phone: "", subject: "", comments: "" };
	    $scope.contactusForm.$setPristine();
	};

}])

.controller('HeaderController', ['$scope', '$http', function($scope, $http) {

	var loadTime = function() {
        $http.get('http://api.timezonedb.com/v2/get-time-zone?key=E9LL1P7GXA7Z&format=json&by=zone&zone=Africa/Accra') 
            .then(
                function(response) {
                    $scope.timeingh = response.data.formatted;
                    $scope.abbreviation = response.data.abbreviation;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
    };

    loadTime();
    setInterval(loadTime, 4000);

}]);
