// server.js
var express = require("express");
var logfmt = require("logfmt");
var	http = require("http");
var	mongoose = require("mongoose");
var ObjectId = require("mongoose").ObjectID;
var MessageController = require("./client/controllers/message_controller.js");


// dev
//var port = 3000;
// prod
var port = process.env.PORT || 3000;

var app = express();

// set up a static file directory to use for default routing
// also see the note below about Windows
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded());

app.use(logfmt.requestLogger());
var mongoURI = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/amazerrific';

// Connect to the amazerrific data store in mongo
mongoose.connect(mongoURI);

// Create our Express-powered HTTP server
http.createServer(app).listen(port);

// set up our routes
app.get("/", function (req, res) {
	res.send("root");
});

app.get("/messages.json", MessageController.list); 
app.post("/sendMessage", MessageController.create);
app.post("/deleteMessage", MessageController.remove); 


console.log("Listening on " + port);

