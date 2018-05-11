// Starting the JQuery script as soon as the DOM is loaded
$(document).ready(function() {
	
	// Adding animations to the input bar:
	$("#input").on("click", function() {
		$("#input").animate({
			width: ["40rem", "swing"],
			height: ["50px", "swing"]
		}).css("font-size","2rem").attr("placeholder", "");
		$("#input").focusout(function() {
			$("#input").animate({
				width: ["30%", "swing"],
				height: ["25px", "swing"]
			}).css("font-size","1rem").attr("placeholder", "Enter Your Query");
		});
	});
	
	// Creating a function for handeling every search query:
	function handleQuery() {
		
		// Storing the input value in a variable:
		var searchWord = $("#input").val();

		// Storing the api's url in a variable:
		var api = " https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchWord + "&format=json&callback=?";

		// Reseting the search input after every new search:
		$("#search-content").html("");

		// Getting the api's data:
		$.getJSON(api, function(data) {

			// Printing api's the search results on the screen:
			$("#search-content").html(function() {
				for(var i = 0; i < data[1].length; i++) {
					$("#search-content").append("<div id='result'><h3>" + data[1][i] + "</h3><p>" + data[2][i] + "</p><a href=" + data[3][i] + " target='_blank'> Read More...</a></div>");
				}
			});
		});

		// Reseting the input's value after submitting any search query:
		$("#input").val("");
	}

	// Creating a click handler for the search button and calling the above function inside of it:
	$("#search-btn").on("click", function() {
		handleQuery();
	});

	// Creating a keypress handler (for Enter key) and calling the function declared above inside of it:
	$("#input").keypress(function(event) {
		if (event.which === 13) {
			handleQuery();
		}
	});
});