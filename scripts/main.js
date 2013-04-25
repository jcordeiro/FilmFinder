$(document).ready(function() {

<<<<<<< HEAD
	var tmdb_apikey = "78ce6d1fe61708beb0815b4772f4be3e";
	
	var randomGenres = [28,12,16,35,80,99,18,10751,14,10769,36,27,10756,10402,9648,10749,878,53,10752,37];
=======
	var tmdb_apikey = "YOUR_API_KEY_HERE";
>>>>>>> 48219964ea6ec676768a43fd488f17cd56681585

	var genre, genreText, movie;

	// Grab all the genre tag buttons
	var buttons = $(".tag-button");

	// Assign all the genre tag buttons event handlers
	buttons.click(function() {

		// Add genre to searchbox on click
<<<<<<< HEAD
	//	$(".searchbox").attr("value", $(this).attr("value"));

		// Grabs the buttons "name" attribute which has been given the value of its genre Id
		
		console.log($(this).attr("name"));
		
		if ($(this).attr("name") != "random") {
			genre = $(this).attr("name");
		} else {
			genre = randomGenres[Math.floor(Math.random() * randomGenres.length)];
					console.log(genre);
		}
		
	//	if ($(this).attr("name") === "random") {
			
	//		var genre = randomGenres[Math.floor(Math.random() * randomGenres.length)];
	//	} else {
		//	genre = $(this).attr("name");
	//	}
		
	
		genreText = $(this).attr("value").toLowerCase();
		
		a();
=======
		$(".searchbox").attr("value", $(this).attr("value"));

		// Grabs the buttons "name" attribute which has been given the value of its genre Id
		genre = $(this).attr("name");
		genreText = $(this).attr("value").toLowerCase();
>>>>>>> 48219964ea6ec676768a43fd488f17cd56681585

	});

	// Returns to genre choice screen and stops playback of trailer
	$('.try-again').click(function() {

		$(".result").fadeOut('slow', function() {
<<<<<<< HEAD
			$(".tags").fadeIn();
=======
			$(".content").fadeIn();
>>>>>>> 48219964ea6ec676768a43fd488f17cd56681585
		});

		$(".movie-trailer").html("");
		$(".searchbox").attr("value", "");
		$(".overview").html("");
<<<<<<< HEAD
		$(".headline").html("Find Me a Movie");
		genreText = undefined;
		//$("body").css("background", "url('images/background.jpg')");
	//	$("body").css("background", "url('images/billie_holiday.png')");
=======
		genreText = undefined;
		$("body").css("background", "url('images/background.jpg')");
>>>>>>> 48219964ea6ec676768a43fd488f17cd56681585

	});

	//  Takes in an array of movie objects as its input and returns a random selection from the array
	var pickRandomMovie = function(movielist) {

			var random = Math.floor(Math.random() * (movielist.length + 1));

			// Ensures that the movie selected is not an undefined entry in the array
			do {
				movie = movielist[random];
			} while (movie === undefined);

			return movie;

<<<<<<< HEAD
	};
=======
		};
>>>>>>> 48219964ea6ec676768a43fd488f17cd56681585

	// Populates the page with the results from the random movie search
	var updatePage = function(movie) {

			var url = "http://api.themoviedb.org/3/movie/" + movie.id;

<<<<<<< HEAD
		//	$(".title").html(movie.title);
		
		$(".headline").html(movie.title);
			
			
			$(".movie-poster").attr("src", "http://cf2.imgobject.com/t/p/original/" + movie.poster_path);
		//	$("body").css("background", "url('http://cf2.imgobject.com/t/p/original" + movie.backdrop_path + "')");
			$(".rt-score").html();
			$(".release-date").html("Released: " + movie.release_date + " <span class='red'>-</span> ");
=======
			$(".title").html(movie.title);
			$(".movie-poster").attr("src", "http://cf2.imgobject.com/t/p/original/" + movie.poster_path);
			$("body").css("background", "url('http://cf2.imgobject.com/t/p/original" + movie.backdrop_path + "')");
			$(".rt-score").html();
			$(".release-date").html("Released: " + movie.release_date + " | ");
>>>>>>> 48219964ea6ec676768a43fd488f17cd56681585
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

<<<<<<< HEAD
			$(".tags").fadeOut(function() {
				$(".result").fadeIn();
			});

	};
=======
			$(".content").fadeOut(function() {
				$(".result").fadeIn();
			});


		};
>>>>>>> 48219964ea6ec676768a43fd488f17cd56681585


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

<<<<<<< HEAD
	};
=======
		};
>>>>>>> 48219964ea6ec676768a43fd488f17cd56681585

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
<<<<<<< HEAD
/*	$(".searchbutton").click(function() {
=======
	$(".searchbutton").click(function() {
>>>>>>> 48219964ea6ec676768a43fd488f17cd56681585

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

<<<<<<< HEAD
	});*/
	
	var a = function() {

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

	};
	
=======
	});
>>>>>>> 48219964ea6ec676768a43fd488f17cd56681585

});
