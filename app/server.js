// server.js
var express = require("express");
var logfmt = require("logfmt");
var	http = require("http");
var	mongoose = require("mongoose");
var ObjectId = require("mongoose").ObjectID;

//var	mongodb = require("mongodb");

// dev
var port = 3000;
// prod
//var port = process.env.PORT || 5000;

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

http.createServer(app).listen(port);


// This is our mongoose model for todos
var MessageSchema = mongoose.Schema({
	message: String,
	messageDate: Date
});

var Message = mongoose.model("Message", MessageSchema);

// Create our Express-powered HTTP server
// and have it listen on port 3000
//http.createServer(app).listen(3000);

// set up our routes
app.get("/", function (req, res) {
	res.send("root");
});

app.get("/messages.json", function (req, res) {
	// res.json returns the entire object as a JSON file
	//res.json(tweetCounts);
	Message.find({}, function (err, messages) {
		// check for errors
		res.json(messages);
	});
});

app.get("/messageList", function (req, res) {
	res.send("messagelist.html");
});

app.get("/messages.json", function (req, res) {
	// res.json returns the entire object as a JSON file
	//res.json(tweetCounts);
	Message.find({}, function (err, messages) {
		// check for errors
		res.json(messages);
	});
});

app.post("/sendMessage", function (req, res) {
	var date = new Date();
	var newMessage = new Message({"message":req.body.message, "messageDate":date.toISOString()});

	newMessage.save(function (err, result) {
	if (err !== null) {
		console.log(err);
		res.send("ERROR");
	} else {
	
		// our client expects *all* of the todo items to be returned,
		// so we do an additional request to maintain compatibility
		Message.find({}, function (err, result) {
			if (err !== null) {
				// the element did not get saved!
				res.send("ERROR");
			}
			res.json(result);
		});
		
	}

	});
});

app.post("/deleteMessage", function (req, res) {

		var dateToDelete = req.body.messageDate;
		console.log("dateToDelete: " + dateToDelete);
		// our client expects *all* of the todo items to be returned,
		// so we do an additional request to maintain compatibility
		Message.remove({"messageDate": dateToDelete}, function (err, result) {
			if (err !== null) {
				// the element did not get saved!
				res.send("ERROR");
			}
			res.json(result);
		});

});


console.log("Listening on " + port);

