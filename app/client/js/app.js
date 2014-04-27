var main = function () {
	"use strict";

	$(".mainMessageContent").hide();

	$(".displayHome").on("click", function () {
		$(".mainInputContent").show();
		$(".mainMessageContent").hide();
		$(".mainHelpContent").hide();
	});


	$(".displayMessages").on("click", function () {
		displayMessageList();
	});


	$(".displayHelp").on("click", function () {
		console.log("help clicked");
		displayHelp();
	}); 


	$(".inputClass").on("keypress", function (event) {
		if (event.keyCode === 13) {
			addMessageFromInputBox();
		}
	});
	
	var $button = $("button");
	$button.on("click", function () {
		addMessageFromInputBox();
	});
};

function displayHelp() {

}


function addMessageFromInputBox() {
	var messageText = $("#messageText").val();
	var newMessage = {"message": messageText};
	
	$.post("/sendMessage", newMessage, function (result) {
		console.log("newMessage: " + newMessage.message);

		var messageArray = [];

		messageArray.push(newMessage);

		// clear out form
 		$("input").val("");
		$("tagInput").val("");
		//var elem = document.getElementById(".displayMessages");
		document.getElementsByClassName("displayMessages")[0].style.backgroundImage = 'url(../images/envelope-full.jpg)'; 
	});
}

function deleteMessage(message) {
	var deleteConfirmed = confirm("Are you sure want to delete this message?");
	if (deleteConfirmed) {
		var deleteMessage = {"messageDate": message};
		$.post("/deleteMessage", deleteMessage, function (result) {
				displayMessageList();
		});
	}
	$(".mainInputContent").hide();
	$(".mainMessageContent").show();
	event.preventDefault();
}

function displayMessageList() {
	$(".mainInputContent").hide();
	$(".mainMessageContent").show();
	$(".mainMessageContent").empty();

	$(".mainMessageContent").append("<p>Messages: (click to delete)");
	$(".mainMessageContent").append("--------------------------------------------------------------------------------------- ");


	$(".mainMessageContent").append("<table>");

	$.getJSON("messages.json", function (messageObject) {
		messageObject.forEach( function (message) {
			if (message.message === undefined) {message.message = '';}
			if (message.messageDate === undefined) {message.messageDate = '';}

			jQuery.timeago(new Date());             //=> "less than a minute ago"
			var timeAgo = jQuery.timeago(message.messageDate);
			//console.log("timeAgo: " + timeAgo);
			$(".mainMessageContent").append("<tr onclick=deleteMessage('"+message.messageDate+"')><td>" + message.message + "<td>" + timeAgo + "<td class='deleteMessageClass'>");
		});
	});

	document.getElementsByClassName("displayMessages")[0].style.backgroundImage = 'url(../images/envelope.jpg)';
}

$(document).ready(main);