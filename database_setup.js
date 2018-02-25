"use strict";

const Promise = require("bluebird"),
    credentials = require("./credentials.js");

const knex = require("knex")({
    client: "pg",
    connection: credentials.PG_CON_STRING
});

const schema = require("./schema.js")(knex);

module.exports = {
    createTables: () => {
        console.log("Creating tables...");
        return schema.createUsersTable()
            .then(schema.createProjectsTable)
            .then(schema.createUnitsTable)
            .then(schema.createRoomsTable)
            .then(schema.createParkingTable)
        .error((e) => {
            console.error("There was an error creating some tables");
            console.error(e);
        });
    }
};
