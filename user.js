"use strict";

const Promise = require ("bluebird");

const credentials = require("./credentials.js"),
    authorize = require("./authorize.js"),
    error = require("./error.js"),
    randtoken = require('rand-token'),
    mailer = require("./mailer.js")

let users = {};

const knex = require("knex")({
    client: "pg",
    connection: credentials.PG_CON_STRING
});

const userStore = require("./stores/userStore.js")(knex);
const passwordHash = require('password-hash');

const unrestrictedURL = "/tempViews/login.html";

module.exports = users = {
    register,
    login,
    route,
    logout,
    get,
    delete: deleteInfo,
    update,
    activate,
    recover,
    passwordReset
};



function activate (email, token, response) {
    authorize.registrationToken(email, token).then((result) => {
        if (result === 200) {
            return userStore.verify(email);
        } else {
            throw error.new(error.codes.UNAUTHORIZED, result);
        }
    }).then(function (result) {
        if (result) {
            response.status(200).send("activated, go to localhost:8081");
        } else {
            throw error.new(error.codes.INTERNAL_SERVER_ERROR, "database error"); 
        }
    }).catch((e) => {
        error.respond(e, response);
    });
}

function get (email, response) {
    userStore.get(email).then((result) => {
        if (result) {
            const userInfo = {id: result.id, email: result.email}; //only show partial info to client
            response.status(200).send(userInfo).end();
        } else {
            throw error.new(error.codes.NOT_FOUND, "user does not exist");
        }
    }).catch((e) => {
        error.respond(e, response);
    });
}

function recover (email, response) {
    const recover_token = randtoken.generate(16);
    userStore.get(email).then((result) => {
        if (result) {
            return userStore.updateRecoverToken(email, recover_token);
        } else {
            throw error.new(error.codes.NOT_FOUND, "user does not exist");
        }
    }).then((result) => {
        if (result) {
            return mailer.sendRecoveryRequest(email, recover_token)
        } else {
            throw error.new(error.codes.INTERNAL_SERVER_ERROR, "database error");
        }
    }).then((result) =>{
        if (result) {
            response.status(200).send('recovery email sent');
        } else {
            throw error.new(error.codes.INTERNAL_SERVER_ERROR, "failed sending recovery email");
        }
    }) .catch((e) => {
        error.respond(e, response);
    });
}

function register (email, password, response) {
    const registration_token = randtoken.generate(16);
    userStore.get(email).then((result) => {
        if (!result){
            const hash = passwordHash.generate(password);
            return userStore.create(email, hash, registration_token);
        } else {
            throw error.new(error.codes.CONFLICT, "user already exists");
        }
    }).then((result) => {
        if (result) {
            return mailer.sendActivation(email, registration_token);
        } else {
            throw error.new(error.codes.INTERNAL_SERVER_ERROR, "failed password hash");
        }
    }).then((result) => {
        if (result){
            response.status(200).send("user registered").end();
        } else {
            throw error.new(error.codes.INTERNAL_SERVER_ERROR, "failed sending activation email");
        }
    }).catch((e) => {
        error.respond(e, response);
    });
}

function passwordReset (email, token, response) {
    const newPassword = randtoken.generate(16);
    authorize.recoveryToken(email, token)
    .then((result) => {
        if (result) {
            const hash = passwordHash.generate(newPassword);
            return userStore.update(email, hash); // update also always nulls out recover_token
        } else {
            throw error.new(error.codes.UNAUTHORIZED, "unauthorized session");
        }
    }).then((result) => {
        if (result) {
            response.status(200).send("New password: " + newPassword);
        } else {
            throw error.new(error.codes.INTERNAL_SERVER_ERROR, "database error");
        }
    }).catch((e) => {
        error.respond(e, response);
    });
}; 

function update (email, token, password, response) {
    authorize.token(email, token).then((result) => {
        if (result) {
            const hash = passwordHash.generate(password);
            return userStore.update(email, hash);
        } else {
            throw error.new(error.codes.UNAUTHORIZED, "unauthorized session");
        }
    }).then((result)=>{
        if (result) {
            response.status(200).send("password updated").end();
        } else {
            throw error.new(error.codes.INTERNAL_SERVER_ERROR, "database error");
        }
    }).catch((e) => {
        error.respond(e, response);
    });
}

function login (email, password, token, response) {
    userStore.get(email).then((result) => {
        if (!result){
            throw error.new(error.codes.NOT_FOUND, "user does not exist");
        }
        else if (!result.email_verified) {
            throw error.new(error.codes.UNAUTHORIZED, "email has not been verified");
        } else {
            return passwordHash.verify(password, result.hash);
        }
    }).then((result) => {
        if (result) {
            return userStore.updateToken(email, token);
        } else {
            throw error.new(error.codes.UNAUTHORIZED, "wrong password");
        }
    }).then((result) => {
        if (result){
            response.status(200).send("logged in").end();
        } else {
            throw error.new(error.codes.INTERNAL_SERVER_ERROR, "database error");
        } 
    }).catch((e) => {
        error.respond(e, response);
    });
}

function route (page, email, token, response) {
    const pageURL = "/tempViews/" + page + ".html";
    userStore.get(email).then((result) => {
        if (!result){
            response.sendFile(__dirname + unrestrictedURL);
        }
        else if(result.token && token === result.token){
            response.sendFile(__dirname + pageURL);
        } else {
            response.sendFile(__dirname + unrestrictedURL);
        }
    }).catch((e) => {
        error.respond(e, response);
    });
}

function deleteInfo (email, token, response) {
    authorize.token(email, token).then((result) => {
        if (result){
            return userStore.delete(email);
        } else {
            throw error.new(error.codes.UNAUTHORIZED, "unauthorized session");
        }
    }).then((result)=>{
        if (result) {
            response.status(200).send("account deleted");
        } else {
            throw error.new(error.codes.INTERNAL_SERVER_ERROR, "database error");
        }
    }).catch((e) => {
        error.respond(e, response);
    });
}

function logout (email, token, response) {
    authorize.token(email, token).then((result) => {
        if (result){
            userStore.updateToken(email, null);
            response.status(200).send("logged out");
        } else {
            throw error.new(error.codes.UNAUTHORIZED, "unauthorized session");
        }
    }).catch((e) => {
        error.respond(e, response);
    });
}
