//used for Bonus
var fs = require("fs");

//used for twitter
var twit = require('twitter');

//used for spotify
var Spotify = require('node-spotify-api');

//objects stored in keys.js i.e twitter 
var twitterKeys = require("./keys.js").twitterKeys;

//objects stored in keys.ks i.e spotify
var spotiftyKeys = require("./keys.js").spotifyKeys;

var command = process.argv[2];

//used to grab twitter API
var client = new twit(twitterKeys);


//switch function that is equivalent to an if-else statement 
switch (command) {
    case "my-tweets":
        twitter();
        break;

    case "spotify-this-song":
        spotify();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        simonSays();
        break;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////----------TWITTER REQUEST-------------/////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function twitter() {
    var params = {
        q: 'from:GriarteKurt',
        limit: 20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            return console.log(error);
        } else {
            for (var i = 0; i < tweets.length; i++) {
                console.log('----------------------------------------------------------------------');
                console.log(tweets[i].text);
                console.log('----------------------------------------------------------------------');
                console.log("\n")

            }
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////----------SPOTIFY REQUEST-------------/////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function spotify() {

    var spotify = new Spotify(spotiftyKeys);

    var spotifySong = process.argv[3];

    spotify.search({
        type: 'track',
        query: spotifySong,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {

            var artistNames = function (artist) {
                return artist.name;
            }

            var tracks = data.tracks.items;

            for (var i = 0; i < tracks.length; i++) {

                console.log("\n")
                console.log('----------------------------------------------------------------------');
                console.log('Artist(s): ' + tracks[i].artists.map(artistNames));
                console.log('Song name: ' + tracks[i].name);
                console.log('Preview song: ' + tracks[i].preview_url);
                console.log('Album: ' + tracks[i].album.name);
                console.log('----------------------------------------------------------------------');
                console.log("\n")

            }
        }
    });

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////----------OMDB REQUEST-------------/////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function movie() {

    //used for OMDB
    var request = require('request');

    //empty movie variable
    var movieArray = "";

    var movie = process.argv[3];

    //for loop that adds two strings together to create one string
    for (var i = 3; i < movieArray.length; i++) {
        if (i > 3 && i < movieArray.length) {
            movieArray = movieArray + "+" + movie[i];
        } else {
            movieArray += movie[i];
        }
    }

    var queryUrl = "http://www.omdbapi.com?t=" + movie + "&y=&plot=short&r=json&apikey=40e9cece";

    request(queryUrl, function (err, res, body) {

        // If the request was successful...
        if (err) {
            return console.log(err);
        }

        if (res.statusCode === 200) {

            // Then log the body from the site!
            console.log("\n")
            console.log('----------------------------------------------------------------------');
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("The IMDB rating is: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes rating is: " + JSON.parse(body).tomatoRating);
            console.log("Country where the movie is produced: " + JSON.parse(body).Country);
            console.log("Language of the movie: " + JSON.parse(body).Language);
            console.log("Plot of the movie: " + JSON.parse(body).Plot);
            console.log("Actors in the movie: " + JSON.parse(body).Actors);
            console.log('----------------------------------------------------------------------');
            console.log("\n")

        }
    });

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////----------DO WHAT IT SAYS REQUEST-------------////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function simonSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        command2 = dataArr[1];
        //Switch command data
        switch (dataArr[0]) {
            case "my-tweets":
                tweets();
                break;
            case "spotify-this-song":
                spotify();
                break;
            case "movie-this":
                movie();
                break;
        }
    })
};
