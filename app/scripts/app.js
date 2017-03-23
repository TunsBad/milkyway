'use strict';

angular.module('Milkyway', ['ui.router','ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller: 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            });
        
        $urlRouterProvider.otherwise('/');
    })
;
