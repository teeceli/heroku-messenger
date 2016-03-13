var main = function () {
	"use strict";

	$(".mainMessageContent").hide();
	$(".mainPhotoContent").hide();
	$(".mainHelpContent").hide();
	$("footer").children("span").remove();

	$(".displayHome").on("click", function () {
		$(".mainContent").show();
		$(".mainMessageContent").hide();
		$(".mainPhotoContent").hide();
		$(".mainHelpContent").hide();
		$("footer").children("span").remove();

	});

	$(".displayMessages").on("click", function () {
		displayMessageList();
	});

	$(".displayPhotos").on("click", function () {
		displayPhotos();
	});

	$(".displayHelp").on("click", function () {
		displayHelp();
	});

	
};

function displayPhotos() {
	$(".mainContent").hide();
	$(".mainMessageContent").hide();
	$(".mainPhotoContent").show();
	$(".mainPhotoContent").empty();
	$(".mainHelpContent").hide();

	$(".mainPhotoContent").append("<div id='page-header'>Trip to Ensenada and Valle de Guadalupe - March 2016</div>")
	$(".mainPhotoContent").append("<div id='photos'><img src='../images/ensenada/bufadora.jpg' alt='La Bufadora' width='1024' height='768'></div>");
	$(".mainPhotoContent").append("<div id='photos'><img src='../images/ensenada/bufadora2.jpg' alt='La Bufadora' width='1024' height='768'></div>");
	$(".mainPhotoContent").append("<div id='photos'><img src='../images/ensenada/corazon_de_la_tierra.jpg' alt='Corazon De La Tierra' width='1024' height='768'></div>");
	$(".mainPhotoContent").append("<div id='photos'><img src='../images/ensenada/corazon.jpg' alt='Corazon De La Tierra' width='1024' height='768'></div>");
	$(".mainPhotoContent").append("<div id='photos'><img src='../images/ensenada/corazon2.jpg' alt='Corazon De La Tierra' width='1024' height='768'></div>");
	$(".mainPhotoContent").append("<div id='photos'><img src='../images/ensenada/flowers.jpg' alt='Flowers' width='1024' height='768'></div>");
	$(".mainPhotoContent").append("<div id='photos'><img src='../images/ensenada/fountain.jpg' alt='Fountain' width='1024' height='768'></div>");
	$(".mainPhotoContent").append("<div id='photos'><img src='../images/ensenada/hacienda_guadalupe.jpg' alt='Hacienda Guadalupe' width='1024' height='768'></div>");
	$(".mainPhotoContent").append("<div id='photos'><img src='../images/ensenada/museum.jpg' alt='Museum' width='1024' height='768'></div>");
	$(".mainPhotoContent").append("<div id='photos'><img src='../images/ensenada/vineyard.jpg' alt='Vineyard' width='1024' height='768'></div>");
	$(".mainPhotoContent").append("<div id='photos'><img src='../images/ensenada/leah_goat.jpg' alt='Leah with a goat' width='1024' height='768'></div>");

}

