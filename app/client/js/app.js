var main = function () {
	"use strict";

	$(".mainMessageContent").hide();
	$(".mainHelpContent").hide();
			$("footer").children("span").remove();



	$(".displayHome").on("click", function () {
		$(".mainInputContent").show();
		$(".mainMessageContent").hide();
		$(".mainHelpContent").hide();
		$("footer").children("span").remove();

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
	$("footer").children("span").remove();

	$(".imageBar").append("<h1>Help");
	var imageBar = $(".imageBar");

	$(".mainHelpContent").append("<div class='imageBar'>");
	$("footer").append("<span class='nodeJSImage'>");
	$("footer").append("<span class='herokuImage'>");
	$("footer").append("<span class='arduinoImage'>");
	$("footer").append("<span class='mongoImage'>");
	$("footer").append("<span class='gitImage'>");

	$("footer").append("<span class='mongoHQImage'>");
	$(".mainHelpContent").append("<h1>What is this?");
	$(".mainHelpContent").append("<p>Not much at the moment. Eventually this page will host my first Arduino Microcontrollers project that will be able to tell me in real-time the temperature and humidity of my pet turtle's terrarium. The wireless Arduino unit will be able to connect to my local WiFi and send a POST request to a web service hosted on this page. The information broadcasted from the terrarium will display in a new link on this page. For now, you can leave me messages to help me test and build out the rest of the application framework!");

	$(".mainHelpContent").append("<p>This page was built using Node.js for MVC development all contained in Javascript. I used a NoSQL database called MongoDb with the data hosted for free by MongoHQ. The application itself is hosted for free using Heroku. The code is all stored in GitHub under the public domain. For more information on these web technologies please click the links below.")
	$(".mainHelpContent").append("<p>For more information on building web applications check out Semmy Purewal's book <a href='http://shop.oreilly.com/product/0636920030621.do'>Learning Web Application Development</a>")

	$('.nodeJSImage').click(function(){
   		window.location.href='http://www.nodejs.org';
	})
	$('.herokuImage').click(function(){
   		window.location.href='http://www.heroku.com';
	})
	$('.arduinoImage').click(function(){
   		window.location.href='http://www.arduino.cc';
	})
	$('.mongoImage').click(function(){
   		window.location.href='http://www.mongodb.org';
	})
	$('.gitImage').click(function(){
   		window.location.href='https://github.com/teeceli';
	})
	$('.mongoHQImage').click(function(){
   		window.location.href='http://www.mongohq.com';
	})

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
	$("footer").children("span").remove();

	var cRows;
	var cRowCount = 0;
	$(".mainInputContent").hide();
	$(".mainMessageContent").show();
	$(".mainMessageContent").empty();
	$(".mainHelpContent").hide();

	$(".mainMessageContent").append("<div class='topMarginPlaceHolder'><span>Messages: <span class='clickMessage'>click to delete");
	$(".mainMessageContent").append("<p>--------------------------------------------------------------------------------------- ");

	//$(".mainMessageContent").append("<div class='tableDiv'>");
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
			 cRows = $('.mainMessageContent table tbody').find("tr");
		    cRowCount = cRows.size();
		 

		});
  		$(".mainMessageContent").append("<span class='prev'></span><span class='next'></span>");
		    		    console.log("cRowCount " + cRowCount);

		   	if (cRowCount < 8) {
		    	$(".mainMessageContent").children("span").remove();

			}
		    fixTable();
		    //$(".footerClass").append("<span class='prev'>Previous</span><span class='next'>Next</span>");


	});
	//$(".mainMessageContent table tbody").append("<div class='prevDiv'>");

		    //$(".mainMessageContent").append("<div class='spacer'></div><span class='prev'><img src='../images/left-arrow.jpg' width='20' height='30' \></span><span class='next'><img src='../images/right-arrow.jpg' width='20' height='30' \></span>");
		    //var cRows = $('.mainMessageContent table tbody').find("tr");
		    //var cRowCount = cRows.size();
	    	
	document.getElementsByClassName("displayMessages")[0].style.backgroundImage = 'url(../images/envelope.jpg)';
}


function fixTable() {

 	var maxRows = 7;
	$('.mainMessageContent table').each(function() {
	    var cTable = $(this);
	    var cRows = $('.mainMessageContent table tbody').find("tr");
	    var cRowCount = cRows.size();
	    
	    if (cRowCount < maxRows) {
	        return;
	    }

	    cRows.each(function(i) {
	        $(this).find('td:first').text(function(j, val) {
	           return val;
	           //return (i + 1) + " - " + val;
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



