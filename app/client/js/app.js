var main = function () {
	"use strict";

	$(".mainMessageContent").hide();
	$(".mainHelpContent").hide();

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
	$(".mainHelpContent").empty();
	$(".mainHelpContent").show();
	$(".mainInputContent").hide();
	$(".mainMessageContent").hide();

	$(".imageBar").append("<h1>Help");
	var imageBar = $(".imageBar");

	$(".mainHelpContent").append("<div class='imageBar'>");
	$(".mainHelpContent").append("<span class='nodeJSImage'>");
	$(".mainHelpContent").append("<span class='herokuImage'>");
	$(".mainHelpContent").append("<span class='mongoImage'>");

	$(".mainHelpContent").append("<span class='mongoHQImage'>");
	$(".mainHelpContent").append("<span class='gitImage'>");


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
	$(".mainHelpContent").hide();
	event.preventDefault();
}

function displayMessageList() {
	$(".mainInputContent").hide();
	$(".mainMessageContent").show();
	$(".mainMessageContent").empty();
	$(".mainHelpContent").hide();

	$(".mainMessageContent").append("<div class='topMarginPlaceHolder'><span>Messages: <span class='clickMessage'>click to delete");
	$(".mainMessageContent").append("<p>--------------------------------------------------------------------------------------- ");


	$(".mainMessageContent").append("<table class='paginated-table' id='messageTable'>");
	$(".mainMessageContent table").append("<tbody>");

	$.getJSON("messages.json", function (messageObject) {
		messageObject.forEach( function (message) {
			if (message.message === undefined) {message.message = '';}
			if (message.messageDate === undefined) {message.messageDate = '';}

			jQuery.timeago(new Date());             //=> "less than a minute ago"
			var timeAgo = jQuery.timeago(message.messageDate);
			//console.log("table: " + document.getElementById("messageTable").find('tbody'));
			//document.getElementById("messageTable").append("<tr onclick=deleteMessage('"+message.messageDate+"')><td>" + message.message + "<td>" + timeAgo + "<td class='deleteMessageClass'>");
			$(".mainMessageContent table tbody").append("<tr onclick=deleteMessage('"+message.messageDate+"')><td>" + message.message + "<td>" + timeAgo);

		});
		    fixTable();

	});
       $(".mainMessageContent").append("<span class='prev'>Previous</span><span class='next'>Next</span>");


	document.getElementsByClassName("displayMessages")[0].style.backgroundImage = 'url(../images/envelope.jpg)';
}


function fixTable() {

 	var maxRows = 5;
	$('.mainMessageContent table').each(function() {
	    var cTable = $(this);
	    var cRows = $('.mainMessageContent table tbody').find("tr");
	    var cRowCount = cRows.size();
	    
	    if (cRowCount < maxRows) {
	        return;
	    }

	    cRows.each(function(i) {
	        $(this).find('td:first').text(function(j, val) {
	           return (i + 1) + " - " + val;
	        }); 
	    });

	    cRows.filter(':gt(' + (maxRows - 1) + ')').hide();


	    var cPrev = cTable.siblings('.prev');
	    var cNext = cTable.siblings('.next');

	    cPrev.addClass('disabled');

	    cPrev.click(function() {
	        var cFirstVisible = cRows.index(cRows.filter(':visible'));
	        
	        if (cPrev.hasClass('disabled')) {
	            return false;
	        }
	        
	        cRows.hide();
	        if (cFirstVisible - maxRows - 1 > 0) {
	            cRows.filter(':lt(' + cFirstVisible + '):gt(' + (cFirstVisible - maxRows - 1) + ')').show();
	        } else {
	            cRows.filter(':lt(' + cFirstVisible + ')').show();
	        }

	        if (cFirstVisible - maxRows <= 0) {
	            cPrev.addClass('disabled');
	        }
	        
	        cNext.removeClass('disabled');

	        return false;
	    });

	    cNext.click(function() {
	        var cFirstVisible = cRows.index(cRows.filter(':visible'));
	        
	        if (cNext.hasClass('disabled')) {
	            return false;
	        }
	        
	        cRows.hide();
	        cRows.filter(':lt(' + (cFirstVisible +2 * maxRows) + '):gt(' + (cFirstVisible + maxRows - 1) + ')').show();

	        if (cFirstVisible + 2 * maxRows >= cRows.size()) {
	            cNext.addClass('disabled');
	        }
	        
	        cPrev.removeClass('disabled');

	        return false;
	    });

	});

}

$(document).ready(main);



