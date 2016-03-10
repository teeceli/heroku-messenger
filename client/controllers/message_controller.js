var Message = require("../models/message.js");
var MessageController = {};

MessageController.list = function (req, res) {
	// res.json returns the entire object as a JSON file
	Message.find({ $query: { updateDate: { $exists: false }}, $orderby: { messageDate : -1 }}, function (err, messages) {
		// check for errors
		res.json(messages);
	});
};

MessageController.create = function (req, res) {
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
};

MessageController.remove = function (req, res) {
var dateToDelete = req.body.messageDate;
		var updateDate = req.body.deleteDate;
		// our client expects *all* of the todo items to be returned,
		// so we do an additional request to maintain compatibility
		Message.update({"messageDate": dateToDelete}, { $set: {"updateDate": updateDate}}, function (err, result) {
		//Message.update({"messageDate": dateToDelete}, { "updateDate": updateDate }, function (err, result) {
			if (err !== null) {
				// the element did not get saved!
				res.send("ERROR");
			}
			res.json(result);
		});
};

module.exports = MessageController;