$(document).ready(function() {

	var tmdb_apikey = "YOUR_API_KEY_HERE";

	var genre, genreText, movie;

	// Grab all the genre tag buttons
	var buttons = $(".tag-button");

	// Assign all the genre tag buttons event handlers
	buttons.click(function() {

		// Add genre to searchbox on click
		$(".searchbox").attr("value", $(this).attr("value"));

		// Grabs the buttons "name" attribute which has been given the value of its genre Id
		genre = $(this).attr("name");
		genreText = $(this).attr("value").toLowerCase();

	});

	// Returns to genre choice screen and stops playback of trailer
	$('.try-again').click(function() {

		$(".result").fadeOut('slow', function() {
			$(".content").fadeIn();
		});

		$(".movie-trailer").html("");
		$(".searchbox").attr("value", "");
		$(".overview").html("");
		genreText = undefined;
		$("body").css("background", "url('images/background.jpg')");

	});

	//  Takes in an array of movie objects as its input and returns a random selection from the array
	var pickRandomMovie = function(movielist) {

			var random = Math.floor(Math.random() * (movielist.length + 1));

			// Ensures that the movie selected is not an undefined entry in the array
			do {
				movie = movielist[random];
			} while (movie === undefined);

			return movie;

		};

	// Populates the page with the results from the random movie search
	var updatePage = function(movie) {

			var url = "http://api.themoviedb.org/3/movie/" + movie.id;

			$(".title").html(movie.title);
			$(".movie-poster").attr("src", "http://cf2.imgobject.com/t/p/original/" + movie.poster_path);
			$("body").css("background", "url('http://cf2.imgobject.com/t/p/original" + movie.backdrop_path + "')");
			$(".rt-score").html();
			$(".release-date").html("Released: " + movie.release_date + " | ");
			$(".poster-link").attr("href", "http://www.themoviedb.org/movie/" + movie.id);
			$(".genre").html(genreText);


			$.ajax({
				url: url + "?api_key=" + tmdb_apikey,
				context: document.body,
				async: false,
				dataType: 'json',
				success: function(data) {
					$(".running-time").html("Run time: " + data.runtime + " minutes");
					$(".overview").append(data.overview);
				}
			});

			getTrailer(url);

			$(".content").fadeOut(function() {
				$(".result").fadeIn();
			});


		};


	var getTrailer = function(url) {

			$.ajax({
				url: url + "/trailers?api_key=" + tmdb_apikey,
				context: document.body,
				async: false,
				dataType: 'json',
				success: function(data) {

					var src = "src='http://www.youtube.com/embed/" + data.youtube[0].source + "'";
					$(".movie-trailer").html("<iframe width='560' height='315'" + src + " frameborder='0' allowfullscreen></iframe>");
				}
			});

		};

	// Goes through a page of movie objects and appends them one by one to an array 'movielist'
	var addMoviesToList = function(url, pageNumber, dataLength, movielist) {

			$.ajax({
				url: url + "&page=" + pageNumber,
				context: document.body,
				async: false,
				dataType: 'json',
				success: function(data) {

					for (var i = 0; i < 20; i++) {
						if (data.results[i] !== undefined) {
							movielist.push(data.results[i]);
						}

					}
					return movielist;
				}
			});
		};

	// Connects to themoviedb.org's database and stores all the movies in the selected genre in an array
	$(".searchbutton").click(function() {

		// If the user has selected a genre
		if (genreText !== undefined) {

			var nbrOfPages;
			var movielist = [];
			var url = "http://api.themoviedb.org/3/genre/" + genre + "/movies?api_key=" + tmdb_apikey;
			var dataLength;

			// Run an initial ajax request to get the number of pages and the length of the results
			$.ajax({
				url: url,
				context: document.body,
				async: false,
				dataType: 'json',
				success: function(data) {

					dataLength = data.results.length;
					nbrOfPages = data.total_pages;
				}

			});

			// Iterate over each page and add the results
			for (var i = 1; i <= nbrOfPages; i++) {
				addMoviesToList(url, i, dataLength, movielist);
			}

			movie = pickRandomMovie(movielist);
			updatePage(movie);

		} else {

			$(".error").fadeIn(1500, function() {
				$(".error").delay(1200).fadeOut();

			});
		}

	});

});
