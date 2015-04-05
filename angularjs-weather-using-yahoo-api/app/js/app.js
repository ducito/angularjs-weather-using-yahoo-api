'use strict';

var weatherApp = angular.module('weatherApp', [])
    .value('HOST', '')
    .controller('weatherCtrl', ['$scope', 'weatherService', function ($scope, weatherService) {
        function fetchWeather(zip) {
            weatherService.getWeather(zip).then(function (data) {
                $scope.place = data;
                if (data != null) {
                    $scope.isloaded = true;
                } else {
                    $scope.isloaded = false;
                }
            });
        }

        function fetchWeatherByCityName(cityname) {
            weatherService.getWeatherByCityName(cityname).then(function (data) {
                $scope.place = data;
                if (data != null) {
                    $scope.isloaded = true;
                } else {
                    $scope.isloaded = false;
                }
            });
        }

        $scope.reset = function () {
            $scope.isloaded = false;
            $scope.place = '';
        }

        $scope.c2f = function (c) {
            return (9 / 5 * c + 32).toFixed(0);
        }
        $scope.f2c = function (f) {
            return (5 / 9 * (f - 32)).toFixed(0);
        }
        //fetchWeather('84105');

        $scope.findWeather = function (zip) {
            $scope.isloaded = false;
            $scope.place = '';
            fetchWeather(zip);
        };
        $scope.findWeatherByCityName = function (cityname) {
            $scope.isloaded = false;
            $scope.place = '';
            fetchWeatherByCityName(cityname);
        };
    }])
    .factory('weatherService', ['$http', '$q', function ($http, $q) {
        function getWeather(zip) {
            var deferred = $q.defer();
            $http.get('https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20weather.forecast%20WHERE%20location%3D%22'
            + zip + '%22&format=json&diagnostics=true&callback=')
                .success(function (data) {
                    deferred.resolve(data.query.results.channel);
                })
                .error(function (err) {
                    console.log('Error retrieving markets');
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        function getWeatherByCityName(cityname) {
            var deferred = $q.defer();
            $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'
            + cityname + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
                .success(function (data) {
                    deferred.resolve(data.query.results.channel);
                })
                .error(function (err) {
                    console.log('Error retrieving markets');
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        return {
            getWeather: getWeather,
            getWeatherByCityName: getWeatherByCityName
        };
    }]);