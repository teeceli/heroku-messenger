var main = function () {
	"use strict";

	$(".mainMessageContent").hide();

	$(".displayHome").on("click", function () {
		$(".mainInputContent").show();
		$(".mainMessageContent").hide();

		console.log("home clicked");
	});




	$(".displayMessages").on("click", function () {
		$(".mainInputContent").hide();
		$(".mainMessageContent").show();
		$(".mainMessageContent").empty();

		$(".mainMessageContent").append("<p>What others are saying...");

		$(".mainMessageContent").append("<table>");

		$.getJSON("messages.json", function (messageObject) {
			messageObject.forEach( function (message) {
				if (message.message === undefined) {message.message = '';}
				if (message.messageDate === undefined) {message.messageDate = '';}
				$(".mainMessageContent").append("<tr><td>" + message.message + "<td>" + message.messageDate + "<td class='deleteMessage'><a href='' id='deleteMessage2' onclick=deleteMessage('"+message._id+"')>+</a>");
				//$(".mainMessageContent tr td").append(message.message);
				//$(".mainMessageContent").append("<td>");
				//$(".mainMessageContent").append("<td>" + message.messageDate);

				console.log("message: " + message.message);
			});
		});


		console.log("messages clicked");
	});


	//$("a #deleteMessage2").on("click", function () {
	$("a#deleteMessage2").click(function() {

		console.log("here");
		event.preventDefault();
		var id = $(".deleteMessage2").val();
		console.log("id: " + id);
		return false;
	});

	$(".displayHelp").on("click", function () {
		console.log("help clicked");
	});

	var $button = $("button");
	$button.on("click", function () {
		//var $tagInput = $(".tagButton");
		var messageText = $("#messageText").val();
				//console.log("messageText: " + messageText);


		// create new ToDo item
		var newMessage = {"message": messageText};
		
		$.post("/sendMessage", newMessage, function (result) {
			console.log("newMessage: " + newMessage.message);

			var messageArray = [];

			messageArray.push(newMessage);
			
			// update toDos
			//toDos = toDoObjects.map(function (toDo) {
			//	return toDo.description;
			//});

			// clear out form
			$("input").val("");
			$("tagInput").val("");
		});

	});
};

function deleteMessage(message) {
		confirm("delete: " + message);
		$(".mainInputContent").hide();
		$(".mainMessageContent").show();
		event.preventDefault();
	}

$(document).ready(main);
//$(document).ready(function () {
//jj
//})

