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

var Phase_Options = [
    {name: "Wall_Corner", x: 25, y: 25, width:5, height: 5},
    {name: "Puck_Collection", x: 0, y: 0, width: 5, height: 5},
    {name: "Puck_Distribution", x: 0, y: 0, width: 5, height: 5},
    {name: "Formation_Displacement", x: 0, y: 0, width: 5, height: 5}
];

app.controller("HomeCtrl", function homeCtrl ($scope, api_service) {
    "use strict";

    $scope.selectedPhase = "Puck_Collection";

    $scope.populatePhaseButtons = function () {
        Phase_Options.forEach(function(phase) {
            console.log(phase);
            $($scope.UIButton(phase.name, phase.x, phase.y, phase.width, phase.height)).appendTo("#top-panel");
        });
    }


    $scope.UIButton = function (name, left, top, width, height) {
        return '<div id="'+ name +'" class="phase-button" style="position: absolute; left: '+ left +'%; top: '+ top +'%; width: '+ width +'%; height: '+ height +'%"></div>';
    }

    $scope.populatePhaseButtons();
});
