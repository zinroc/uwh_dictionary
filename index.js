var express = require("express"),
    bodyParser = require("body-parser"),
    database_setup = require("./database_setup.js"),
    user = require("./user.js"),
    project = require("./project.js");
    credentials = require("./credentials.js"),
    parseurl = require('parseurl'),
    randtoken = require('rand-token'),
    error = require("./error.js"),
    validator = require('express-validator'),
    validate = require("./validate.js"),
    unit = require("./unit.js")




const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const knex = require("knex")({
    client: "pg",
    connection: credentials.PG_CON_STRING
});

const store = new KnexSessionStore({
    knex: knex,
    tablename: 'sessions'
});

const app = express();

app.use(session({
    secret: 'beep borp', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 300000 // 5 min
    },
    store: store
}));

app.use((req, res, next) => {
  let views = req.session.views;

  if (!views) {
    views = req.session.views = {};
  }
  // get the url pathname
  const pathname = parseurl(req).pathname;

  // count the views
  views[pathname] = (views[pathname] || 0) + 1;

  next();
});

app.use(bodyParser.json());
app.use(validator());
app.set("port", process.env.PORT || 8081);

app.use(express.static("public"));


database_setup.createTables().then(() => {
    console.log("tables created");
});

/********************** Views *************************************/


const showLoginScreen = (req, res) => {
    res.sendFile(__dirname + "/tempViews/login.html");
};


app.route("/").get(showLoginScreen);
app.route("/login").get(showLoginScreen);
app.route("/dashboard").get(
    (req, res) => {
        //route successful if session token matches auth token in DB for this sessions email
        user.route("dashboard", req.session.email, req.session.token, res);
    }
);


/********************** Views *************************************/

/********************** PARKING *************************************/
app.route("/api/parking").put(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'body', parking_name: 'body', parking_type: 'body'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                unit.updateParking(req.session.email, req.session.token, req.body.uuid, req.body.parking_name, req.body.parking_type, res);
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
).post(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'body', parking_name: 'body', parking_type: 'body'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                unit.createParking(req.session.email, req.session.token, req.body.uuid, req.body.parking_name, req.body.parking_type, res);
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
).get(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                unit.getParking(req.session.email, req.session.token, req.query.uuid, res);
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
).delete(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                unit.deleteParking(req.session.email, req.session.token, req.query.uuid, res);
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
/********************** PARKING *************************************/
/********************** ROOMS *************************************/
app.route("/api/room").put(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'body', room_type: 'body', room_width: 'body', room_length: 'body'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                unit.updateRoom(req.session.email, req.session.token, req.body.uuid, req.body.room_type, req.body.room_width, req.body.room_length, res);
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
).post(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'body', room_type: 'body', room_width: 'body', room_length: 'body'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                unit.createRoom(req.session.email, req.session.token, req.body.uuid, req.body.room_type, req.body.room_width, req.body.room_length, res);
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
).get(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                unit.getRooms(req.session.email, req.session.token, req.query.uuid, res);
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
).delete(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                unit.deleteRoom(req.session.email, req.session.token, req.query.uuid, res);
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
/********************** ROOMS *************************************/
/********************** UNITS *************************************/
app.route("/api/unit/full").get(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                unit.getCompleteUnit(req.session.email, req.session.token, req.query.uuid, res);
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
)


app.route('/api/unit/upload').post(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                unit.uploadFloorplan(req.session.email, req.session.token, req.query.uuid, req, res);
            } else {
                error.respondWithArr(
                    error.new(
                        error.codes.BAD_REQUEST, invalidParams.array()
                    ), 
                    res
                );
            }
        })

    }
);

app.route("/api/unit").post(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'body', unit_name: 'body', unit_type: 'body', description: 'body', ac: 'body', heat: 'body', floor: 'body', taxes: 'body', square_feet: 'body'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                unit.create(req.session.email, req.session.token, req.body.uuid, req.body.unit_name, req.body.unit_type, req.body.description, req.body.ac, req.body.heat, req.body.floor, req.body.taxes, req.body.square_feet, res);
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
).put(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'body', unit_name: 'body', unit_type: 'body', description: 'body', ac: 'body', heat: 'body', floor: 'body', taxes: 'body', square_feet: 'body'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                unit.update(req.session.email, req.session.token, req.body.uuid, req.body.unit_name, req.body.unit_type, req.body.description, req.body.ac, req.body.heat, req.body.floor, req.body.taxes, req.body.square_feet, res);
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
).get(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                unit.getAll(req.session.email, req.session.token, req.query.uuid, res);
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
).delete(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                unit.delete(req.session.email, req.session.token, req.query.uuid, res);
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
/********************** UNITS *************************************/
/********************** Projects *************************************/
app.route("/api/project/next").get(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', id: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()){
                project.getNext(req.session.email, req.session.token, req.query.id, res);
            } else {
                error.respondWithArr(
                    error.new(
                        error.codes.UNAUTHORIZED, invalidParams.array()
                    ), 
                    res
                );
            }
        });
    }
);

