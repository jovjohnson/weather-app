$(document).ready(init);

var cities;

function init () {

	loadFromLocalStorage();

	$("#submit").click(clickTemp);

}

function loadFromLocalStorage() {

	if(localStorage.cities === undefined) {
		localStorage.cities = '[]';
	}

	cities = JSON.parse(localStorage.cities);
}

function clickTemp() {

	var city = $('#city').val();

	localStorage.cities = JSON.stringify(cities);
	
	cities.push(city);

	getWeather();

	getForecast();

	$('#city').val('');

}

function getWeather() {

	var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
	var city = $('#city').val();
	var apiKey = '&APPID=defcbdf0664d7daa4fd49cbb1dd3b56a';
	var units = '&units=imperial'
	var weatherUrl = api + city + units + apiKey;
	console.log(weatherUrl);

	 $.ajax({
	 	method: 'GET',
	 	url: weatherUrl,
	 	success: function(data) {

	 		name = data.name;
	 		temperature = Math.round(data.main.temp);
	 		humidity = data.main.humidity;

	 		  // console.log(data);
	 		   // console.log(temperature);
	 		  // console.log(name);
	 		  // console.log(humidity);

	// 		 manipulate the DOM here
			
			 displayWeather();

	 	},

		error: function(error) {
	 		console.log(error);
	 	}
	
	 });

	
	 saveToLocalStorage();
}


function getForecast() {


	var apiForecast = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
	var city = $('#city').val();
	var apiKey = '&APPID=defcbdf0664d7daa4fd49cbb1dd3b56a';
	var units = '&units=imperial'
	var forecastUrl = apiForecast + city + units + apiKey;

	$.ajax({
	 	
	 	method: 'GET',
	 	url: forecastUrl,
	 	success: function(data) {
	 		   console.log(data);
	 		// name = data.name;
	 		 var nextDayForecast = Math.round(data.list[1].temp.day);
	 		 var twoDayForecast = Math.round(data.list[2].temp.day);
	 		 var threeDayForecast = Math.round(data.list[3].temp.day);
	 		 var outlook = "A look ahead";
	// 		 manipulate the DOM here
			$('#1').text(nextDayForecast);
			$('#2').text(twoDayForecast);
			$('#3').text(threeDayForecast);
			$('#outlook').text(outlook);

			

			

			
			  

	 	},

		error: function(error) {
	 		console.log(error);
	 	}
	
	 });



	 // console.log(forecastUrl);

}


function displayWeather() {

//display city name, icon, temperature, humidity
	var $name = $('<h2>' + name + '</h2>');
	$('#weather-display').append($name);

	var $temp = $('<p>' + temperature+ '°' + '</p>');
	$('#weather-display').append($temp);
	$temp.addClass('temperature');

	var $forecastButton = $('<button>' + 'Get Forecast For This City' + '</button>'); //dynamic forecast button

}




function saveToLocalStorage() {

	localStorage.cities = JSON.stringify(cities);
}




