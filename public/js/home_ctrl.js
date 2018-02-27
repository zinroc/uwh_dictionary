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
    {name: "Wall_Corner", x: 20.7, y: 24, width:12.2, height: 9, el: null},
    {name: "Puck_Collection", x: 75, y: 47.2, width: 12, height: 12, el: null},
    {name: "Puck_Distribution", x: 64.2, y: 79.5, width: 11.7, height: 11.6, el: null},
    {name: "Formation_Displacement", x: 86, y: 79.5, width: 11.7, height: 11.6, el: null}
];

app.controller("HomeCtrl", function homeCtrl ($scope, api_service) {
    "use strict";

    $scope.selectedPhase = "Puck_Collection";

    $scope.populatePhaseButtons = function () {
        Phase_Options.forEach(function(phase) {
            console.log(phase);
            var el = $($scope.UIButton(phase.name, phase.x, phase.y, phase.width, phase.height)).appendTo("#top-panel");

            $(el).click(function() {
                $scope.selectPhase(phase.name);
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
        $scope.selectedPhase = phase;
        $scope.$apply();
    }

    $scope.populatePhaseButtons();
});
