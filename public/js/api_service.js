var app = angular.module("uwh_dictionary");

app.factory("api_service", function api_service ($http) {

    this.getJSON = function (url, data) {
        data = data || {};
        return $http.get(url, { params: data });
    };
    this.postJSON = function (url, data) {
        data = data || {};
        return $http.post(url, data);
    };
    this.putJSON = function (url, data) {
        data || {};
        return $http.put(url, data);
    };
    this.deleteJSON = function (url, data) {
        data || {};
        return $http.delete(url, { params: data });
    };

    return this;
});
