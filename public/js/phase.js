"use strict";
/** 
* example of how to structure error handeling
**/

this.PhaseInfo = {}

PhaseInfo.Phase_Options = [
    {id: 1, display_name: "Wall_Left", name: "Wall_Left", x: 41, y: 49, width: 2, height: 3, el: null, super_phases: []},
    {id: 2, display_name: "Puck_Collection", name: "Puck_Collection", x: 58.5, y: 46.7, width: 8, height: 13.3, el: null, super_phases: [/** 3, **/ 4]},
    //{id: 2, display_name: "Puck_Collection", name: "Puck_Collection", x: 3.5, y: 2, width: 0, height: 0, el: null, super_phases: [3, 4]},
    //{id: 3, display_name: "Claim_Empty_Space", name: "Puck_Distribution", x: 3.5, y: 5, width: 0, height: 0, el: null, super_phases: [2, 4]},
    {id: 4, display_name: "Eliminate_Opposing_Player", name: "Formation_Displacement", x: 3.5, y: 9, width: 0, height: 0, el: null, super_phases: [2 /**,  3 **/]},
    {id: 5, display_name: "Getting_Into_Position", name: "Getting_Into_Position", x: 29.5, y: 54, width: 8, height: 13, el: null, super_phases: []},
    {id: 6, display_name: "Wall_Right", name: "Wall_Right", x: 67, y: 63.7, width: 3, height: 5, el: null, super_phases: []}
];

PhaseInfo.Pucks = [
    {
        phase: 1,
        pucks: [
            {id: 1, name: "Advancing", pin: {x: 100, y: 0}, tracks: [], arrows: [{mini_track: null, direction: "down"}]},
            {id: 2, name: "Stalling", pin: {x: 500, y: 0}, tracks: [], arrows: [{mini_track: null, direction: "down"}]},
            {id: 3, name: "Leaving", pin: {x: 900, y: 0}, tracks: [], arrows: [{mini_track: null, direction:"down"}]}
        ]
    },
    {
        phase: 2,
        pucks: [
            {
                id: 1,
                name: "First_Contact",
                pin: {x: 500, y: 0},
                tracks: [{length: 300, pin: {x: 0, y: 0}, rotation: 0}],
                arrows: [{mini_track: { height: 1300, pin: {x: 255, y: 0}}, direction:"right"}]
            },
            {
                id: 2,
                name: "Deal_With_Threats",
                pin: {x: 500, y: 400},
                tracks: [{length: 700, pin: {x: 0, y: 0}, rotation: 0}, {length: 500, pin: {x: -125, y: 300}, rotation: 30}],
                arrows: [{mini_track: { height: 300, pin: {x: -115, y: -100}}, direction:"left"}]
            },
            {id: 3, name: "Eliminate_Opposing_Player", pin: {x: 500, y: 1200}, tracks: [], arrows: [], click: "Formation_Displacement"},
            {id: 4, name: "Claim_Empty_Space", pin: {x: 200, y: 1200}, tracks: [], arrows: []}
        ]
    },
    /** {
        phase: 3,
        pucks: [
            {id: 1, name: "Create_Empty_Space", pin: {x: 500, y: 0}, tracks: [{length: 400, pin: {x: 0, y: 0}, rotation: 0}], arrows: [{mini_track: null, direction: "right"}]},
            {id: 2, name: "Take_Empty_Space", pin: {x: 500, y: 500}, tracks: [{length: 400, pin: {x: 0, y: 0}, rotation: 0}], arrows: [{mini_track: null, direction:"left"}]},
            {id: 3, name: "Puck_Collection", pin: {x: 500, y: 1000}, tracks: [], arrows: []}
        ]
    }, **/
    {
        phase: 4,
        pucks: [
            {
                id: 1,
                name: "Opponents_Orientation",
                pin: {x: 500, y: 0},
                tracks: [{length: 400, pin: {x: 0, y: 0}, rotation: 0}],
                arrows: [
                    {mini_track: {height: 1200, pin: {x: -180, y: 0}}, direction:"left", subtitle: {name: "side_by_side", pin: {x: -450, y: 0}}},
                    //{mini_track: null, direction:"right", subtitle: {name: "behind_under", pin: {x: 330, y: -310}}},
                    {mini_track: {height: 900, pin: {x: 310, y: 0}}, direction:"right", subtitle: {name: "head_on", pin: {x: 350, y: 0}}}
                ]
            },
            {id: 2, name: "Steal_Opponents_Position", pin: {x: 500, y: 400}, tracks: [{length: 400, pin: {x: 0, y: 0}, rotation: 0}], arrows: []},
            {id: 3, name: "Puck_Collection", pin: {x: 500, y: 850}, tracks: [], arrows: [], click: "Puck_Collection"}
        ]
    },
    {
        phase: 5,
        pucks: [
            { 
                id: 1,
                name: "Get_Down",
                pin: {x: 400, y: 0},
                tracks: [{length: 500, pin: {x: 0, y: 0}, rotation: 0}],
                arrows: [{mini_track: {height: 150, pin: {x: 255, y: 0}}, direction:"right"}]
            },
            {
                id: 2,
                name: "Choose_Body_Position",
                pin: {x: 400, y: 600},
                tracks: [{length: 500, pin: {x: 0, y: 0}, rotation: 0}],
                arrows: [{mini_track: {height: 700, pin: {x: -115, y: -400}}, direction:"left"}]
            },
            /** {
                id: 3,
                name: "Threat_Awareness",
                pin: {x: 400, y: 1200},
                tracks: [],
                arrows: [{mini_track: {height: 650, pin: {x: 255, y: -500}}, direction:"right"}]
            } **/
            {
                id: 3,
                name: "Puck_Collection",
                pin: {x: 400, y: 1200},
                tracks: [],
                arrows: [],
                click: "Puck_Collection"
            }
        ]
    },
    {
        phase: 6,
        pucks: [
            {id: 1, name: "Advancing", pin: {x: 100, y: 0}, tracks: [], arrows: [{mini_track: null, direction:"down"}]},
            {id: 2, name: "Stalling", pin: {x: 500, y: 0}, tracks: [], arrows: [{mini_track: null, direction:"down"}]},
            {id: 3, name: "Leaving", pin: {x: 900, y: 0}, tracks: [], arrows: [{mini_track: null, direction:"down"}]}
        ]
    }
];

