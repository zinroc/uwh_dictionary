"use strict";
/** 
* example of how to structure error handeling
**/

this.PhaseInfo = {}

PhaseInfo.Phase_Options = [
    {id: 1, display_name: "Wall_Left", name: "Wall_Left", x: 39.25, y: 40.75, width: 2, height: 4, el: null, super_phases: []},
    {id: 2, display_name: "Puck_Collection", name: "Puck_Collection", x: 57.5, y: 37, width: 8, height: 16, el: null, super_phases: [3, 4]},
    {id: 2, display_name: "Puck_Collection", name: "Puck_Collection", x: 3.5, y: 2, width: 0, height: 0, el: null, super_phases: [3, 4]},
    {id: 3, display_name: "Claim_Empty_Space", name: "Puck_Distribution", x: 3.5, y: 5, width: 0, height: 0, el: null, super_phases: [2, 4]},
    {id: 4, display_name: "Eliminate_Opposing_Player", name: "Formation_Displacement", x: 3.5, y: 9, width: 0, height: 0, el: null, super_phases: [2, 3]},
    {id: 5, display_name: "Getting_Into_Position", name: "Getting_Into_Position", x: 27.5, y: 46, width: 8, height: 16, el: null, super_phases: []},
    {id: 6, display_name: "Wall_Right", name: "Wall_Right", x: 66, y: 59, width: 3, height: 6, el: null, super_phases: []}
];