app.route("/api/project/prev").get(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', id: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()){
                project.getPrev(req.session.email, req.session.token, req.query.id, res);
            } else {
                error.respondWithArr(
                    error.new(
                        error.codes.UNAUTHORIZED, invalidParams.array()
                    ), 
                    res
                );
            }
        });
    }
);

app.route("/api/project/recent").get(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()){
                project.getRecent(req.session.email, req.session.token, res);
            } else {
                error.respondWithArr(
                    error.new(
                        error.codes.UNAUTHORIZED, invalidParams.array()
                    ), 
                    res
                );
            }
        });
    }
);



app.route("/api/project").post(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', project_name: 'body', latitude: 'body', longitude: 'body', address: 'body'})
        .then((invalidParams) => {
           if (invalidParams.isEmpty()){
                project.create(req.session.email, req.session.token, req.body.project_name, req.body.latitude, req.body.longitude, req.body.address, res);
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
).get(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()){
                project.getAll(req.session.email, req.session.token, res);
            } else {
                error.respondWithArr(
                    error.new(
                        error.codes.UNAUTHORIZED, invalidParams.array()
                    ), 
                    res
                );
            }
        });
    }
).put(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'body', project_name: 'body', latitude: 'body', longitude: 'body', address: 'body'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                project.update(req.session.email, req.session.token, req.body.uuid, 
                    req.body.project_name, req.body.latitude, req.body.longitude, req.body.address, res);
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
).delete(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session', uuid: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                project.delete(req.session.email, req.session.token, req.query.uuid, res);
            } else {
                error.respondWithArr(
                    error.new(
                        error.codes.UNAUTHORIZED, invalidParams.array()
                    ),
                    res
                );
            }
        });
    }
);
/********************** Projects *************************************/
/********************** Users *************************************/
app.route("/api/user/logout").put(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                user.logout(req.session.email, req.session.token, res);
            } else {
                error.respondWithArr(
                    error.new(
                        error.codes.UNAUTHORIZED, invalidParams.array()
                    ), 
                    res
                );
            }
        });
    }
);

app.route("/api/user/activate").get(
    (req, res) => {
        validate.request(req, {email: 'query', token: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                user.activate(req.query.email, req.query.token, res);
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

app.route("/api/user/passwordreset").get(
    (req, res) => {
        validate.request(req, {email: 'query', token: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                user.passwordReset(req.query.email, req.query.token, res);
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

app.route("/api/user/recover").get(
    (req, res) => {
        validate.request(req, {email: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                user.recover(req.query.email,  res);
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

app.route("/api/user").post(
    (req, res) => {
        validate.request(req, {email: 'body', password: 'body'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                user.register(req.body.email, req.body.password, res);
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
).put(
    (req, res) => {
        validate.request(req, {password: 'body', email: 'session', token: 'session'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                user.update(req.session.email, req.session.token, req.body.password, res);
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
).get(
    (req, res) => {
        validate.request(req, {email: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                user.get(req.query.email, res);
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
).delete(
    (req, res) => {
        validate.request(req, {email: 'session', token: 'session'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()) {
                user.delete(req.session.email, req.session.token, res);
            } else {
                error.respondWithArr(
                    error.new(
                        error.codes.UNAUTHORIZED, invalidParams.array()
                    ), 
                    res
                );
            }
        });
    }
);

app.route("/api/user/login").get(
    (req, res) => {
        validate.request(req, {email: 'query', password: 'query'})
        .then((invalidParams) => {
            if (invalidParams.isEmpty()){
                var token = randtoken.generate(16);
                //update auth token in DB (only happens if login successful)
                user.login(req.query.email, req.query.password, token, res);
                //initialize session token and email (always happens)
                req.session.token = token;
                req.session.email = req.query.email;
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



/********************** users *************************************/

/** Redirect mispelled urls to login page*/
app.route("*").get(showLoginScreen);

app.listen(app.get("port"), function () {
    console.log("Server running on port " + app.get("port"));
});
