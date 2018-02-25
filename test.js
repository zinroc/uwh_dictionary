"use strict";
/** 
* example of how to structure error handeling
**/
const Promise = require ("bluebird");

const credentials = require("./credentials.js"),
    error = require("./error.js")

let test = {};


const dummyPromise = new Promise(function (resolve, reject) {
    resolve("good stuff");
});

module.exports = test = {
    catchChain: catchChain
};

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

