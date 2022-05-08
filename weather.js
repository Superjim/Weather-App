let windSpeedUnit = "m/s";
let tempUnit = "°C";
let units = "&units=metric";

const celciusButton = document.querySelector(".celcius");
const fahrenheitButton = document.querySelector(".fahrenheit");
const kelvinButton = document.querySelector(".kelvin");

celciusButton.addEventListener("click", () => {
  units = "&units=metric";
});

fahrenheitButton.addEventListener("click", () => {
  units = "&units=imperial";
});

kelvinButton.addEventListener("click", () => {
  units = "";
});

let weather = {
  api: "23fcef06e4cec22d00bccc31bec0ef7c",

  getWeather: function (location, units) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&appid=" +
        this.api +
        units
    )
      .then((response) => response.json())
      .then((data) => this.setWeather(data));
  },

  setWeather: function (data) {
    //get data from object
    const { name } = data;
    const { lon, lat } = data.coord;
    const { temp, temp_max, humidity } = data.main;
    const { icon, description } = data.weather[0];
    const { speed } = data.wind;

    document.querySelector(".location").innerText = name;
    document.querySelector(".lon").innerText = "Longitude: " + lon;
    document.querySelector(".lat").innerText = "Longitude: " + lat;
    document.querySelector(".desc").innerText = description;
    document.querySelector(".maxTemp").innerText =
      "Max Temp: " + temp_max + " " + tempUnit;
    document.querySelector(".currentTemp").innerText =
      "Current Temp: " + temp + " " + tempUnit;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".windSpeed").innerText =
      "Wind speed: " + speed + " " + windSpeedUnit;
  },

  search: function () {
    this.getWeather(document.querySelector(".searchBar").value, units);
  },
};

document.querySelector(".searchButton").addEventListener("click", function () {
  weather.search();
});
