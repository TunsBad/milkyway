'use strict';

angular.module('Milkyway')
.constant("baseURL", "https://milkywaytechnologieslimited.herokuapp.com/")

.factory('contactusFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "enquiries/:id", null, {
            'update': { method: 'PUT' }
        });

}]);