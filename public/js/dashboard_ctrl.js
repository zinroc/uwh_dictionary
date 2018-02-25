var app = angular.module("fourDVW");

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

app.controller("DashboardCtrl", function dashboardCtrl ($scope, api_service) {
    "use strict";

    $scope.loadUserInfo = function () {
        api_service.loadUserInfo($scope.user.email)
        .then((response) => {
            console.log("loaded user");
            console.log(response.data, response.status);
        })
    }; 

    $scope.loadUserInfo();

});