PhaseInfo.Cards = [
    {
        phase: 4,
        cards: [
            {title: "left_option", decision: "head_on", pin: {x: 850, y: 150}},
            {title: "right_option", decision: "head_on", pin: {x: 850, y: 550}},
            {title: "outside_options", decision: "side_by_side", pin: {x: 100, y: 100}},
            {title: "cut_in_left", decision: "side_by_side", pin: {x: 100, y: 265}},
            {title: "cut_in_right", decision: "side_by_side", pin: {x: 100, y: 700}},
            //{title: "forward_options", decision: "behind_under", pin: {x: 850, y: 265}},
            //{title: "left_option", decision: "behind_under", pin: {x: 850, y: 450}},
            //{title: "right_option", decision: "behind_under", pin: {x: 850, y: 650}}
        ]
    },
    {

        phase: 5,
        cards: [
            {title: "dives", decision: "get_down", pin: {x: 700, y: 0}},
            {title: "behind_puck", decision: "choose_body_position", pin: {x: 50, y: 200}},
            {title: "ahead_of_puck", decision: "choose_body_position", pin: {x: 50, y: 700}},
            //{title: "scout_opposing_players", decision: "Threat_Awareness", pin: {x: 700, y: 700}},
            //{title: "visualize_opposition", decision: "Threat_Awareness", pin: {x: 700, y: 1000}}
        ]
    },
    {
        phase: 2,
        cards: [
            {title: "cw_backpick", decision: "first_contact", pin: {x: 800, y: 0}},
            {title: "ccw_backpick", decision: "first_contact", pin: {x: 800, y: 200}},
            {title: "smash", decision: "first_contact", pin: {x: 800, y: 450}},
            {title: "ccw_tackle", decision: "first_contact", pin: {x: 800, y: 700}},
            {title: "cw_tackle", decision: "first_contact", pin: {x: 800, y: 900}},
            {title: "void", decision: "first_contact", pin: {x: 800, y: 1050}},
            {title: "protect_and_stall", decision: "Deal_With_Threats", pin: {x: 170, y: 300}},
        ]
    },
    {
        phase: 6,
        cards: [
            {title: "Advancing", decision: "Wall_Right", pin: {x: 100, y: 300}},
            {title: "Stalling", decision: "Wall_Right", pin: {x: 500, y: 300}},
            {title: "Leaving", decision: "Wall_Right", pin: {x: 900, y: 300}}
        ]
    },
    {
        phase: 1,
        cards: [
            {title: "Advancing", decision: "Wall_Left", pin: {x: 100, y: 300}},
            {title: "Stalling", decision: "Wall_Left", pin: {x: 500, y: 300}},
            {title: "Leaving", decision: "Wall_Left", pin: {x: 900, y: 300}}
        ]
    }
];

