var app = angular.module("fourDVW");


app.controller("LoginCtrl", function loginCtrl ($scope, api_service) {
    "use strict";

    $scope.user = {
        email: null,
        password: null,
        token: null
    }

    $scope.signin = function () {
        console.log("Signing in as ", $scope.user);

        api_service.checkLoginCredentials($scope.user.email, $scope.user.password)
        .then(function (response) {
            console.log("login credentials checked");
            console.log(response.data, response.status);

            if (response.status === 200){
                console.log('Login!');
                // create a cookie
                document.cookie="email=" + $scope.user.email;
                window.location.href = "/dashboard";
            }
        });
    };

    $scope.register = function () {
        console.log("Registering ", $scope.user);
        api_service.createUser($scope.user.email, $scope.user.password)
        .then(function (response){
            console.log("registration complete");
            console.log(response.data, response.status);
        });
    };

    $scope.forgotPassword = function () {
        console.log($scope.user, "Forgot password");
        api_service.forgotPassword($scope.user.email)
        .then(function (response){
            console.log(response.data, response.status);
        });
    };

});
