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

var Phase_Options = [];

var Phase_Keys = [];

var Populated_Phase_Keys = [];
app.controller("HomeCtrl", function homeCtrl ($scope, api_service) {
    "use strict";

    $scope.root = "https://uwhdictionary.herokuapp.com";
    // $scope.root = "http://localhost:8081";

    $scope.urlPhase = null;
    $scope.urlKey = null;

    $scope.setStateFromURLParams = function () {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var p = url.searchParams.get("phase");
        var k = url.searchParams.get("key");
        // console.log(p, k, "??!?!?");
        if (typeof p != 'undefined' && typeof k != 'undefined') {
            $scope.urlPhase = parseInt(p);
            $scope.urlKey = parseInt(k);
        }
    };

    $scope.getPhases = function () {
        api_service.getPhases()
        .then(function(response) {
            console.log("got phases");
            console.log(response.data, response.status);
            Phase_Options = response.data;
            if ($scope.urlPhase) {
                for (var i=0; i<response.data.length; i++){
                    var phase = response.data[i];
                    if (phase.id === $scope.urlPhase) {
                        $scope.selectedPhase = phase;
                    }
                }
            } else {
                $scope.selectedPhase = response.data[3];
            }
            $scope.populatePhaseButtons();
            $scope.getPhaseKeys();
        });
    };

    $scope.getPhaseKeys = function () {
        api_service.getPhaseKeys($scope.selectedPhase.id)
        .then(function(response) {
            console.log("got phase keys");
            console.log(response.data, response.status);
            $scope.depopulatePhaseKeys();
            Phase_Keys = response.data;
            $scope.populatePhaseKeys();
        });
    };

    $scope.selectedPhase = null;

    $scope.depopulatePhaseKeys = function () {
        Phase_Keys.forEach(function(key) {
            $(key.el).remove();
        });
        return;
    };

    $scope.selectedPhaseKey = null;


    $scope.selectPhaseKey = function (key) {
        $scope.selectedPhaseKey = key;
        $scope.getPhaseKeyValues();
    };

    $scope.getPhaseKeyValues = function () {
        api_service.getPhaseKeyValues($scope.selectedPhaseKey.id)
        .then(function(response) {
            console.log("got phase key values");
            console.log(response.data, response.status);
            $scope.selectedPhaseKey.values = response.data;
            $("#phaseKeyValueModal").modal()
        });
    };

    $scope.populatePhaseKeys = function () {
        Phase_Keys.forEach(function(key) {
            var el = $($scope.UIButton(key.name, key.x, key.y, key.width, key.height)).appendTo("#phase-panel");
            key.el = el;

            $(key.el).click(function() {
                $scope.selectPhaseKey(key);
            });
            if ($scope.urlKey === key.id) {
                $scope.selectPhaseKey(key);
                $scope.urlKey = null;
                $scope.urlPhase = null;
            }
        });
        return;
    };

    $scope.populatePhaseButtons = function () {
        Phase_Options.forEach(function(phase) {
            var el = $($scope.UIButton(phase.name, phase.x, phase.y, phase.width, phase.height)).appendTo("#top-panel");

            $(el).click(function() {
                $scope.selectPhase(phase);
                $("html, body").animate({
                    scrollTop: $("#phase-panel").offset().top
                }, 500);
            });

        });
    }

    $scope.UIButton = function (name, left, top, width, height) {
        let s1 = '<div id="'+ name +'" class="phase-button" style="position: absolute; left: '+ left +'%; top: ';
        let s2 = top +'%; width: '+ width +'%; height: '+ height +'%"';
        let s3 = '></div>';
        return s1 + s2 + s3;
    }

    $scope.selectPhase = function(phase) {
        if ($scope.selectPhase && $scope.selectPhase.id === phase.id) {
            return;
        }

        $scope.selectedPhase = phase;
        $scope.$apply();

        $scope.getPhaseKeys();
    }

    $scope.setStateFromURLParams();
    $scope.getPhases();
});
