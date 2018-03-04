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
    {id: 4, name: "Formation_Displacement", x: 88, y: 80.5, width: 11.7, height: 11.6, el: null}
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
            {id: 4, decision: "first_contact", card: "cw_backpick", name: "invertedl_rake", x: 76, y: 2.5, width: 7.5, height: 2.2, el: null},
            {id: 5, decision: "first_contact", card: "cw_backpick", name: "punch", x: 76, y: 5.5, width: 4.5, height: 2.2, el: null},
            {id: 6, decision: "first_contact", card: "cw_backpick", name: "barrel_roll", x: 76, y: 8, width: 7, height: 2.1, el: null},
            {id: 7, decision: "first_contact", card: "ccw_backpick", name: "rake", x: 75.7, y: 14, width: 3.7, height: 2, el: null},
            {id: 8, decision: "first_contact", card: "ccw_backpick", name: "invertedr_punch", x: 75.5, y: 16.8, width: 9, height: 2.1, el: null},
            {id: 9, decision: "first_contact", card: "ccw_backpick", name: "punch", x: 75.5, y: 19.7, width: 3.7, height: 2.2, el: null},
            {id: 10, decision: "first_contact", card: "ccw_backpick", name: "rake_shovel", x: 75.5, y: 22.7, width: 8.4, height: 2.2, el: null},
            {id: 11, decision: "first_contact", card: "smash", name: "punch_under", x: 82, y: 28.5, width: 14.5, height: 2.2, el: null},
            {id: 12, decision: "first_contact", card: "smash", name: "punch_roll", x: 82, y: 31.5, width: 14.8, height: 2.2, el: null},
            {id: 13, decision: "first_contact", card: "smash", name: "invertedr_punch_hotpotatoe", x: 82, y: 38.5, width: 16, height: 2.4, el: null},
            {id: 14, decision: "first_contact", card: "smash", name: "invertedr_punch_roll", x: 82, y: 41.5, width: 16, height: 2.4, el: null},
            {id: 15, decision: "first_contact", card: "ccw_tackle", name: "rake_curl", x: 75.5, y: 47, width: 6, height: 2.2, el: null},
            {id: 16, decision: "first_contact", card: "ccw_tackle", name: "invertedr_curl", x: 75.5, y: 52.5, width: 8, height: 2.2, el: null},
            {id: 17, decision: "first_contact", card: "cw_tackle", name: "pinch_curl", x: 75.5, y: 58, width: 8, height: 2.6, el: null},
            {id: 18, decision: "first_contact", card: "cw_tackle", name: "barrel_roll", x: 75.5, y: 61.4, width: 8, height: 2.6, el: null},
        ]
    },
    {
        phase: 3,
        keys: [
        ]
    },
    {
        phase: 4,
        keys: [
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

