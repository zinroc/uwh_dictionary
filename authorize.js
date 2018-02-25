"use strict";

const Promise = require ("bluebird");

const credentials = require("./credentials.js");
const knex = require("knex")({
    client: "pg",
    connection: credentials.PG_CON_STRING
});
const userStore = require("./stores/userStore.js")(knex);

const error = require("./error.js");
let authorize = {};

module.exports = authorize = {
    token,
    registrationToken,
    recoveryToken,
    projectAccess,
    unitAccess,
    roomAccess,
    parkingAccess
};



function projectAccess(owner, uuid) {
    const projectStore = require("./stores/projectStore.js")(knex);

    return projectStore.get(uuid).then((result) => {
        if (result) {
            if (result.owner === owner) {
                return 200;
            } else {
                return 'invalid project owner';
            }
        } else {
            return 'invalid project uuid';
        }
    }).catch((e) => {
        return 'database auth error';
    });
}

function unitAccess(owner, uuid) {
    const unitStore = require("./stores/unitStore.js")(knex);

    return unitStore.get(uuid).then((result) => {
        if (result) {
            return projectAccess(owner, result.project);
        } else {
            return 'invalid unit uuid';
        }
    }).then((result) => {
        return result;
    }).catch((e) => {
        return 'database auth error';
    });
}

function roomAccess(owner, uuid) {
    const unitStore = require("./stores/unitStore.js")(knex);

    return unitStore.getRoom(uuid).then((result) => {
        if (result) {
            return unitAccess(owner, result.unit);
        } else {
            return 'invalid room uuid';
        }
    }).then((result) => {
        return result;
    }).catch((e) => {
        return 'database auth error';
    });
}

function parkingAccess(owner, uuid) {
    const unitStore = require("./stores/unitStore.js")(knex);

    return unitStore.getParkingByID(uuid).then((result) => {
        if (result) {
            return unitAccess(owner, result.unit);
        } else {
            return 'invalid parking uuid';
        }
    }).then((result) => {
        return result;
    }).catch((e) => {
        return 'database auth error';
    });
}

function token (email, token) {
    return userStore.get(email).then((result) => {
        if(result.token && token === result.token){
            return true;
        } else {
            return false;
        }
    }).catch((e) => {
        return false;
    });
}

function recoveryToken (email, token) {
    return userStore.get(email).then((result) => {
        if (result.recover_token === token) {
            return true;
        } else {
            return false;
        }
    }).catch((e) => {
        return false;
    });
}

function registrationToken (email, token) {
    return userStore.get(email).then((result) =>{
        if (!result){
            return "user not found";
        } else if (result.email_verified) {
            return "user already verified";
        } else if (result.registration_token !== token) {
            return "invalid registration token";
        } else {
            return 200;
        }
    }).catch((e) => {
        return 'database auth error';
    });
}