PhaseInfo.Phase_Keys = [
    {
        phase: 1,
        keys: [
            {id: 1, decision: "Wall_Left", card: "Leaving", name: "invertedr_v", active: true},
            {id: 2, decision: "Wall_Left", card: "Leaving", name: "pinch_v", active: true},
            {id: 3, decision: "Wall_Left", card: "Leaving", name: "rakeroll_fade", active: true},
            {id: 58, decision: "Wall_Left", card: "Leaving", name: "reverse_windmill", active: true},
            {id: 59, decision: "Wall_Left", card: "Leaving", name: "InvertedR_CCW_Curl_Kickoff", active: true},
            {id: 60, decision: "Wall_Left", card: "Leaving", name: "CCW_Curl_Kickoff", active: true},
            {id: 112, decision: "Wall_Left", card: "Advancing", name: "inverted_L_juggle", active: false},
            {id: 113, decision: "Wall_Left", card: "Advancing", name: "vertical_rake_juggle", active: false},
            {id: 114, decision: "Wall_Left", card: "Advancing", name: "inverted_L_spike", active: false},
            {id: 115, decision: "Wall_Left", card: "Advancing", name: "punch", active: false},
            {id: 116, decision: "Wall_Left", card: "Advancing", name: "inverted_L_rake", active: false},
            {id: 117, decision: "Wall_Left", card: "Stalling", name: "shoulder_shield", active: false},
            {id: 118, decision: "Wall_Left", card: "Stalling", name: "punch_hold", active: false},
            {id: 119, decision: "Wall_Left", card: "Stalling", name: "inverted_r_hold", active: false}
        ]
    },
    {
        phase: 2,
        keys: [
            {id: 4, decision: "first_contact", card: "cw_backpick", name: "inverted_L_rake", active: true},
            {id: 5, decision: "first_contact", card: "cw_backpick", name: "punch", active: true},
            {id: 6, decision: "first_contact", card: "cw_backpick", name: "barrel_roll", active: true},
            {id: 7, decision: "first_contact", card: "ccw_backpick", name: "rake", active: true},
            {id: 8, decision: "first_contact", card: "ccw_backpick", name: "inverted_R_punch", active: true},
            {id: 9, decision: "first_contact", card: "ccw_backpick", name: "punch", active: true},
            {id: 10, decision: "first_contact", card: "ccw_backpick", name: "rake_shovel", active: true},
            {id: 11, decision: "first_contact", card: "smash", name: "punch", active: true},
            {id: 12, decision: "first_contact", card: "smash", name: "punch_roll", active: true},
            {id: 13, decision: "first_contact", card: "smash", name: "invertedr_punch_juggle", active: true},
            {id: 14, decision: "first_contact", card: "smash", name: "invertedr_punch_roll", active: true},
            {id: 15, decision: "first_contact", card: "ccw_tackle", name: "rake_curl", active: true},
            {id: 16, decision: "first_contact", card: "ccw_tackle", name: "invertedr_curl", active: true},
            {id: 17, decision: "first_contact", card: "cw_tackle", name: "pinch_curl", active: true},
            {id: 18, decision: "first_contact", card: "cw_tackle", name: "barrel_roll", active: true},
            {id: 49, decision: "first_contact", card: "ccw_tackle", name: "inverted_L_rake", active: true},
            {id: 50, decision: "first_contact", card: "void", name: "arm_punch", active: true},
            {id: 51, decision: "first_contact", card: "void", name: "bottom_tap_decoy_pass", active: true},
            {id: 52, decision: "first_contact", card: "void", name: "knock_down", active: true},
            {id: 53, decision: "first_contact", card: "void", name: "flick_pass", active: true},
            {id: 85, decision: "Deal_With_Threats", card: "protect_and_stall", name: "alternate_cw_ccw_curls", active: true},
            {id: 86, decision: "Deal_With_Threats", card: "protect_and_stall", name: "continuous_curl", active: true},
            {id: 87, decision: "Deal_With_Threats", card: "protect_and_stall", name: "backward_cobra", active: false},
            {id: 88, decision: "Deal_With_Threats", card: "protect_and_stall", name: "enter_wall_game", active: false},
            {id: 89, decision: "Deal_With_Threats", card: "protect_and_stall", name: "dump_pass", active: false},
        ]
    },
    /** {
        phase: 3,
        keys: [     
            {id: 26, decision: "take_empty_space", card: "flick_into_space", name: "piano_keys", x: 17, y: 45.4, width: 12, height: 2.7, el: null}
        ]
    },**/
    {
        phase: 4,
        keys: [
            {id: 19, decision: "side_by_side", card: "cut_in_left", name: "layoff", active: true},
            {id: 20, decision: "side_by_side", card: "cut_in_left", name: "dropoff", active: true},
            {id: 21, decision: "side_by_side", card: "cut_in_right", name: "ccw_curl_and_slide", active: true},
            {id: 22, decision: "side_by_side", card: "cut_in_right", name: "invertedr_dropoff", active: true},
            {id: 23, decision: "side_by_side", card: "cut_in_right", name: "dropoff", active: true},
            {id: 24, decision: "head_on", card: "left_option", name: "crossfrog_pass", active: true},
            {id: 25, decision: "head_on", card: "right_option", name: "crossfrog_pass", active: true},
            {id: 36, decision: "head_on", card: "left_option", name: "dummy", active: true},
            {id: 37, decision: "head_on", card: "left_option", name: "flick_and_chase", active: true},
            {id: 38, decision: "head_on", card: "right_option", name: "fade", active: true},
            {id: 39, decision: "head_on", card: "right_option", name: "flick_and_chase", active: true},
            {id: 40, decision: "side_by_side", card: "cut_in_left", name: "CW_270_curl", active: true},
            {id: 41, decision: "side_by_side", card: "cut_in_left", name: "windmill", active: true},
            //{id: 42, decision: "side_by_side", card: "cut_in_right", name: "knuckleR_V", active: true},
            {id: 43, decision: "side_by_side", card: "cut_in_right", name: "CCW_270_curl", active: true},
            {id: 44, decision: "side_by_side", card: "cut_in_left", name: "Shovel_V", active: true},
            {id: 45, decision: "side_by_side", card: "cut_in_right", name: "Six", active: true},
            {id: 46, decision: "side_by_side", card: "cut_in_right", name: "Fake_CCW_invertedR_curl_V", active: true},
            {id: 47, decision: "side_by_side", card: "cut_in_right", name: "CCW_360_invertedR_curl", active: true},
            {id: 48, decision: "head_on", card: "left_option", name: "Shovel_V", active: true},
            {id: 54, decision: "side_by_side", card: "cut_in_left", name: "Shovel_Pass", active: true},
            {id: 62, decision: "head_on", card: "right_option", name: "Leapfrog_Pass", active: true},
            {id: 63, decision: "head_on", card: "left_option", name: "Leapfrog_Pass", active: true},
            {id: 64, decision: "head_on", card: "left_option", name: "Shovel_Pass", active: true},
            {id: 65, decision: "head_on", card: "right_option", name: "Flick_Pass", active: true},
            {id: 66, decision: "head_on", card: "right_option", name: "Flick_Pass_Forward", active: true},
            {id: 67, decision: "head_on", card: "left_option", name: "Flick_Pass_Forward", active: true},
            {id: 68, decision: "side_by_side", card: "cut_in_right", name: "Inverted_R_Layoff", active: true},
            {id: 70, decision: "side_by_side", card: "cut_in_right", name: "Reverse Windmill", active: true},
            {id: 71, decision: "side_by_side", card: "cut_in_right", name: "Standard_V", active: true},
            {id: 72, decision: "behind_under", card: "right_option", name: "CCW_curl", active: true},
            {id: 73, decision: "behind_under", card: "left_option", name: "CW_curl", active: true},
            {id: 74, decision: "behind_under", card: "left_option", name: "Shovel_V", active: true},
            {id: 75, decision: "behind_under", card: "left_option", name: "Windmill", active: true},
            {id: 76, decision: "behind_under", card: "right_option", name: "Standard_V", active: true},
            {id: 90, decision: "side_by_side", card: "outside_options", name: "outswim", active: false},
            {id: 91, decision: "side_by_side", card: "outside_options", name: "pass_around_outside", active: true},
            {id: 92, decision: "behind_under", card: "forward_options", name: "remora_swim", active: false},
            {id: 93, decision: "behind_under", card: "forward_options", name: "flick_pass", active: false},
            {id: 94, decision: "behind_under", card: "right_option", name: "six", active: false},
            {id: 95, decision: "behind_under", card: "right_option", name: "knuckleV", active: false},
            {id: 96, decision: "behind_under", card: "right_option", name: "reverse_windmill", active: false},
            {id: 97, decision: "behind_under", card: "right_option", name: "Fake_CCW_invertedR_curl_V", active: false},
            {id: 98, decision: "behind_under", card: "right_option", name: "CCW_360_invertedR_curl", active: false},
            {id: 122, decision: "head_on", card: "left_option", name: "nutmeg", active: true},
            {id: 123, decision: "side_by_side", card: "cut_in_left", name: "nutmeg", active: false},
            {id: 124, decision: "side_by_side", card: "cut_in_left", name: "backflick", active: false}

        ]
    },
    {
        phase: 5,
        keys: [
            {
                id: 27,
                decision: "get_down",
                card: "dives",
                name: "s_dive",
                active: true
            },
            {
                id: 28,
                decision: "get_down",
                card: "dives",
                name: "duck_dive",
                active: true
            },
            {
                id: 29,
                decision: "choose_body_position",
                card: "behind_puck",
                name: "cobra",
                active: true
            },
            {
                id: 30,
                decision: "choose_body_position",
                card: "behind_puck",
                name: "icicle",
                active: true
            },
            {
                id: 31,
                decision: "choose_body_position",
                card: "behind_puck",
                name: "upside_down",
                active: true
            },
            {
                id: 32,
                decision: "choose_body_position",
                card: "ahead_of_puck",
                name: "backward_cobra",
                active: true
            },
            {
                id: 33,
                decision: "choose_body_position",
                card: "ahead_of_puck",
                name: "retrospective_cobra",
                active: true
            },
            {
                id: 34,
                decision: "choose_body_position",
                card: "ahead_of_puck",
                name: "turkish_fence",
                active: true
            },
            {
                id: 35,
                decision: "choose_body_position",
                card: "ahead_of_puck",
                name: "turtle",
                active: true
            },
            {
                id: 69,
                decision: "choose_body_position",
                card: "behind_puck",
                name: "fin_first",
                active: true
            },
            {
                id: 77,
                decision: "Threat_Awareness",
                card: "scout_opposing_players",
                name: "lead_direction_changes_with_eyes",
                active: false
            },
            {
                id: 78,
                decision: "Threat_Awareness",
                card: "scout_opposing_players",
                name: "check_opposition_during_dive",
                active: false
            },
            {
                id: 79,
                decision: "Threat_Awareness",
                card: "scout_opposing_players",
                name: "check_above_with_exaggarated_dolphin_kick",
                active: false
            },
            {
                id: 80,
                decision: "Threat_Awareness",
                card: "visualize_opposition",
                name: "positions",
                active: false
            },
            {
                id: 81,
                decision: "Threat_Awareness",
                card: "visualize_opposition",
                name: "body_orientation",
                active: false
            },
            {
                id: 82,
                decision: "Threat_Awareness",
                card: "visualize_opposition",
                name: "substitutions",
                active: false
            },
            {
                id: 83,
                decision: "Threat_Awareness",
                card: "visualize_opposition",
                name: "breath_hold",
                active: false
            },
            {
                id: 84,
                decision: "Threat_Awareness",
                card: "visualize_opposition",
                name: "hand_position",
                active: false
            }
        ]
    },
    {
        phase: 6,
        keys: [
            {id: 55, decision: "Wall_Right", card: "Leaving", name: "windmill_180_kickoff", active: true},
            {id: 56, decision: "Wall_Right", card: "Leaving", name: "windmill", active: true},
            {id: 57, decision: "Wall_Right", card: "Leaving", name: "InvertedR_rakeroll_shovel_V", active: true},
            {id: 61, decision: "Wall_Right", card: "Leaving", name: "CW_Pinch_Curl_Kickoff", active: true},
            {id: 99, decision: "Wall_Right", card: "Advancing", name: "inverted_r_juggle", active: false},
            {id: 100, decision: "Wall_Right", card: "Advancing", name: "rake_spike", active: true},
            {id: 101, decision: "Wall_Right", card: "Advancing", name: "vertical_rake_spike_juggle", active: false},
            {id: 102, decision: "Wall_Right", card: "Advancing", name: "rake", active: false},
            {id: 103, decision: "Wall_Right", card: "Stalling", name: "punch_hold", active: false},
            {id: 104, decision: "Wall_Right", card: "Stalling", name: "inverted_r_hold", active: false},
            {id: 105, decision: "Wall_Right", card: "Stalling", name: "shoulder_shield", active: false},
            {id: 107, decision: "Wall_Right", card: "Leaving", name: "Shovel_Pass", active: false},
            {id: 109, decision: "Wall_Right", card: "Leaving", name: "backflick", active: true},
            {id: 110, decision: "Wall_Right", card: "Leaving", name: "cw_pinch_tackle", active: true},
            {id: 111, decision: "Wall_Right", card: "Leaving", name: "barrel_roll", active: true}
        ]
    }
];