PhaseInfo.Phase_Keys = [
    {
        phase: 1,
        keys: [
            {id: 1, decision: "left_wall", card: "leaving", name: "invertedr_v", x: 65, y: 72, width:25, height: 6, el: null},
            {id: 2, decision: "left_wall", card: "leaving", name: "pinch_v", x: 65, y: 30, width:8, height: 6, el: null},
            {id: 3, decision: "left_wall", card: "leaving", name: "rakeroll_fade", x: 65, y: 23, width:20, height: 6, el: null},
            {id: 58, decision: "left_wall", card: "leaving", name: "reverse_windmill", x: 65, y: 89, width:11, height: 6, el: null},
            {id: 59, decision: "left_wall", card: "leaving", name: "InvertedR_CCW_Curl_Kickoff", x: 65, y: 81, width: 33, height: 6, el: null},
            {id: 60, decision: "left_wall", card: "leaving", name: "CCW_Curl_Kickoff", x: 65, y: 37.5, width: 28, height: 6, el: null}
        ]
    },
    {
        phase: 2,
        keys: [
            {id: 4, decision: "first_contact", card: "cw_backpick", name: "invertedL_rake", x: 72.2, y: 6.9, width: 14.2, height: 2.1, el: null},
            {id: 5, decision: "first_contact", card: "cw_backpick", name: "punch", x: 72.2, y: 9, width: 7, height: 2.1, el: null},
            {id: 6, decision: "first_contact", card: "cw_backpick", name: "barrel_roll", x: 72.2, y: 11.1, width: 10, height: 2.1, el: null},
            {id: 7, decision: "first_contact", card: "ccw_backpick", name: "rake", x: 72.2, y: 16.5, width: 5, height: 2, el: null},
            {id: 8, decision: "first_contact", card: "ccw_backpick", name: "invertedr_punch", x: 72.2, y: 18.4, width: 16, height: 2.1, el: null},
            {id: 9, decision: "first_contact", card: "ccw_backpick", name: "punch", x: 72.2, y: 20.4, width: 6.6, height: 2.2, el: null},
            {id: 10, decision: "first_contact", card: "ccw_backpick", name: "rake_shovel", x: 72.2, y: 22.6, width: 14, height: 2.2, el: null},
            {id: 11, decision: "first_contact", card: "smash", name: "punch_under", x: 72.2, y: 27.7, width: 16.5, height: 4, el: null},
            {id: 12, decision: "first_contact", card: "smash", name: "punch_roll", x: 72.2, y: 31.6, width: 14.8, height: 4.2, el: null},
            {id: 13, decision: "first_contact", card: "smash", name: "invertedr_punch_hotpotatoe", x: 72.2, y: 35.9, width: 19, height: 4.1, el: null},
            {id: 14, decision: "first_contact", card: "smash", name: "invertedr_punch_roll", x: 72.2, y: 40, width: 16.5, height: 4.3, el: null},
            {id: 15, decision: "first_contact", card: "ccw_tackle", name: "rake_curl", x: 72.2, y: 47.4, width: 10, height: 2.2, el: null},
            {id: 16, decision: "first_contact", card: "ccw_tackle", name: "invertedr_curl", x: 72.2, y: 51.6, width: 14.5, height: 2.0, el: null},
            {id: 17, decision: "first_contact", card: "cw_tackle", name: "pinch_curl", x: 72.2, y: 56.7, width: 10.4, height: 2.0, el: null},
            {id: 18, decision: "first_contact", card: "cw_tackle", name: "barrel_roll", x: 72.2, y: 58.7, width: 10.4, height: 2.0, el: null},
            {id: 49, decision: "first_contact", card: "ccw_tackle", name: "invertedL_rake", x: 72.2, y: 49.4, width: 15, height: 2.2, el: null},
            {id: 50, decision: "first_contact", card: "void", name: "arm_punch", x: 72.2, y: 64, width: 21.5, height: 4, el: null},
            {id: 51, decision: "first_contact", card: "void", name: "bottom_tap_decoy_pass", x: 72.2, y: 68, width: 23.7, height: 4.2, el: null},
            {id: 52, decision: "first_contact", card: "void", name: "knock_down", x: 72.2, y: 72, width: 15, height: 4.3, el: null},
            {id: 53, decision: "first_contact", card: "void", name: "flick_pass", x: 72.2, y: 76.2, width: 12, height: 2.2, el: null}
        ]
    },
    {
        phase: 3,
        keys: [     
            {id: 26, decision: "take_empty_space", card: "flick_into_space", name: "piano_keys", x: 17, y: 45.4, width: 12, height: 2.7, el: null}
        ]
    },
    {
        phase: 4,
        keys: [
            {id: 19, decision: "side_by_side", card: "cut_in_left", name: "layoff", x: 12.5, y: 61.5, width: 12.5, height: 2.2, el: null},
            {id: 20, decision: "side_by_side", card: "cut_in_left", name: "dropoff", x: 14.4, y: 68, width: 10.5, height: 2, el: null},
            {id: 21, decision: "side_by_side", card: "cut_in_right", name: "ccw_curl_and_slide", x: 10, y: 90.1, width: 15, height: 2, el: null},
            {id: 22, decision: "side_by_side", card: "cut_in_right", name: "invertedr_dropoff", x: 12.4, y: 92.2, width: 12.5, height: 2.1, el: null},
            {id: 23, decision: "side_by_side", card: "cut_in_right", name: "dropoff", x: 14.5, y: 94.4, width: 11, height: 2, el: null},
            {id: 24, decision: "head_on", card: "left_option", name: "crossfrog_pass", x: 27.6, y: 9.7, width: 14.7, height: 2, el: null},
            {id: 25, decision: "head_on", card: "right_option", name: "crossfrog_pass", x: 54.5, y: 7.7, width: 14.7, height: 2, el: null},
            {id: 36, decision: "head_on", card: "left_option", name: "dummy", x: 27.6, y: 1.3, width: 5.2, height: 2, el: null},
            {id: 37, decision: "head_on", card: "left_option", name: "flick_and_chase", x: 27.6, y: 3.3, width: 16, height: 2.1, el: null},
            {id: 38, decision: "head_on", card: "right_option", name: "fade", x: 54.5, y: 1.3, width: 5.2, height: 2, el: null},
            {id: 39, decision: "head_on", card: "right_option", name: "flick_and_chase", x: 54.5, y: 3.3, width: 16, height: 2, el: null},
            {id: 40, decision: "side_by_side", card: "cut_in_left", name: "CW_270_curl", x: 9.5, y: 55.3, width: 15.2, height: 2.2, el: null},
            {id: 41, decision: "side_by_side", card: "cut_in_left", name: "windmill", x: 9.8, y: 59.5, width: 15, height: 2.1, el: null},
            {id: 42, decision: "side_by_side", card: "cut_in_right", name: "knuckleR_V", x: 8.6, y: 83.6, width: 16.5, height: 2, el: null},
            {id: 43, decision: "side_by_side", card: "cut_in_right", name: "CCW_270_curl", x: 9.7, y: 77.4, width: 15, height: 2, el: null},
            {id: 44, decision: "side_by_side", card: "cut_in_left", name: "Shovel_V", x: 8.7, y: 57.5, width: 16, height: 2.1, el: null},
            {id: 45, decision: "side_by_side", card: "cut_in_right", name: "Fake_CCW_curl_V", x: 8.7, y: 75.4, width: 16, height: 2, el: null},
            {id: 46, decision: "side_by_side", card: "cut_in_right", name: "Fake_CCW_invertedR_curl_V", x: 8.7, y: 79.4, width: 16, height: 2, el: null},
            {id: 47, decision: "side_by_side", card: "cut_in_right", name: "CCW_360_invertedR_curl", x: 9.8, y: 81.4, width: 15, height: 2.2, el: null},
            {id: 48, decision: "head_on", card: "left_option", name: "Shovel_V", x: 27.6, y: 5.3, width: 7, height: 2.2, el: null},
            {id: 54, decision: "side_by_side", card: "cut_in_left", name: "Shovel_Pass", x: 12.5, y: 65.8, width: 12.5, height: 2.2, el: null},
            {id: 62, decision: "head_on", card: "right_option", name: "Leapfrog_Pass", x: 54.5, y: 5.45, width: 14.7, height: 2.2, el: null},
            {id: 63, decision: "head_on", card: "left_option", name: "Leapfrog_Pass", x: 27.7, y: 7.5, width: 14.7, height: 2.2, el: null},
            {id: 64, decision: "head_on", card: "left_option", name: "Shovel_Pass", x: 27.7, y: 11.5, width: 17, height: 2.2, el: null},
            {id: 65, decision: "head_on", card: "right_option", name: "Flick_Pass", x: 54.5, y: 9.6, width: 17, height: 2.2, el: null},
            {id: 66, decision: "head_on", card: "right_option", name: "Flick_Pass_Forward", x: 54.5, y: 11.5, width: 17, height: 2.2, el: null},
            {id: 67, decision: "head_on", card: "left_option", name: "Flick_Pass_Forward", x: 27.7, y: 13.5, width: 17, height: 2.2, el: null},
            {id: 68, decision: "side_by_side", card: "cut_in_right", name: "Inverted_R_Layoff", x: 12.5, y: 88, width: 12.5, height: 2.2, el: null}
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
    },
    {
        phase: 6,
        keys: [
            {id: 55, decision: "right_wall", card: "leaving", name: "windmill_180_kickoff", x: 65, y: 88, width:17, height: 7, el: null},
            {id: 56, decision: "right_wall", card: "leaving", name: "windmill", x: 65, y: 81, width:7, height: 5, el: null},
            {id: 57, decision: "right_wall", card: "leaving", name: "InvertedR_rakeroll_shovel_V", x: 65, y: 25, width:18, height: 7, el: null},
            {id: 61, decision: "right_wall", card: "leaving", name: "CW_Pinch_Curl_Kickoff", x: 65, y: 45, width:32, height: 7, el: null}
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
    {phase_key: 19, value: "CWLayoff2.gif"},
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
    {phase_key: 36, value: "Dummy.gif"},
    {phase_key: 37, value: "FlickChaseLeft.gif"},
    {phase_key: 38, value: "Fade.gif"},
    {phase_key: 39, value: "FlickChaseRight.gif"},
    {phase_key: 40, value: "360CWCurl.gif"},
    {phase_key: 41, value: "windmill.gif"},
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
    {phase_key: 63, value: "LeapfrogPassLeft2.gif"},
    {phase_key: 64, value: "ShovelPassHeadOn2.gif"},
    {phase_key: 65, value: "FlickPassRight.gif"},
    {phase_key: 66, value: "FlickPassForwardRightOption.gif"},
    {phase_key: 67, value: "FlickPassForwardLeftOption.gif"},
    {phase_key: 68, value: "InvertedRLayoff.gif"}
];


