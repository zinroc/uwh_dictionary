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

var Phase_Options = this.PhaseInfo.Phase_Options;

var All_Phase_Keys = this.PhaseInfo.Phase_Keys;

var Phase_Key_Values = this.PhaseInfo.Phase_Key_Values;

var All_Phase_Pucks = this.PhaseInfo.Pucks;

var All_Cards = this.PhaseInfo.Cards;

var Phase_Keys = [];

var Super_Phase_Buttons = [];

app.controller("HomeCtrl", function homeCtrl ($scope) {
    "use strict";

    $scope.root = "https://uwhdictionary.herokuapp.com";
    //$scope.root = "http://localhost:8081";

    $scope.urlPhase = null;
    $scope.urlKey = null;


    $scope.setStateFromURLParams = function () {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var p = url.searchParams.get("phase");
        var k = url.searchParams.get("key");
        if (typeof p != 'undefined' && typeof k != 'undefined') {
            $scope.urlPhase = parseInt(p);
            $scope.urlKey = parseInt(k);
        }
    };

    $scope.setPhase = function (apply = true) {
        $scope.setSuperPhaseButtons();
        $scope.setPhasePucks();
        $scope.setPhaseKeys();
        $scope.setPhaseCards();
        if (!init && apply)
            $scope.$apply();
    }

    $scope.initPhase = function () {
        if ($scope.urlPhase) {
            for (var i=0; i<Phase_Options.length; i++){
                var phase = Phase_Options[i];
                if (phase.id === $scope.urlPhase) {
                    //$scope.selectPhase(phase);
                    $scope.selectedPhase = phase;
                }
            }
            autoSelectPhaseKeyId = $scope.urlKey;
        } else {
            //phase = Phase_Options[1]);
            $scope.selectedPhase = Phase_Options[3];
        }
        //$scope.populatePhaseButtons();
        $scope.setPhase();
        //$scope.selectPhase($scope.selectedPhase);
    };

    $scope.selectPhaseByName = function (name) {
        let phase = null;
        Phase_Options.forEach(function(o) {
            if (o.name === name) {
                phase = o;
            }
        });
        if (phase) {
            $scope.selectPhaseV2(phase);
        }
    }

    $scope.selectPhaseById = function (id) {
        let phase = null;
        Phase_Options.forEach(function(o) {
            if (o.id === id) {
                phase = o;
            }
        });
        if (phase) {
            $scope.selectPhase(phase);
        }
    }

    $scope.setPhaseCards = function () {
        $scope.selectedPhaseCards = [];
        All_Cards.forEach(function(cards) {
            if (cards.phase === $scope.selectedPhase.id)
            {
                $scope.selectedPhaseCards = cards.cards;
            }
        });
    }

    $scope.setPhasePucks = function () {
        $scope.selectedPhasePucks = [];
        All_Phase_Pucks.forEach(function(pucks) {
            if (pucks.phase == $scope.selectedPhase.id)
            {
                $scope.selectedPhasePucks = pucks.pucks;
            }
        });
    }

    $scope.setPhaseKeys = function () {
        //$scope.depopulatePhaseKeys();
        $scope.selectedPhaseKeys = [];
        All_Phase_Keys.forEach(function(keys) {
            if (keys.phase == $scope.selectedPhase.id) {
                Phase_Keys = keys.keys;
                $scope.selectedPhaseKeys = keys.keys;
            }
        });
        if (autoSelectPhaseKeyId > 0) {
            $scope.selectPhaseKeyById(autoSelectPhaseKeyId);
            autoSelectPhaseKeyId = -1;

            //$("html, body").animate({
            //    scrollTop: $("#phase-panel-V2").offset().top
            //}, 500);
        }
    };


    /** $scope.depopulatePhaseKeys = function () {
        Phase_Keys.forEach(function(key) {
            $(key.el).remove();
        });
        return;
    }; **/

    $scope.titleCase = function (str) {
      str = str.toLowerCase().split('_');
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
      }
      return str.join(' ');
    }

    $scope.selectPhaseKey = function (key, newVersion = false) {
        $scope.selectedPhaseKey = key;
        $scope.setPhaseKeyValues();
        //if (!init){
            //if (!newVersion) {
                //$scope.$apply();
            //}
        //}
        $("#phaseKeyValueModal").modal();
    };

    $scope.selectPhaseKeyById = function (id) {
        let key = null;
        Phase_Keys.forEach(function(k) {
            if (k.id === id){
                key = k;
            }
        });
        $scope.selectPhaseKey(key);
    };

    $scope.setPhaseKeyValues = function () {
        let values = [];
        Phase_Key_Values.forEach(function(v) {
            if (v.phase_key == $scope.selectedPhaseKey.id)
                values.push(v.value);
        });

        $scope.selectedPhaseKey.values = values;

    };

    $scope.cleanAvailableTags = function (tags) {
        let cleanTags = [];
        tags.forEach(function(t) {
            let cleanLabel = $scope.titleCase(t.label);
            cleanTags.push({label: cleanLabel, value: t.value});
        });
        return cleanTags;
    }

    $scope.initSearchValues = function () {
        let search_values = [];
        All_Phase_Keys.forEach(function(p) {
            let phase = getPhaseFromId(p.phase);
            if (phase === null) {
                console.log("could not find search values...");
            }
            let keys = p.keys;
            keys.forEach(function(k) {
                if (k.active) {
                    let label = phase.display_name + "_->_" + k.decision + "_->_" + k.card + "_->_" + k.name;
                    if (phase.name === k.decision) {
                        label = phase.display_name + "_->_" + k.card + "_->_" + k.name;
                    }
                    let value = "{\"phase\": " + phase.id + ", \"key\": " + k.id + "}";
                    search_values.push({label: label, value: value});
                }
            });
        });

        let availableTags = search_values;
        availableTags = $scope.cleanAvailableTags(availableTags);

        $("#searchField")
          .autocomplete({
            minLength: 0,
            source: availableTags,
            select: function( event, ui ) {
                $scope.selectKeyBySearchTerm(ui.item.value);
            }
          });
    }

    function getPhaseFromId(id) {
        let phase = null;
        Phase_Options.forEach(function(o) {
            if (id === o.id) {
                phase = o;
            }
        });
        return phase;
    }

    $scope.display = function(p) {
        switch(p)
        {
            case "Puck_Distribution": {
                return "Claim_Empty_Space";
            } case "Formation_Displacement": {
                return "Eliminate_Opposing_Player";
            } case "Wall_Left": {
                return "Left_Wall";
            } case "Wall_Right": {
                return "Right_Wall";
            } default: {
                return p;
            }
        }
    }

    /** $scope.populatePhaseKeys = function () {
        Phase_Keys.forEach(function(key, i) {
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
    }; **/

    $scope.populatePhaseButtons = function () {
        Phase_Options.forEach(function(phase) {
            if (phase.height != 0){

                var el = $($scope.UIButton(phase.name, phase.x, phase.y, phase.width, phase.height, true)).appendTo("#top-panel");

                $(el).click(function() {
                    $scope.selectPhase(phase);
                    $("html, body").animate({
                        scrollTop: $("#phase-panel-V2").offset().top
                    }, 500);
                });
            }
        });
    }

    $scope.setSuperPhaseButtons = function () {
        $scope.selectedPhase.super_phases.forEach(function(sp) {
            let phase = null;
            Phase_Options.forEach(function(p) {
                if (p.id == sp)
                    phase = p;
            });

            var el = $($scope.UIButton(phase.name, phase.x, phase.y, 16, 3)).appendTo("#phase-panel");

            $(el).click(function() {
                $scope.selectPhase(phase);
                $("html, body").animate({
                    scrollTop: $("#phase-panel-V2").offset().top
                }, 500);
            });
            $scope.superPhaseButtons.push(phase.name);
            Super_Phase_Buttons.push(el);
            // $scope.$apply();
        });
    }

    $scope.UIButton = function (name, left, top, width, height, isCircle = false) {
        let s1 = '<div id="'+ name +'" class="phase-button" style="position: absolute; left: '+ left +'%; top: ';
        let s2 = top +'%; width: '+ width +'%; height: '+ height +'%';
        let s3  = '; border-radius: 50%';
        let s4  = '"></div>';
        if (isCircle) {
            return s1 + s2 + s3 + s4;
        } else {
            return s1 + s2 + s4;
        }
    }

    $scope.selectPhaseV2 = function(phase) {
        if ($scope.selectedPhase && $scope.selectedPhase.id === phase.id) {
            if (autoSelectPhaseKeyId > 0) {
                $scope.selectPhaseKeyById(autoSelectPhaseKeyId);
                autoSelectPhaseKeyId = -1;
            }
            return;
        }

        $scope.selectedPhase = phase;
        //if (!init)
            // $scope.$apply();

        $scope.removeSuperPhaseButtons();
        $scope.setPhase(false);
    }

    $scope.selectPhase = function(phase) {

        if ($scope.selectedPhase && $scope.selectedPhase.id === phase.id) {
            if (autoSelectPhaseKeyId > 0) {
                $scope.selectPhaseKeyById(autoSelectPhaseKeyId);
                autoSelectPhaseKeyId = -1;
            }
            return;
        }

        $scope.selectedPhase = phase;
        //if (!init)
            // $scope.$apply();

        $scope.removeSuperPhaseButtons();
        $scope.setPhase();
    }

    $scope.removeSuperPhaseButtons = function () {
        Super_Phase_Buttons.forEach(function(sp) {
            $(sp).remove();
        });
        Super_Phase_Buttons = [];
        $scope.superPhaseButtons = [];
        // $scope.$apply();
    }



    $scope.selectKeyBySearchTerm = function(term) {
        var json = JSON.parse(term);
        autoSelectPhaseKeyId = json.key;
        $scope.selectPhaseById(json.phase);
    }
    $scope.superPhaseButtons = [];
    $scope.selectedPhase = null;
    $scope.selectedPhasePucks = [];
    $scope.selectedPhaseKey = null;
    $scope.selectedPhaseCards = [];
    $scope.selectedPhaseKeys = [];

    var autoSelectPhaseKeyId = -1;

    var init = true;
    $scope.populatePhaseButtons();
    $scope.setStateFromURLParams();
    $scope.initPhase();
    $scope.initSearchValues();
    init = false;


});