PhaseInfo.Phase_Key_Values = [
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
    {phase_key: 11, value: "Punch.gif"},
    {phase_key: 12, value: "PunchRollRight.gif"},
    {phase_key: 13, value: "InvertedRPunchOver.gif"},
    {phase_key: 14, value: "InvertedRPunchRollLeft.gif"},
    {phase_key: 15, value: "RakeCurlFromParallel.gif"},
    {phase_key: 16, value: "InvertedRTackle.gif"},
    {phase_key: 16, value: "InvertedRTackleFromParallel.gif"},
    {phase_key: 17, value: "PinchCurl.gif"},
    {phase_key: 110, value: "PinchCurl.gif"},,
    {phase_key: 111, value: "BarrelRollCWTackle.gif"},
    {phase_key: 18, value: "BarrelRollCWTackle.gif"},
    {phase_key: 19, value: "Layoff.gif"},
    {phase_key: 19, value: "CWLayoff2.gif"},
    {phase_key: 20, value: "dropoff.gif"},
    {phase_key: 21, value: "CCWCurlAndSlide.gif"},
    {phase_key: 22, value: "InvertedRDropoff.gif"},
    {phase_key: 23, value: "XJacobX_dropoff.gif"},
    {phase_key: 24, value: "crossfrog_left.gif"},
    {phase_key: 25, value: "crossfrog_right.gif"},
    {phase_key: 26, value: "piano_keys.gif"},
    {phase_key: 91, value: "piano_keys.gif"},
    {phase_key: 91, value: "PassAroundOutside.gif"},
    {phase_key: 27, value: "Sdive.gif"},
    {phase_key: 28, value: "DuckDive.gif"},
    {phase_key: 29, value: "Cobra.png"},
    {phase_key: 30, value: "Turkish_Fence.png"},
    {phase_key: 31, value: "Upside_Down.png"},
    {phase_key: 32, value: "Cobra.png"},
    {phase_key: 33, value: "Retrospective_Cobra.png"},
    {phase_key: 34, value: "Turkish_Fence.png"},
    {phase_key: 35, value: "turtle.png"},
    {phase_key: 36, value: "Dummy.gif"},
    {phase_key: 37, value: "FlickChaseLeft.gif"},
    {phase_key: 38, value: "Fade.gif"},
    {phase_key: 39, value: "FlickChaseRight.gif"},
    {phase_key: 40, value: "360CWCurl.gif"},
    //{phase_key: 41, value: "windmill.gif"},
    {phase_key: 41, value: "windmill_head_down_varient.gif"},
    {phase_key: 42, value: "knuckleV.gif"},
    {phase_key: 43, value: "360CCWCurl.gif"},
    {phase_key: 44, value: "SideBySideShovelV.gif"},
    {phase_key: 45, value: "FakeCCWcurlV.gif"},
    {phase_key: 46, value: "FakeInvertedRCurlV.gif"},
    {phase_key: 47, value: "270InvertedRCurl.gif"},
    {phase_key: 48, value: "ShovelV.gif"},
    {phase_key: 49, value: "invertedLRake.gif"},
    {phase_key: 50, value: "ArmPunch.gif"},
    {phase_key: 51, value: "TapBottomFake.gif"},
    {phase_key: 52, value: "KnockDown.gif"},
    {phase_key: 53, value: "FlickPass.gif"},
    {phase_key: 54, value: "ShovelPass_Parallel.gif"},
    {phase_key: 55, value: "WindmillCurlKickoff.gif"},
    {phase_key: 56, value: "Windmill_Wall.gif"},
    {phase_key: 57, value: "InvertedRRakeRollShovelV.gif"},
    {phase_key: 58, value: "ReverseWindmill_Wall.gif"},
    {phase_key: 59, value: "InvertedLCCWCurlKickoff.gif"},
    {phase_key: 60, value: "CCWCurlKickoff.gif"},
    {phase_key: 61, value: "CWPinchCurlKickoff.gif"},
    {phase_key: 62, value: "LeapfrogPassRight.gif"},
    {phase_key: 63, value: "LeapFrogPassLeft2.gif"},
    {phase_key: 64, value: "ShovelPassHeadOn2.gif"},
    {phase_key: 65, value: "FlickPassRight.gif"},
    {phase_key: 66, value: "FlickPassForwardRightOption.gif"},
    {phase_key: 67, value: "FlickPassForwardLeftOption.gif"},
    {phase_key: 68, value: "InvertedRLayoff.gif"},
    {phase_key: 69, value: "FinFirst.gif"},
    {phase_key: 70, value: "reverseWindmill.gif"},
    {phase_key: 71, value: "StandardV.gif"},
    {phase_key: 72, value: "HoverCCWCurl.gif"},
    {phase_key: 73, value: "HoverCWCurl.gif"},
    {phase_key: 74, value: "HoverShovelV.gif"},
    {phase_key: 75, value: "HoverWindmill.gif"},
    {phase_key: 76, value: "HoverStandardVRight.gif"},
    {phase_key: 45, value: "six.gif"},
    {phase_key: 85, value: "alternateCurlStall.gif"},
    {phase_key: 85, value: "AlternateCurlv2.gif"},
    {phase_key: 86, value: "ContinuousCurl.gif"},
    {phase_key: 122, value: "Nutmeg.gif"},
    {phase_key: 100, value: "SpikeRightWall.gif"},
    {phase_key: 109, value: "WallBackflick.gif"},
];


