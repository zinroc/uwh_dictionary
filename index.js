var express = require("express"),
    bodyParser = require("body-parser"),
    //database_setup = require("./database_setup.js"),
    //credentials = require("./credentials.js"),
    parseurl = require('parseurl'),
    randtoken = require('rand-token'),
    error = require("./error.js"),
    validator = require('express-validator'),
    validate = require("./validate.js");




const session = require('express-session');
//const KnexSessionStore = require('connect-session-knex')(session);

//const knex = require("knex")({
//    client: "pg",
//    connection: credentials.PG_CON_STRING
//});

//const store = new KnexSessionStore({
//    knex: knex,
//    tablename: 'sessions'
//});

const app = express();

//app.use(session({
//    secret: 'beep borp', 
//   resave: false,
//    saveUninitialized: false,
//    cookie: {
//        maxAge: 300000 // 5 min
//    },
//    store: store
//}));

//app.use((req, res, next) => {
//  let views = req.session.views;

//  if (!views) {
//    views = req.session.views = {};
//  }
  // get the url pathname
//  const pathname = parseurl(req).pathname;

  // count the views
//  views[pathname] = (views[pathname] || 0) + 1;

//  next();
//});

app.use(bodyParser.json());
app.use(validator());
app.set("port", process.env.PORT || 8081);

app.use(express.static("public"));


//database_setup.createTables().then(() => {
//    console.log("tables created");
//});

/********************** Views *************************************/


const showHomeScreen = (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
};


app.route("/").get(showHomeScreen);

/********************** Views *************************************/

/** Redirect mispelled urls to login page*/
app.route("*").get(showHomeScreen);

app.listen(app.get("port"), function () {
    console.log("Server running on port " + app.get("port"));
});
