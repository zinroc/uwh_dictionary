"use strict";
/** 
* example of how to structure error handeling
**/
const Promise = require ("bluebird");

const error = require("./error.js");

let phase = {};


const dummyPromise = new Promise(function (resolve, reject) {
    resolve("good stuff");
});

module.exports = phase = {
    // catchChain: catchChain,
    get: get,
    getKeys: getKeys,
    getKeyValues: getKeyValues
};

var Phase_Options = [
    {id: 1, name: "Wall_Corner", x: 19.5, y: 23.5, width:12.4, height: 9, el: null},
    {id: 2, name: "Puck_Collection", x: 76.5, y: 47.2, width: 12, height: 12, el: null},
    {id: 3, name: "Puck_Distribution", x: 64.8, y: 80.5, width: 11.9, height: 11.6, el: null},
    {id: 4, name: "Formation_Displacement", x: 88, y: 80.5, width: 11.7, height: 11.6, el: null},
    {id: 5, name: "Getting_Into_Position", x: 37, y: 7, width: 16.2, height: 9.2, el: null}
];

var Phase_Keys = [
    {
        phase: 1,
        keys: [
            {id: 1, decision: "left_wall", card: "leaving", name: "invertedr_v", x: 11.5, y: 81, width:14, height: 2.2, el: null},
            {id: 2, decision: "left_wall", card: "leaving", name: "pinch_v", x: 11.5, y: 63, width:5, height: 2.4, el: null},
            {id: 3, decision: "left_wall", card: "leaving", name: "rakeroll_fade", x: 11.5, y: 60.2, width:12, height: 2.4, el: null}
        ]
    },
    {
        phase: 2,
        keys: [
            {id: 4, decision: "first_contact", card: "cw_backpick", name: "invertedl_rake", x: 77, y: 2.5, width: 7.5, height: 2.2, el: null},
            {id: 5, decision: "first_contact", card: "cw_backpick", name: "punch", x: 77, y: 5.5, width: 4.5, height: 2.2, el: null},
            {id: 6, decision: "first_contact", card: "cw_backpick", name: "barrel_roll", x: 77, y: 8, width: 7, height: 2.1, el: null},
            {id: 7, decision: "first_contact", card: "ccw_backpick", name: "rake", x: 76.7, y: 14, width: 3.7, height: 2, el: null},
            {id: 8, decision: "first_contact", card: "ccw_backpick", name: "invertedr_punch", x: 76.5, y: 16.8, width: 9, height: 2.1, el: null},
            {id: 9, decision: "first_contact", card: "ccw_backpick", name: "punch", x: 76.5, y: 19.7, width: 3.7, height: 2.2, el: null},
            {id: 10, decision: "first_contact", card: "ccw_backpick", name: "rake_shovel", x: 76.5, y: 22.7, width: 8.4, height: 2.2, el: null},
            {id: 11, decision: "first_contact", card: "smash", name: "punch_under", x: 83, y: 28.5, width: 14.5, height: 2.2, el: null},
            {id: 12, decision: "first_contact", card: "smash", name: "punch_roll", x: 83, y: 31.5, width: 14.8, height: 2.2, el: null},
            {id: 13, decision: "first_contact", card: "smash", name: "invertedr_punch_hotpotatoe", x: 83, y: 34.8, width: 16, height: 2.4, el: null},
            {id: 14, decision: "first_contact", card: "smash", name: "invertedr_punch_roll", x: 83, y: 38, width: 16, height: 2.4, el: null},
            {id: 15, decision: "first_contact", card: "ccw_tackle", name: "rake_curl", x: 76.8, y: 44.2, width: 6, height: 2.2, el: null},
            {id: 16, decision: "first_contact", card: "ccw_tackle", name: "invertedr_curl", x: 77.3, y: 50, width: 8, height: 2.2, el: null},
            {id: 17, decision: "first_contact", card: "cw_tackle", name: "pinch_curl", x: 77, y: 55.5, width: 8, height: 2.6, el: null},
            {id: 18, decision: "first_contact", card: "cw_tackle", name: "barrel_roll", x: 77, y: 58.5, width: 8, height: 2.6, el: null},
        ]
    },
    {
        phase: 3,
        keys: [     
            {id: 26, decision: "exploit_defect", card: "flick_into_defect", name: "piano_keys", x: 86, y: 49.1, width: 11, height: 2.2, el: null}
        ]
    },
    {
        phase: 4,
        keys: [
            {id: 19, decision: "side_by_side", card: "cut_in_left", name: "layoff", x: 9.7, y: 48, width: 5, height: 1.6, el: null},
            {id: 20, decision: "side_by_side", card: "cut_in_left", name: "dropoff", x: 9.7, y: 50, width: 7, height: 2, el: null},
            {id: 21, decision: "side_by_side", card: "cut_in_right", name: "ccw_curl_and_slide", x: 30.5, y: 52, width: 15, height: 1.6, el: null},
            {id: 22, decision: "side_by_side", card: "cut_in_right", name: "invertedr_dropoff", x: 30.5, y: 59, width: 11, height: 1.6, el: null},
            {id: 23, decision: "side_by_side", card: "cut_in_right", name: "______dropoff", x: 30.5, y: 68.9, width: 8, height: 2, el: null},
            {id: 24, decision: "head_on", card: "left_option", name: "crossfrog_pass", x: 4.5, y: 30, width: 9, height: 2, el: null},
            {id: 25, decision: "head_on", card: "right_option", name: "crossfrog_pass", x: 27, y: 29.5, width: 8.2, height: 1.7, el: null}      
        ]
    },
    {
        phase: 5,
        keys: [
            {id: 27, decision: "get_down", card: "", name: "s_dive", x:17.5, y:19.5, width: 16, height: 3.7, el: null},
            {id: 28, decision: "get_down", card: "", name: "duck_dive", x:17.5, y:24, width: 16, height: 3, el: null},
            {id: 29, decision: "choose_body_position", card: "behind_puck", name: "cobra", x:78.5, y:15.5, width: 16, height: 3, el: null},
            {id: 30, decision: "choose_body_position", card: "behind_puck", name: "icicle", x:78.5, y:20, width: 16, height: 3.5, el: null},
            {id: 31, decision: "choose_body_position", card: "behind_puck", name: "upside_down", x:78.5, y:24, width: 16, height: 3, el: null},
            {id: 32, decision: "choose_body_position", card: "ahead_of_puck", name: "backward_cobra", x:78.5, y:37, width: 16, height: 3, el: null},
            {id: 33, decision: "choose_body_position", card: "ahead_of_puck", name: "retrospective_cobra", x:78.5, y:41, width: 18, height: 3, el: null},
            {id: 34, decision: "choose_body_position", card: "ahead_of_puck", name: "turkish_fence", x:78.5, y:45, width: 16.5, height: 3, el: null},
            {id: 35, decision: "choose_body_position", card: "ahead_of_puck", name: "turtle", x:78.5, y:49, width: 16.5, height: 3.2, el: null}
        ]
    }
];

