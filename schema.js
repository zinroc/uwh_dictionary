"use strict";

var knex;
module.exports = function (k) {
    knex = k;
    return {
        createUsersTable, 
        createProjectsTable,
        createUnitsTable,
        createRoomsTable,
        createParkingTable
    };
};

function createParkingTable () {
    return knex.schema.hasTable("parking")
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable("parking", (table) => {
                table.increments("id");
                table.string("unit").references("uuid").inTable("units");
                table.string("uuid");
                table.string("name");
                table.string("type");
            });
        }
    });
}

function createUnitsTable () {
    return knex.schema.hasTable("units")
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable("units", (table) => {
                table.increments("id");
                table.string("uuid").unique();
                table.string("project").references("uuid").inTable("projects");
                table.string("name");
                table.string("type");
                table.text("description");
                table.string("ac");
                table.string("heat");
                table.string("floor");
                table.string("taxes");
                table.integer("square_feet");
                table.string("mesh_reference");
                table.string("mls_id");
            });
        }
    });
}

function createRoomsTable () {
    return knex.schema.hasTable("rooms")
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable("rooms", (table) => {
                table.increments("id");
                table.string("uuid").unique();
                table.string("unit").references("uuid").inTable("units");
                table.string("type");
                table.integer("room_width");
                table.integer("room_length");
            });
        }
    });
}

function createProjectsTable () {
    return knex.schema.hasTable("projects")
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable("projects", (table) => {
                table.increments("id");
                table.string("uuid").unique();
                table.string("owner").references("email").inTable("users");
                table.string("name");
                table.string("latitude");
                table.string("longitude");
                table.text("address");
                table.string("json");
            });
        }
    });
}

function createUsersTable () {
    return knex.schema.hasTable("users")
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable("users", (table) => {
                table.increments("id");
                table.string("email").unique();
                table.text("hash");
                table.string("token");
                table.string("registration_token");
                table.boolean("email_verified").defaultTo(false);
                table.string("recover_token");
            });
        }
    });
}