function displayMessageList() {
	$("footer").children("span").remove();

	var cRows;
	var cRowCount = 0;
	$(".mainContent").hide();
	$(".mainMessageContent").show();
	$(".mainMessageContent").empty();
	$(".mainPhotoContent").hide();
	$(".mainHelpContent").hide();

	$(".mainMessageContent").append("<div class='topMarginPlaceHolder'><span>Messages: <span class='clickMessage'>click to delete")
							.append("<p>--------------------------------------------------------------------------------------- ")
							.append("<table class='paginated-table' id='messageTable'>");

	$(".mainMessageContent table").append("<tbody>");
	$.ajaxSetup({ cache: false });
	$.getJSON("messages.json", function (messageObject) {
		messageObject.forEach( function (message) {
			if (message.message === undefined) {message.message = '';}
			if (message.messageDate === undefined) {message.messageDate = '';}

			jQuery.timeago(new Date());             //=> "less than a minute ago"
			var timeAgo = jQuery.timeago(message.messageDate);

			$(".mainMessageContent table tbody").append("<tr onclick=deleteMessage('"+message.messageDate+"')><td>" + message.message + "<td>" + timeAgo);
			cRows = $('.mainMessageContent table tbody').find("tr");
		    cRowCount = cRows.size();
		});

  		$(".mainMessageContent").append("<span class='prev'></span><span class='next'></span>");

	   	if (cRowCount < 8) {
	    	$(".mainMessageContent").children("span").remove();

		}
	    fixTable();

		
	});

	$(".displayMessages").hover(function () {
		$(this).css({backgroundImage: 'url(../images/envelope-hover.jpg)'})
	}, function(){
		$(this).css({backgroundImage: 'url(../images/envelope.jpg)'})
	});

	var message = $("#messageText").val();
	 $('.mainMessageContent').on('click', 'button', function() {
	 	if (typeof message !== 'undefined') {
			addMessageFromInputBox();
		} else {
			alert('Please enter a message');
		}
 	 });

	$(".mainMessageContent").on("keypress", '.inputClass', function (event) {
		if (event.keyCode === 13) {
			if (typeof message !== 'undefined') {
				addMessageFromInputBox();
			} else {
				alert('Please enter a message');
			}
		}
	});
}

function displayHelp() {
	$(".mainContent").hide();
	$(".mainMessageContent").hide();
	$(".mainPhotoContent").hide();
	$(".mainHelpContent").show();
	$(".mainHelpContent").empty();

	$(".mainHelpContent").append("<div id='page-header'>About Me</div>")
						//.append("<div id='about-text'><p>Just my personal node/js page backed by a nosql db for testing webdev concepts and a place to put my photos</p></div>")
						.append("<div id='about-text'><br /><p>Timur Celikel<br />tcelikel@gmail.com<br /><br /></p></div>")
						.append("<p><div id='about-text'><a href='https://www.linkedin.com/pub/timur-celikel/48/675/576'><img src='../images/linked_in.png' alt='LinkedIn' width='55' height='50'/></a>"
						+ "<a href='https://twitter.com/teeceli'><img src='../images/twitter.png' alt='Twitter' width='55' height='50'/></a>"
						+ "<a href='https://github.com/teeceli/heroku-messenger'><img src='../images/github.jpg' alt='Git Repository' width='55' height='50'/></a></p></div>");

	//$(".mainHelpContent").append("<p>--------------------------------------------------------------------------------------- ")					
	$(".mainHelpContent").append("<div class='message'><span>Leave Me A Message");
	$(".mainHelpContent").append("<input id='messageText' type='text' class='inputClass'><button>Submit</button><span></div>");

	$(".inputClass").on("keypress", function (event) {
		if (event.keyCode === 13) {
			addMessageFromInputBox();
		}
	});
	
	var $button = $("button");
	$button.on("click", function () {
		addMessageFromInputBox();
	});

}

function addMessageFromInputBox() {
	var messageText = $("#messageText").val();
	var newMessage = {"message": messageText};

	if (typeof messageText !== 'undefined') {
		$.post("/sendMessage", newMessage, function (result) {
			console.log("newMessage: " + newMessage.message);

			// clear out form
	 		$("input").val("");
			$("tagInput").val("");

			document.getElementsByClassName("displayMessages")[0].style.backgroundImage = 'url(../images/envelope-full.jpg)'; 

		});
	}
}

function deleteMessage(message) {
	var deleteConfirmed = confirm("Are you sure want to delete this message?");
	if (deleteConfirmed) {
		var deleteDate = new Date();
		var deleteMessage = {"messageDate": message, "deleteDate": deleteDate};
		$.post("/deleteMessage", deleteMessage, function (result) {
				displayMessageList();
		});
	}
	$(".mainContent").hide();
	$(".mainMessageContent").show();
	$(".mainPhotoContent").hide();

	event.preventDefault();
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