var Phase_Key_Values = [
    {phase_key: 1, value: "InvertedRV.gif"},
    {phase_key: 2, value: "PinchV.gif"},
    {phase_key: 3, value: "RakeRollFade2.gif"},
    {phase_key: 4, value: "CWINVLBP.gif"},
    {phase_key: 5, value: "CWPUNCHBP.gif"},
    {phase_key: 6, value: "CWBARRELBP.gif"},
    {phase_key: 7, value: "CCWRAKEBP.gif"},
    {phase_key: 8, value: "CCWINVRPUNCHBP.gif"},
    {phase_key: 9, value: "CCWPUNCHBP.gif"},
    {phase_key: 10, value: "CCWRAKESHOVELBP.gif"},
    {phase_key: 11, value: "PunchUnder.gif"},
    {phase_key: 12, value: "PunchRollRight.gif"},
    {phase_key: 13, value: "InvertedRPunchOver.gif"},
    {phase_key: 14, value: "InvertedRPunchRollLeft.gif"},
    {phase_key: 15, value: "RakeCurlFromParallel.gif"},
    {phase_key: 16, value: "InvertedRTackle.gif"},
    {phase_key: 16, value: "InvertedRTackleFromParallel.gif"},
    {phase_key: 17, value: "CWPinchTackleFromParallel.gif"},
    {phase_key: 18, value: "BarrelRollCWTackle.gif"},
    {phase_key: 19, value: "Layoff.gif"},
    {phase_key: 20, value: "dropoff.gif"},
    {phase_key: 21, value: "CCWCurlAndSlide.gif"},
    {phase_key: 22, value: "InvertedRDropoff.gif"},
    {phase_key: 23, value: "XJacobX_dropoff.gif"},
    {phase_key: 24, value: "crossfrog_left.gif"},
    {phase_key: 25, value: "crossfrog_right.gif"},
    {phase_key: 26, value: "piano_keys.gif"},
    {phase_key: 27, value: "Sdive.gif"},
    {phase_key: 28, value: "DuckDive.gif"},
    {phase_key: 29, value: "Cobra.png"},
    {phase_key: 30, value: "Turkish_Fence.png"},
    {phase_key: 31, value: "Upside_Down.png"},
    {phase_key: 32, value: "Cobra.png"},
    {phase_key: 33, value: "Retrospective_Cobra.png"},
    {phase_key: 34, value: "Turkish_Fence.png"},
    {phase_key: 35, value: "turtle.png"},
]

function get(response) {
    response.status(200).json(Phase_Options);
}

function getKeys(phase, response) {
    phase = parseInt(phase, 10);
    let keys = [];
    Phase_Keys.forEach(function(p) {
        if (p.phase === phase) {
            keys = p.keys;
        }
    });
    response.status(200).json(keys);
}

function getKeyValues(phase_key, response) {
    phase_key = parseInt(phase_key, 10);
    let values = [];
    Phase_Key_Values.forEach(function(v) {
        if (v.phase_key === phase_key) {
            values.push(v.value);
        }
    });
    response.status(200).json(values);    
}

function catchChain (response) {
    const promise = dummyPromise.then((result) => {
        if (result === 'good stuff') {
            return true;
        } else {
            throw error.new(error.codes.BAD_REQUEST, "not good stuff");
        }
    }).then((result) => {
        if (result === 'other stuff') {
            return true;
        } else {
            throw error.new(error.codes.BAD_REQUEST);
        }
    }).catch((e) => {
        error.respond(e, response);
    });
}

