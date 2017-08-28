var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('spotify');
var omdb = require('omdb');
var request = require('request');
var input1 = process.argv[2];
var input2 = process.argv.splice(3).join(" ");

//"my-tweets"--This will show your last 20 tweets and when they were created at in your terminal/bash window.
	var keys = require('./keys.js');

	var client = new Twitter(keys.twitterKeys);

	var params = {screen_name: 'csloan95'
		//count:20
	};

	run();

	function run() {
	

			if (input1 === "my-tweets") {
				client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  		if (!error) {
		    		console.log("My last 20 tweets: ");
		  		} else {
		  			console.log(error);
		  		};
			});
			

//"spotify-this-song"--This will show the following information about the song in your terminal/bash window (Artist(s),The song's name & A preview link of the song from Spotify,The album that the song is from)
	//If no song is provided then your program will default to "The Sign" by Ace of Base.				
					
			}else if (input1 === "spotify-this-song") {

	       	 	if (input2.length < 1) {

	            input2 = "The Sign Ace of Base";
	       	};

	       	var spotify = new Spotify({
			  id: "8ad5002b0c13446daee9fb2829ed80f3",
			  secret: "38fbc7aa0f0b4500a8a66bbcfada9a2b"
			});
			
			spotify.search({ type: 'track', query: input2 }, function(err, data) {
            	if (err) {
                	console.log('Error occurred: ' + err);
                	return;
            }
            console.log("Spotify Song Information Results: ");
            console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
            console.log("Track Title: " + data.tracks.items[0].name);
            console.log("Link to Song: " + data.tracks.items[0].preview_url);
            console.log("Album Title: " + data.tracks.items[0].album.name);
        });
					
					
//"movie-this"--This will output the following information to your terminal/bash window:
//Title of the movie, Year the movie came out, IMDB Rating of the movie, Rotten Tomatoes Rating of the movie, Country where the movie was produced, Language of the movie, Plot of the movie, Actors in the movie.
	//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
		}else if (input1 === "movie-this") {
				if (input2.length < 1) {

	            input2 = "Mr. Nobody";
	        };

	        // Then run a request to the OMDB API with the movie specified
	        request("http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&r=json&tomatoes=true", function(error, response, body) {

	        	// If the request is successful (i.e. if the response status code is 200)
	        	if (!error && response.statusCode === 200) {
	        		console.log('OMDB Movie Information: ');
	        		console.log("Movie Title: " + JSON.parse(body).Title);
	                console.log("Year of Release: " + JSON.parse(body).Year);
	                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	                console.log("Countries produced in: " + JSON.parse(body).Country);
	                console.log("Language: " + JSON.parse(body).Language);
	                console.log("Movie Plot: " + JSON.parse(body).Plot);
	                console.log("Actor(s): " + JSON.parse(body).Actors);
	                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	                console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
	                } else {

                console.log(error);

            }

        });

			


//"do-what-it-says"--Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
			
		} else if (input1 === "do-what-it-says") {


        fs.readFile('random.txt', 'utf8', function(err, data) {
            if (err) throw err;

            var arr = data.split(',');

            input1 = arr[0].trim();
            input2 = arr[1].trim();
            run();

        });

    }
};

	






