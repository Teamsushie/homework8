require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var searchItem = "";
var dataLine1;
var dataLine2;
var dataLine3;
var dataLine4;
var dataLine5;
var dataLine6;
var dataLine7;
var dataLine8;


var secondCommand = process.argv.slice(3).join(" ");
//for (i = 0; i < process.argv.length; i++) {
//    commandLine += (process.argv[i] + " ");
//}
//
//for (i = 3; i < process.argv.length; i++) {
//    commandLine += (process.argv[i] + " ");
//};

searchItem = searchItem.trim();

switch (command) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhat();
        break;
    default:
        break;        
};

function concertThis() {
	console.log('Searching Bands in Town!')
	var artist = secondCommand;
	
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response,error,body){
		let jsonData = response.data;
			// console.log(jsonData[0].venue.name);
			// for(let i = 0; i < jsonData.length; i++){
			// 	console.log(jsonData[i].venue.name)
			// 	console.log(jsonData[i].venue.city)
			// 	console.log(jsonData[i].venue.country)
			// }

			console.log(); 
			// + 'Date:' + moment(show.datetime).format('MM/DD/YYYY'));

		   if (!jsonData.length) { 
	  console.log("No results found for " + artist);
	  return;
   }

//    console.log("Upcoming concerts for " + artist + ":"+ 'Venue Name' + jsonData[0].venue.name + 'Venue City' +
//    (jsonData[0].venue.region || jsonData[0].venue.city));

   for(var i = 0; i < jsonData.length; i++) {
	   var show = jsonData[i];

	   console.log(
		show.venue.city +
		  "," +
		  (show.venue.region || show.venue.country) +
		  " at " +
		  show.venue.name +
		  " " +
		  moment(show.datetime).format("MM/DD/YYYY")
	  );
	 } 
	}
	);
};

function spotifyThis(){
	console.log("Searching Spotify");

	var searchTrack;
	if(secondCommand == undefined){
		searchTrack = "The Sign";
	}else{
		searchTrack = secondCommand;
	}
	
	spotify.search({type:'track', query:searchTrack}, function(err,data){
	    if(err){
	        console.log('Error occurred: ' + err);
	        return;
	    }else{
		
	  		console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        console.log("Song: " + data.tracks.items[0].name);
	        console.log("Album: " + data.tracks.items[0].album.name);
	        console.log("Preview Here: " + data.tracks.items[0].preview_url);
	    }
	});
};

function movieThis(){
	console.log("What are we watchin yo");

	
	var searchMovie;
	if(secondCommand === undefined){
		searchMovie = "Mr. Nobody";
	}else{
		searchMovie = secondCommand;
	};

	var url = 'http://www.omdbapi.com/?t=' + searchMovie +'&y=&plot=full&tomatoes=true&apikey=trilogy';
   	request(url, function(error, response, body){
	    if(!error && response.statusCode == 200){
            // console.log(response);
	        console.log("Title: " + JSON.parse(body)["Title"]);
	        console.log("Year: " + JSON.parse(body)["Year"]);
	        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
	        console.log("Country: " + JSON.parse(body)["Country"]);
	        console.log("Language: " + JSON.parse(body)["Language"]);
	        console.log("Plot: " + JSON.parse(body)["Plot"]);
	        console.log("Actors: " + JSON.parse(body)["Actors"]);
	        console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
	        console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
	    }
    });
};

function doWhat() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error);
        } else {
			console.log(data);

			// let dataArr = data.split(",");

			// if (dataArr.length === 2) {
			// 		secondCommand(dataArr[0], dataArr[1]);
			// 	} else if (dataArr.length === 1) {
			// 		secondCommand(dataArr[0]);

			}
        }
    
    );
}