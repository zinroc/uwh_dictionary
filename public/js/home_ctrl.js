var app = angular.module("uwh_dictionary");

var getCookie = function (key) {
        var pairs = document.cookie.split("; ");
        var o = {}, k, v;
        for (var i = 0; i < pairs.length; i++) {
            k = pairs[i].split("=")[0];
            v = pairs[i].split("=")[1];
            o[k] = v;
        }
        return o[key];
    }

app.controller("HomeCtrl", function homeCtrl ($scope, api_service) {
    "use strict";

    $scope.hello = "world";
});
