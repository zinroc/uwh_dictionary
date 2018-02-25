const Promise = require("bluebird");

/**
 * Interacts with user state
 * Requires knex when loaded
 */


module.exports = function (knex) {
    this.knex = knex;

    return {
        create,
        get, 
        updateToken, 
        delete: deleteInfo,
        update,
        verify,
        updateRecoverToken
    };
};

function updateRecoverToken (email, token) {
    return knex("users")
    .where("email", email)
    .update("recover_token", token)
    .then(() => {
        return true;
    }).catch((e) => {
        return false;
    });
};

function verify (email) {
    return knex("users")
    .where("email", email)
    .update("email_verified", true)
    .then(() =>  {
        return true;
    }).catch((e) => {
        return false;
    });
};

function update (email, hash) {
    return knex("users")
    .where("email", email)
    .update({
        hash: hash,
        recover_token: null
    })
    .then(() => {
        return true;
    }).catch((e) => {
        return false;
    });
};

function deleteInfo(email) {
    return knex("rooms")
    .whereIn("unit", (knex) => {
        knex.select("uuid").from("units").whereIn("project", (knex) => {
            knex.select("uuid").from("projects").where("owner", email);
        })
    })
    .delete()
    .then(() => {
        return knex("parking")
        .whereIn("unit", (knex) => {
            knex.select("uuid").from("units").whereIn("project", (knex) => {
                knex.select("uuid").from("projects").where("owner", email);
            })
        })
        .delete();
    }).then(() =>{
        return knex("units")
        .whereIn("project", (knex) => {
            knex.select('uuid').from('projects').where('owner', email);
        })
        .delete();
    }).then(() => {
        return knex("projects")
        .where("owner", email)
        .delete();
    }).then(() => {
        return knex("users")
        .where("email", email)
        .delete();
    }).then(()=> {
        return true;
    }).catch((e) => {
        return false;
    });
};

/**
* Register a new user if no entry exists
* Returns INT (user.id) of new user xor existing user
*/
function create (email, hash, registration_token) {
    return knex("users")
    .where("email", email)
    .select("*")
    .then((rows) => {
        if (rows.length === 0) {//if this entry does not exist, add it
            return knex('users')
            .insert({
                email: email,
                hash: hash,
                registration_token, registration_token
            }).returning("id").then((id) => {
                return id[0];
            });
        } else { //if it does exist, do not add it
            return rows[0].id;
        }
    }).catch((e) => {
        return false;
    });
};
/**
 * Returns OBJECT user entry xor false
 */
function get (email) {
    return knex("users")
    .where("email", email)
    .select("*")
    .then((rows) => {
        if (rows.length === 0) {
            return false //no use exists
        } else {
            return rows[0];
        }
    }).catch((e) => {
        return false;
    });
};

/*
    * returns true if success or false if error  
*/
function updateToken (email, token) {
    return knex("users")
    .where("email", email)
    .update("token", token)
    .then(() => {
        return true;
    }).catch((error) => {
        return false;
    });
};
