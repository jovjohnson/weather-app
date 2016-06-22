$(document).ready(init);

var cities;


function init () {

	var n = navigator.geolocation;

	n.getCurrentPosition(success, failure);

	function success(position) {

		var mylat = position.coords.latitude;
		var mylong = position.coords.longitude;

		console.log(mylat, mylong);
 	}

 	function failure() {
 		$('#geocity').html("your location cannot be retrieved");
 	}

	getWeather();



	$("#submit").click(clickTemp);

	$('thead').hide();
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

	$('thead').show();

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
	 		conditions = data.weather[0].main;

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
	 		var nextDayForecast = Math.round(data.list[1].temp.day) + "°";
	 		var twoDayForecast = Math.round(data.list[2].temp.day) + "°";
	 		var threeDayForecast = Math.round(data.list[3].temp.day) + "°";
	 		var outlook = "3 DAY FORECAST";
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

}

function displayWeather() {   //display city name, icon, temperature, humidity


	var $name = $('<h2>' + name + '</h2>');
	$('.current-weather').html($name);

	var $icon = $('<div>');
	$('#weather-display').append($icon);
	$icon.addClass('icon');

	var $temp = $('<p>' + temperature + '°' + '</p>');
	$('.current-weather').html($temp);
	$temp.addClass('temperature');

	var $conditions = $('<p>' + conditions + '</p>');
	$('#weather-display').append($conditions);
	$conditions.addClass('conditions');

}

function saveToLocalStorage() {

	localStorage.cities = JSON.stringify(cities);
}

function displayLocalWeather() {


}
