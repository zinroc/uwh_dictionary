const Promise = require("bluebird");

/**
 * Interacts with user state
 * Requires knex when loaded
 */
module.exports = function (knex) {
    this.knex = knex;

    return {
        create,
        getAll,
        delete: deleteUnit,
        get,
        update,
        createRoom,
        getRooms,
        getRoom,
        updateRoom,
        deleteRoom,
        createParking,
        getParking,
        getParkingByID,
        updateParking,
        deleteParking
    };
};

function deleteParking (uuid) {
    return knex("parking")
    .where("uuid", uuid)
    .delete()
    .then(() => {
        return true;
    }).catch((e) => {
        return false;
    })
}


function deleteRoom (uuid) {
    return knex("rooms")
    .where("uuid", uuid)
    .delete()
    .then(() => {
        return true;
    }).catch((e) => {
        return false;
    })
}

function getRoom (uuid) {
    return knex("rooms")
    .where("uuid", uuid)
    .then((rows) => {
        if (rows.length) {
            return rows[0];
        } else {
            return false;
        }
    }).catch((e) => {
        return false;
    });
}

function getParkingByID (uuid) {
    return knex("parking")
    .where("uuid", uuid)
    .then((rows) => {
        if (rows.length) {
            return rows[0];
        } else {
            return false;
        }
    }).catch((e) => {
        return false;
    });
}

function getParking (unit) {
    return knex("parking")
    .where("unit", unit)
    .then((rows) => {
        return rows;
    }).catch((e) => {
        return false;
    });
}

function getRooms (unit) {
    return knex("rooms")
    .where("unit", unit)
    .then((rows) => {
        return rows;
    }).catch((e) => {
        return false;
    });
}

function deleteUnit (unit) {
    return knex("rooms")
    .delete()
    .where("unit", unit)
    .then(() => {
        return knex("parking")
        .delete()
        .where("unit", unit);
    }).then(() => {
        return knex("units")
        .delete()
        .where("uuid", unit);
    }).then(() => {
        return true;
    }).catch((e) => {
        return false;
    });
}

function get (unit) {
    return knex("units")
    .select("*")
    .select(knex.raw('(SELECT COUNT(*) FROM parking WHERE unit = units.uuid) AS parking_count'))
    .select(knex.raw('(SELECT COUNT(*) FROM rooms WHERE unit = units.uuid) AS room_count'))
    .where("uuid", unit)
    .then((rows) => {
        if (rows.length) {
            return rows[0];
        } else {
            return false;
        }
    }).catch((e) => {
        return false;
    });
}

function getAll (project) {
    return knex("units")
    .select("*")
    .select(knex.raw('(SELECT COUNT(*) FROM parking WHERE unit = units.uuid) AS parking_count'))
    .select(knex.raw('(SELECT COUNT(*) FROM rooms WHERE unit = units.uuid) AS room_count'))
    .where("project", project)
    .then((rows) => {
        return rows;
    }).catch((e) => {
        return false;
    });
}

function update (unit, name, type, description, ac, heat, floor, taxes, square_feet) {
    return knex("units")
    .where("uuid", unit)
    .update({
        name: name,
        type: type, 
        description: description,
        ac: ac,
        heat: heat,
        floor: floor,
        taxes: taxes,
        square_feet: square_feet
    }).then((result) => {
        return true;
    }).catch((e) => {
        return false;
    })
}

function createParking (unit, uuid, name, type) {
    return knex("parking")
    .insert({
        unit: unit,
        uuid: uuid,
        name: name,
        type: type
    }).returning("uuid").then((id) => {
        return id[0];
    }).catch((e) => {
        return false;
    });
}

function createRoom (unit, uuid, type, width, length) {
    return knex("rooms")
    .insert({
        unit: unit,
        uuid: uuid,
        type: type,
        room_width: width,
        room_length: length
    }).returning("uuid").then((id) => {
        return id[0];
    }).catch((e) => {
        return false;
    });
}

function updateParking (parking, name, type) {
    return knex("parking")
    .update({
        name: name,
        type: type
    })
    .where("uuid", parking)
    .then(() => {
        return true;
    }).catch((e) => {
        return false;
    });
}

function updateRoom (room, type, width, length) {
    return knex("rooms")
    .update({
        type: type,
        room_width: width,
        room_length: length
    })
    .where("uuid", room)
    .then(() => {
        return true;
    }).catch((e) => {
        return false;
    });
}

/**
* Create a new unit if no entry exists
* Returns INT (unit.uuid) of new unit xor existing unit
*/
function create (project, uuid, name, type, description, ac, heat, floor, taxes, square_feet) {

    return knex("units")
    .where({project: project, name: name})
    .select("*")
    .then((rows) => {
        if (rows.length === 0) {//if this entry does not exist, add it
            return knex('units')
            .insert({
                project: project,
                uuid: uuid,
                name: name,
                type: type, 
                description: description,
                ac: ac,
                heat: heat,
                floor: floor,
                taxes: taxes,
                square_feet: square_feet
            }).returning("uuid").then((id)=> {
                return id[0];
            });
        } else { //if it does exist, do not add it
            return rows[0].uuid;
        }
    }).catch((e) => {
        return false;
    });
}