$(document).ready(function() {

	var tmdb_apikey = "78ce6d1fe61708beb0815b4772f4be3e";
	
	var randomGenres = [28,12,16,35,80,99,18,10751,14,10769,36,27,10756,10402,9648,10749,878,53,10752,37];

	var genre, genreText, movie;

	// Grab all the genre tag buttons
	var buttons = $(".tag-button");

	// Assign all the genre tag buttons event handlers
	buttons.click(function() {


		// Grabs the buttons "name" attribute which has been given the value of its genre Id
		
		console.log($(this).attr("name"));
		
		if ($(this).attr("name") != "random") {
			genre = $(this).attr("name");
		} else {
			genre = randomGenres[Math.floor(Math.random() * randomGenres.length)];
					console.log(genre);
		}
	
		genreText = $(this).attr("value").toLowerCase();
		
		getResults();

	});

	// Returns to genre choice screen and stops playback of trailer
	$('.try-again').click(function() {

		$(".result").fadeOut('slow', function() {
			$(".tags").fadeIn();
		});

		$(".movie-trailer").html("");
		$(".searchbox").attr("value", "");
		$(".overview").html("");
		$(".headline").html("Find Me a Movie");
		genreText = undefined;
		//$("body").css("background", "url('images/background.jpg')");
	//	$("body").css("background", "url('images/billie_holiday.png')");

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

		//	$(".title").html(movie.title);
		
		$(".headline").html(movie.title);
			
			
			$(".movie-poster").attr("src", "http://cf2.imgobject.com/t/p/original/" + movie.poster_path);
		//	$("body").css("background", "url('http://cf2.imgobject.com/t/p/original" + movie.backdrop_path + "')");
			$(".rt-score").html();
			$(".release-date").html("Released: " + movie.release_date + " <span class='red'>-</span> ");
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

			$(".tags").fadeOut(function() {
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

	var getResults = function() {

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
	

});
