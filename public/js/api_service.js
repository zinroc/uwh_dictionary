var app = angular.module("fourDVW");

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

    this.uploadUnit = function (unit) {
        return this.putJSON("/api/unit/upload", {uuid: unit});
    };

    this.getFullUnitInfo = function (unit) {
        return this.getJSON("/api/unit/full", {uuid: unit});
    };

    this.deleteRoom = function (room) {
        return this.deleteJSON("/api/room", {uuid: room});
    };

    this.deleteParking = function (parking) {
        return this.deleteJSON("/api/parking", {uuid: parking});
    };
    
    this.loadRooms = function (unit) {
        return this.getJSON("/api/room", {uuid: unit});
    };

    this.loadParking = function (unit) {
        return this.getJSON("/api/parking", {uuid: unit});
    };

    this.createParking = function (unit, name, type) {
        return this.postJSON("/api/parking", {uuid: unit, parking_name: name, parking_type: type});
    };

    this.createRoom = function (unit, type, width, length) {
        return this.postJSON("/api/room", {uuid: unit, room_type: type, room_width: width, room_length: length});
    };

    this.updateParking = function (parking, name, type) {
        return this.putJSON("/api/parking", {uuid: parking, parking_name: name, parking_type: type});
    };

    this.updateRoom = function (room, type, width, length) {
        return this.putJSON("/api/room", {uuid: room, room_type: type, room_width: width, room_length: length});
    };

    this.deleteUnit = function (unit) {
        return this.deleteJSON("/api/unit", {uuid: unit});
    };

    this.loadUnits = function (project_id) {
        return this.getJSON("/api/unit", {uuid: project_id});
    };

    this.loadNextProjects = function (id) {
        return this.getJSON("/api/project/next", {id: id});
    };

    this.loadPrevProjects = function (id) {
        return this.getJSON("/api/project/prev", {id: id});
    };

    this.deleteProject = function (id) {
        return this.deleteJSON("/api/project", {uuid: id});
    };

    this.updateProject = function (id, name, latitude, longitude, address) {
        return this.putJSON("/api/project", {uuid: id, project_name: name, latitude: latitude, longitude: longitude, address: address});
    };

    this.loadProjects = function () {
        return this.getJSON("/api/project");
    };

    this.loadRecentProjects = function () {
        return this.getJSON("/api/project/recent");
    };

    this.createProject = function (name, latitude, longitude, address) {
        return this.postJSON("/api/project", {project_name: name, latitude: latitude, longitude: longitude, address: address});
    };

    this.createUnit = function (project, name, type, description, ac, heat, floor, taxes, square_feet) {
        return this.postJSON("/api/unit", {uuid: project, unit_name: name, unit_type: type, description: description, ac: ac, heat: heat, floor: floor, taxes: taxes, square_feet: square_feet});
    };

    this.updateUnit = function (unit, name, type, description, ac, heat, floor, taxes, square_feet) {
        return this.putJSON("/api/unit", {uuid: unit, unit_name: name, unit_type: type, description: description, ac: ac, heat: heat, floor: floor, taxes: taxes, square_feet: square_feet});
    };

    this.updatePassword = function(password) {
        return this.putJSON("/api/user", {password: password});
    };

    this.createUser = function (email, password) {
        return this.postJSON("/api/user", {email: email, password: password});
    };

    this.loadUserInfo = function (email) {
        return this.getJSON("/api/user", {email, email});
    };

    this.deleteUser = function () {
        return this.deleteJSON("/api/user");
    };

    this.checkLoginCredentials = function (email, password) {
        return this.getJSON("/api/user/login", {email: email, password: password});
    };

    this.logout = function () {
        return this.putJSON("/api/user/logout");
    };

    this.testCatchChain = function () {
        return this.postJSON("/api/test");
    };

    this.forgotPassword = function (email) {
        return this.getJSON("/api/user/recover", {email: email});
    };

    return this;
});
