var mongoose = require("mongoose");

// This is our mongoose model for messages
var MessageSchema = mongoose.Schema({
	message: String,
	messageDate: Date,
	updateDate: Date
});

var Message = mongoose.model("Message", MessageSchema);

module.exports = Message;