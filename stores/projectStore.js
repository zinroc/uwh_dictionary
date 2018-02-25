const Promise = require("bluebird");

/**
 * Interacts with user state
 * Requires knex when loaded
 */
const PROJECT_LOAD_LIMIT = 3;

module.exports = function (knex) {
    this.knex = knex;

    return {
        create,
        getAll,
        get,
        update,
        delete: del,
        getRecent,
        getNext,
        getPrev
    };
};

function del (uuid) {
    return knex("rooms")
    .whereIn('unit', (knex) => {
        knex.select('uuid').from('units').where('project', uuid);
    })
    .delete()
    .then(() => {
        return knex("parking")
        .whereIn('unit', (knex) => {
            knex.select('uuid').from('units').where('project', uuid);
        })
        .delete();
    }).then(() => {
        return knex("units")
        .where("project", uuid)
        .delete();
    }).then(() => {
        return knex("projects")
        .where("uuid", uuid)
        .delete()
        .then(() => {
            return true;
        });
    }).catch((e) => {
        return false;
    });
}

function update (uuid, name, latitude, longitude, address) {
    return knex("projects")
    .where("uuid", uuid)
    .update({
        name: name,
        latitude: latitude,
        longitude: longitude,
        address: address
    })
    .then(() => {
        return true;
    }).catch((e) => {
        return false;
    });
}

function get (uuid) {
    return knex("projects")
    .where("uuid", uuid)
    .select("*")
    .select(knex.raw('(SELECT COUNT(*) FROM units WHERE project = projects.uuid) AS unit_count'))
    .then((rows) => {
        if (rows.length) {
            return rows[0];
        } else {
            return false; //no project with this uuid
        }
    }).catch((e) => {
        return false;
    });
}

function getRecent (owner) {
    return knex("projects")
    .where("owner", owner)
    .select("*")
    .select(knex.raw('(SELECT COUNT(*) FROM units WHERE project = projects.uuid) AS unit_count'))
    .orderBy('id', 'desc')
    .limit(PROJECT_LOAD_LIMIT) 
    .then((rows) => {
        return rows;
    }).catch((e) => {
        return false;
    });
}

function getPrev (owner, firstID) {
    return knex("projects")
    .where("owner", owner)
    .andWhere("id", ">", firstID)
    .select("*")
    .select(knex.raw('(SELECT COUNT(*) FROM units WHERE project = projects.uuid) AS unit_count'))
    .orderBy('id', 'asc')
    .limit(PROJECT_LOAD_LIMIT)
    .then((rows) =>{
        return rows;
    }).catch((e) => {
        return false;
    });
}

function getNext (owner, lastID) {
    return knex("projects")
    .where("owner", owner)
    .andWhere("id", "<", lastID)
    .select("*")
    .select(knex.raw('(SELECT COUNT(*) FROM units WHERE project = projects.uuid) AS unit_count'))
    .orderBy('id', 'desc')
    .limit(PROJECT_LOAD_LIMIT)
    .then((rows) =>{
        return rows;
    }).catch((e) => {
        return false;
    });
}

function getAll (owner) {
    return knex("projects")
    .where("owner", owner)
    .select("*")
    .select(knex.raw('(SELECT COUNT(*) FROM units WHERE project = projects.uuid) AS unit_count'))
    .then((rows) => {
        return rows;
    }).catch((e) => {
        return false;
    });
}

/**
* Create a new project if no entry exists
* Returns INT (project.uuid) of new project xor existing project
*/
function create (owner, uuid, name, latitude, longitude, address) {
    return knex("projects")
    .where({owner, owner, name: name})
    .select("*")
    .then((rows) =>{
        if (rows.length === 0) {//if this entry does not exist, add it
            return knex('projects')
            .insert({
                owner: owner,
                uuid: uuid,
                name: name,
                latitude, latitude,
                longitude, longitude,
                address, address
            }).returning("uuid").then((id)=> {
                return id[0];
            });
        } else { //if it does exist, do not add it
            return rows[0].uuid;
        }
    }).catch((e) => {
        return false;
    });
};
