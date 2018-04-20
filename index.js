var express = require("express"),
    bodyParser = require("body-parser"),
    //database_setup = require("./database_setup.js"),
    //credentials = require("./credentials.js"),
    parseurl = require('parseurl'),
    randtoken = require('rand-token'),
    error = require("./error.js"),
    validator = require('express-validator'),
    validate = require("./validate.js"),
    phase = require("./phase.js");

const app = express();

app.use(bodyParser.json());
app.use(validator());
app.set("port", process.env.PORT || 8081);

app.use(express.static("public"));

/********************** Views *************************************/


const showHomeScreen = (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
};


app.route("/").get(showHomeScreen);

/********************** Views *************************************/

app.route("/api/phases").get(
    (req, res) => {
        validate.request(req, {})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                phase.get(res);
            } else {
                error.respondWithArr(
                    error.new(
                        error.codes.BAD_REQUEST, invalidParams.array()
                    ), 
                    res
                );
            }
        });
    }
);

app.route("/api/phases/keys").get(
    (req, res) => {
        validate.request(req, {phase: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                phase.getKeys(req.query.phase, res);
            } else {
                error.respondWithArr(
                    error.new(
                        error.codes.BAD_REQUEST, invalidParams.array()
                    ), 
                    res
                );
            }
        });
    }
);

app.route("/api/phases/key_values").get(
    (req, res) => {
        validate.request(req, {phase_key: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                phase.getKeyValues(req.query.phase_key, res);
            } else {
                error.respondWithArr(
                    error.new(
                        error.codes.BAD_REQUEST, invalidParams.array()
                    ), 
                    res
                );
            }
        });
    }
);

app.route("/api/phases/search_values").get(
    (req, res) => {
        validate.request(req, {})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                phase.getSearchValues(res);
            } else {
                error.respondWithArr(
                    error.new(
                        error.codes.BAD_REQUEST, invalidParams.array()                    
                    ),
                    res
                );
            }
        });
    }
);

/** Redirect mispelled urls to login page*/
app.route("*").get(
    (req, res) => {
        res.status(404).send("api endpoint not found");
    }
);

app.listen(app.get("port"), function () {
    console.log("Server running on port " + app.get("port"));
});
