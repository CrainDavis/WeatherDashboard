// local storage variables
var storageArr = [];
var storedCities = JSON.parse(localStorage.getItem("search-history"));

var combinedCities = storageArr.concat(storedCities);

// get search history from local storage and display buttons in HTML upon page reload
if (localStorage.getItem("search-history")) {
  for (var i = 0; i < combinedCities.length; i++) {
    if (combinedCities[i] != null) {
      $("#savedSearches").append(
        '<a class="list-group-item list-group-item-action save-city-btn savedSearch" data-name="' +
          combinedCities[i] +
          '">' +
          combinedCities[i] +
          "</a>"
      );
    }
  }
}

// when list button is clicked
$("#savedSearches").on("click", ".save-city-btn", function () {});

// make Clear Search History button functional
$("#clearBtn").on("click", function (event) {
  // prevent default page reload
  event.preventDefault();
  // clear out local storage
  localStorage.clear();
  // empty list
  $("#savedSearches").text("");
});

// Event handler for search button
$(document).on("click", "#searchBtn, .savedSearch", function (event) {
  var searchedCity = "";
  if ($(this).hasClass("savedSearch")) {
    searchedCity = $(this).attr("data-name");
  } else {
    // store input text into a variable
    searchedCity = $("#searchedCity").val();
  }

  // store last searched city in local storage (to be displayed when page is re-opened)
  localStorage.setItem("lastCityWeatherSearch", searchedCity);

  // prevent default form submission
  event.preventDefault();

  if (combinedCities.indexOf(searchedCity) < 0) {
    // do not append button if search input is empty
    if (searchedCity != "") {
      // push search term (city name) into array
      combinedCities.push(searchedCity);
      // set array to local storage
      localStorage.setItem("search-history", JSON.stringify(combinedCities));
      // append search term to HTML search history list
      $("#savedSearches").append(
        '<a class="list-group-item list-group-item-action save-city-btn savedSearch" data-name="' +
          searchedCity +
          '">' +
          searchedCity +
          "</a>"
      );
    }
  }

  function displayAllWeatherInfo() {
    // if input has text in it, retrieve data
    if (searchedCity != "") {
      // create variable to hold site URL with the user's search input
      var mainQueryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchedCity +
        "&units=imperial" +
        "&appid=289f73c10e5aeb27cc83c6167ef20a5d";

      // AJAX call for main weather info section (except for UV index)
      $.ajax({
        url: mainQueryURL,
        method: "GET",
      }).then(function (mainResponse) {
        // variable for weather icons
        var iconURL =
          "https://openweathermap.org/img/wn/" +
          mainResponse.weather[0].icon +
          "@2x.png";

        // fill in HTML city, date, icon
        $("#cityName")
          .css("background-color", "#081e34")
          .text(mainResponse.name);
        $("#currentDate").text(" (" + moment().format("l") + ") ");
        $("#currentIcon").attr("src", iconURL);
        // fill in HTML current weather info
        $("#currentWeather").text(mainResponse.weather[0].description);
        $("#currentTemp").text(Math.floor(mainResponse.main.temp) + "°F");
        $("#currentHumidity").text(mainResponse.main.humidity + "%");
        $("#currentWind").text(Math.floor(mainResponse.wind.speed) + " mph");

        // insert an image from Pexels.com
        function weatherImage() {
          $("#currentWeatherSection").removeClass("hide");
          $("#weatherImage").removeClass("hide");
          $("#imageLink").removeClass("hide");
          $("#imageSource").removeClass("hide");
          $("#forecastWeatherSection").removeClass("hide");

          // display an image from the images folder based on OpenWeather API's weather description
          if (mainResponse.weather[0].description === "clear sky") {
            $("#weatherImage").attr("src", "assets/images/sky-clear.jpeg");
            $("#imageSource")
              .text("by: Francesco Ungaro")
              .attr("href", "https://www.pexels.com/@francesco-ungaro");
          } else if (mainResponse.weather[0].description === "few clouds") {
            $("#weatherImage").attr("src", "assets/images/clouds-few.jpeg");
            $("#imageSource")
              .text("by: Pixabay")
              .attr("href", "https://www.pexels.com/@pixabay");
          } else if (
            mainResponse.weather[0].description === "scattered clouds"
          ) {
            $("#weatherImage").attr(
              "src",
              "assets/images/clouds-scattered.jpeg"
            );
            $("#imageSource")
              .text("by: Pixabay")
              .attr("href", "https://www.pexels.com/@pixabay");
          } else if (mainResponse.weather[0].description === "broken clouds") {
            $("#weatherImage").attr("src", "assets/images/clouds-broken.jpeg");
            $("#imageSource").text("by: Brett Sayles");
            $("#imageSource").attr(
              "href",
              "https://www.pexels.com/@brett-sayles"
            );
          } else if (
            mainResponse.weather[0].description === "overcast clouds"
          ) {
            $("#weatherImage").attr(
              "src",
              "assets/images/clouds-overcast.jpeg"
            );
            $("#imageSource")
              .text("by: Ben Herbert")
              .attr("href", "https://www.pexels.com/@nzbenzimages");
          } else if (mainResponse.weather[0].description === "light rain") {
            $("#weatherImage").attr("src", "assets/images/rain-light.jpeg");
            $("#imageSource")
              .text("by: Kaique Rocha")
              .attr("href", "https://www.pexels.com/@kaiquestr");
          } else if (
            mainResponse.weather[0].description === "light intensity drizzle"
          ) {
            $("#weatherImage").attr(
              "src",
              "assets/images/rain-light-drizzle.jpeg"
            );
            $("#imageSource")
              .text("by: veeterzy")
              .attr("href", "https://www.pexels.com/@veeterzy");
          } else if (mainResponse.weather[0].description === "moderate rain") {
            $("#weatherImage").attr("src", "assets/images/rain-moderate.jpeg");
            $("#imageSource")
              .text("by: Bedis ElAcheche")
              .attr("href", "https://www.pexels.com/@bedis-elacheche-310026");
          } else if (
            mainResponse.weather[0].description === "heavy intensity rain"
          ) {
            $("#weatherImage").attr("src", "assets/images/rain-heavy.jpeg");
            $("#imageSource")
              .text("by: Aleksandar Pasaric")
              .attr("href", "https://www.pexels.com/@apasaric");
          } else if (mainResponse.weather[0].description === "light snow") {
            $("#weatherImage").attr("src", "assets/images/snow-light.jpeg");
            $("#imageSource")
              .text("by: Oleg Magni")
              .attr("href", "https://www.pexels.com/@oleg-magni");
          } else if (mainResponse.weather[0].description === "snow") {
            $("#weatherImage").attr("src", "assets/images/snow-moderate.jpeg");
            $("#imageSource")
              .text("by: Gratisography")
              .attr("href", "https://www.pexels.com/@gratisography");
          } else if (mainResponse.weather[0].description === "heavy snow") {
            $("#weatherImage").attr("src", "assets/images/snow-heavy.jpeg");
            $("#imageSource")
              .text("by: Pixabay")
              .attr("href", "https://www.pexels.com/@pixabay");
          } else if (mainResponse.weather[0].description === "thunderstorm") {
            $("#weatherImage").attr("src", "assets/images/thunderstorm.jpeg");
            $("#imageSource")
              .text("by: Frank Cone")
              .attr("href", "https://www.pexels.com/@frank-cone-140140");
          } else if (
            mainResponse.weather[0].description ===
            "thunderstorm with heavy rain"
          ) {
            $("#weatherImage").attr(
              "src",
              "assets/images/thunderstorm-with-heavy-rain.jpeg"
            );
            $("#imageSource")
              .text("by: Johannes Plenio")
              .attr("href", "https://www.pexels.com/@jplenio");
          } else if (mainResponse.weather[0].description === "mist") {
            $("#weatherImage").attr("src", "assets/images/mist.jpeg");
            $("#imageSource")
              .text("by: Pixabay")
              .attr("href", "https://www.pexels.com/@pixabay");
          } else {
            $("#weatherImage").addClass("hide");
            $("#imageLink").addClass("hide");
            $("#imageSource").addClass("hide");
          }
        }

        // call function
        weatherImage();

        // create latitude & longitude variables to retrieve UV index info
        var currentLat = mainResponse.coord.lat;
        var currentLon = mainResponse.coord.lon;

        // UV index url using latitude & longitude info
        var UVindexURL =
          "https://api.openweathermap.org/data/2.5/uvi?" +
          "&appid=289f73c10e5aeb27cc83c6167ef20a5d" +
          "&lat=" +
          currentLat +
          "&lon=" +
          currentLon;

        // AJAX call for UV index
        $.ajax({
          url: UVindexURL,
          method: "GET",
        }).then(function (uvResponse) {
          // fill in UV index text and determine color based on number
          $("#uvIndexColor").text(uvResponse.value);
          if (uvResponse.value >= 0 && uvResponse.value < 3) {
            $("#uvIndexColor").css("background-color", "#55c50f");
          } else if (uvResponse.value >= 3 && uvResponse.value < 6) {
            $("#uvIndexColor").css("background-color", "#ead71c");
          } else if (uvResponse.value >= 6 && uvResponse.value < 8) {
            $("#uvIndexColor").css("background-color", "#ea841c");
          } else if (uvResponse.value >= 8 && uvResponse.value < 11) {
            $("#uvIndexColor").css("background-color", "#ea3838");
          } else if (uvResponse.value >= 11) {
            $("#uvIndexColor").css("background-color", "#8120c5");
          }
        });
      });

      function showForecast() {
        // 5-day forecast weather info
        var forecastURL =
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
          searchedCity +
          "&units=imperial" +
          "&appid=289f73c10e5aeb27cc83c6167ef20a5d";

        // AJAX call for 5-day forecast info
        $.ajax({
          url: forecastURL,
          method: "GET",
        }).then(function (forecastResponse) {
          // fill in HTML with info from 12PM each day
          // day 1:
          $("#forecastDate1").text(moment().add(1, "days").format("l"));
          $("#forecastIcon1").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              forecastResponse.list[3].weather[0].icon +
              "@2x.png"
          );
          $("#forecastTemp1").text(
            "temperature: " +
              Math.floor(forecastResponse.list[3].main.temp) +
              "°F"
          );
          $("#forecastHumidity1").text(
            "humidity: " + forecastResponse.list[3].main.humidity + "%"
          );
          // day 2:
          $("#forecastDate2").text(moment().add(2, "days").format("l"));
          $("#forecastIcon2").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              forecastResponse.list[11].weather[0].icon +
              "@2x.png"
          );
          $("#forecastTemp2").text(
            "temperature: " +
              Math.floor(forecastResponse.list[11].main.temp) +
              "°F"
          );
          $("#forecastHumidity2").text(
            "humidity: " + forecastResponse.list[11].main.humidity + "%"
          );
          // day 3:
          $("#forecastDate3").text(moment().add(3, "days").format("l"));
          $("#forecastIcon3").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              forecastResponse.list[19].weather[0].icon +
              "@2x.png"
          );
          $("#forecastTemp3").text(
            "temperature: " +
              Math.floor(forecastResponse.list[19].main.temp) +
              "°F"
          );
          $("#forecastHumidity3").text(
            "humidity: " + forecastResponse.list[19].main.humidity + "%"
          );
          // day 4:
          $("#forecastDate4").text(moment().add(4, "days").format("l"));
          $("#forecastIcon4").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              forecastResponse.list[27].weather[0].icon +
              "@2x.png"
          );
          $("#forecastTemp4").text(
            "temperature: " +
              Math.floor(forecastResponse.list[27].main.temp) +
              "°F"
          );
          $("#forecastHumidity4").text(
            "humidity: " + forecastResponse.list[27].main.humidity + "%"
          );
          // day 5:
          $("#forecastDate5").text(moment().add(5, "days").format("l"));
          $("#forecastIcon5").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              forecastResponse.list[35].weather[0].icon +
              "@2x.png"
          );
          $("#forecastTemp5").text(
            "temperature: " +
              Math.floor(forecastResponse.list[35].main.temp) +
              "°F"
          );
          $("#forecastHumidity5").text(
            "humidity: " + forecastResponse.list[35].main.humidity + "%"
          );
        });
      }

      // call function
      showForecast();

      // if search field is left blank, alert the user to input a city name
    } else {
      alert("You must enter a city name!");
      return;
    }
  }

  displayAllWeatherInfo();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ON PAGE RELOAD, DISPLAY LAST SEARCHED CITY

$(window).on("load", function () {
  searchedCity = localStorage.getItem("lastCityWeatherSearch");

  function displayAllWeatherInfo() {
    // if input has text in it, retrieve data
    if (searchedCity != "") {
      // create variable to hold site URL with the user's search input
      var mainQueryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchedCity +
        "&units=imperial" +
        "&appid=289f73c10e5aeb27cc83c6167ef20a5d";

      // AJAX call for main weather info section (except for UV index)
      $.ajax({
        url: mainQueryURL,
        method: "GET",
      }).then(function (mainResponse) {
        // variable for weather icons
        var iconURL =
          "https://openweathermap.org/img/wn/" +
          mainResponse.weather[0].icon +
          "@2x.png";

        // fill in HTML city, date, icon
        $("#cityName")
          .css("background-color", "#081e34")
          .text(mainResponse.name);
        $("#currentDate").text(" (" + moment().format("l") + ") ");
        $("#currentIcon").attr("src", iconURL);
        // fill in HTML current weather info
        $("#currentWeather").text(mainResponse.weather[0].description);
        $("#currentTemp").text(Math.floor(mainResponse.main.temp) + "°F");
        $("#currentHumidity").text(mainResponse.main.humidity + "%");
        $("#currentWind").text(Math.floor(mainResponse.wind.speed) + " mph");

        // insert an image from Pexels.com
        function weatherImage() {
          $("#currentWeatherSection").removeClass("hide");
          $("#weatherImage").removeClass("hide");
          $("#imageLink").removeClass("hide");
          $("#imageSource").removeClass("hide");
          $("#forecastWeatherSection").removeClass("hide");

          // display an image from the images folder based on OpenWeather API's weather description
          if (mainResponse.weather[0].description === "clear sky") {
            $("#weatherImage").attr("src", "assets/images/sky-clear.jpeg");
            $("#imageSource")
              .text("by: Francesco Ungaro")
              .attr("href", "https://www.pexels.com/@francesco-ungaro");
          } else if (mainResponse.weather[0].description === "few clouds") {
            $("#weatherImage").attr("src", "assets/images/clouds-few.jpeg");
            $("#imageSource")
              .text("by: Pixabay")
              .attr("href", "https://www.pexels.com/@pixabay");
          } else if (
            mainResponse.weather[0].description === "scattered clouds"
          ) {
            $("#weatherImage").attr(
              "src",
              "assets/images/clouds-scattered.jpeg"
            );
            $("#imageSource")
              .text("by: Pixabay")
              .attr("href", "https://www.pexels.com/@pixabay");
          } else if (mainResponse.weather[0].description === "broken clouds") {
            $("#weatherImage").attr("src", "assets/images/clouds-broken.jpeg");
            $("#imageSource").text("by: Brett Sayles");
            $("#imageSource").attr(
              "href",
              "https://www.pexels.com/@brett-sayles"
            );
          } else if (
            mainResponse.weather[0].description === "overcast clouds"
          ) {
            $("#weatherImage").attr(
              "src",
              "assets/images/clouds-overcast.jpeg"
            );
            $("#imageSource")
              .text("by: Ben Herbert")
              .attr("href", "https://www.pexels.com/@nzbenzimages");
          } else if (mainResponse.weather[0].description === "light rain") {
            $("#weatherImage").attr("src", "assets/images/rain-light.jpeg");
            $("#imageSource")
              .text("by: Kaique Rocha")
              .attr("href", "https://www.pexels.com/@kaiquestr");
          } else if (
            mainResponse.weather[0].description === "light intensity drizzle"
          ) {
            $("#weatherImage").attr(
              "src",
              "assets/images/rain-light-drizzle.jpeg"
            );
            $("#imageSource")
              .text("by: veeterzy")
              .attr("href", "https://www.pexels.com/@veeterzy");
          } else if (mainResponse.weather[0].description === "moderate rain") {
            $("#weatherImage").attr("src", "assets/images/rain-moderate.jpeg");
            $("#imageSource")
              .text("by: Bedis ElAcheche")
              .attr("href", "https://www.pexels.com/@bedis-elacheche-310026");
          } else if (
            mainResponse.weather[0].description === "heavy intensity rain"
          ) {
            $("#weatherImage").attr("src", "assets/images/rain-heavy.jpeg");
            $("#imageSource")
              .text("by: Aleksandar Pasaric")
              .attr("href", "https://www.pexels.com/@apasaric");
          } else if (mainResponse.weather[0].description === "light snow") {
            $("#weatherImage").attr("src", "assets/images/snow-light.jpeg");
            $("#imageSource")
              .text("by: Oleg Magni")
              .attr("href", "https://www.pexels.com/@oleg-magni");
          } else if (mainResponse.weather[0].description === "snow") {
            $("#weatherImage").attr("src", "assets/images/snow-moderate.jpeg");
            $("#imageSource")
              .text("by: Gratisography")
              .attr("href", "https://www.pexels.com/@gratisography");
          } else if (mainResponse.weather[0].description === "heavy snow") {
            $("#weatherImage").attr("src", "assets/images/snow-heavy.jpeg");
            $("#imageSource")
              .text("by: Pixabay")
              .attr("href", "https://www.pexels.com/@pixabay");
          } else if (mainResponse.weather[0].description === "thunderstorm") {
            $("#weatherImage").attr("src", "assets/images/thunderstorm.jpeg");
            $("#imageSource")
              .text("by: Frank Cone")
              .attr("href", "https://www.pexels.com/@frank-cone-140140");
          } else if (
            mainResponse.weather[0].description ===
            "thunderstorm with heavy rain"
          ) {
            $("#weatherImage").attr(
              "src",
              "assets/images/thunderstorm-with-heavy-rain.jpeg"
            );
            $("#imageSource")
              .text("by: Johannes Plenio")
              .attr("href", "https://www.pexels.com/@jplenio");
          } else if (mainResponse.weather[0].description === "mist") {
            $("#weatherImage").attr("src", "assets/images/mist.jpeg");
            $("#imageSource")
              .text("by: Pixabay")
              .attr("href", "https://www.pexels.com/@pixabay");
          } else {
            $("#weatherImage").addClass("hide");
            $("#imageLink").addClass("hide");
            $("#imageSource").addClass("hide");
          }
        }

        // call function
        weatherImage();

        // create latitude & longitude variables to retrieve UV index info
        var currentLat = mainResponse.coord.lat;
        var currentLon = mainResponse.coord.lon;

        // UV index url using latitude & longitude info
        var UVindexURL =
          "https://api.openweathermap.org/data/2.5/uvi?" +
          "&appid=289f73c10e5aeb27cc83c6167ef20a5d" +
          "&lat=" +
          currentLat +
          "&lon=" +
          currentLon;

        // AJAX call for UV index
        $.ajax({
          url: UVindexURL,
          method: "GET",
        }).then(function (uvResponse) {
          // fill in UV index text and determine color based on number
          $("#uvIndexColor").text(uvResponse.value);
          if (uvResponse.value >= 0 && uvResponse.value < 3) {
            $("#uvIndexColor").css("background-color", "#55c50f");
          } else if (uvResponse.value >= 3 && uvResponse.value < 6) {
            $("#uvIndexColor").css("background-color", "#ead71c");
          } else if (uvResponse.value >= 6 && uvResponse.value < 8) {
            $("#uvIndexColor").css("background-color", "#ea841c");
          } else if (uvResponse.value >= 8 && uvResponse.value < 11) {
            $("#uvIndexColor").css("background-color", "#ea3838");
          } else if (uvResponse.value >= 11) {
            $("#uvIndexColor").css("background-color", "#8120c5");
          }
        });
      });

      function showForecast() {
        // 5-day forecast weather info
        var forecastURL =
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
          searchedCity +
          "&units=imperial" +
          "&appid=289f73c10e5aeb27cc83c6167ef20a5d";

        // AJAX call for 5-day forecast info
        $.ajax({
          url: forecastURL,
          method: "GET",
        }).then(function (forecastResponse) {
          // fill in HTML with info from 12PM each day
          // day 1:
          $("#forecastDate1").text(moment().add(1, "days").format("l"));
          $("#forecastIcon1").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              forecastResponse.list[3].weather[0].icon +
              "@2x.png"
          );
          $("#forecastTemp1").text(
            "temperature: " +
              Math.floor(forecastResponse.list[3].main.temp) +
              "°F"
          );
          $("#forecastHumidity1").text(
            "humidity: " + forecastResponse.list[3].main.humidity + "%"
          );
          // day 2:
          $("#forecastDate2").text(moment().add(2, "days").format("l"));
          $("#forecastIcon2").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              forecastResponse.list[11].weather[0].icon +
              "@2x.png"
          );
          $("#forecastTemp2").text(
            "temperature: " +
              Math.floor(forecastResponse.list[11].main.temp) +
              "°F"
          );
          $("#forecastHumidity2").text(
            "humidity: " + forecastResponse.list[11].main.humidity + "%"
          );
          // day 3:
          $("#forecastDate3").text(moment().add(3, "days").format("l"));
          $("#forecastIcon3").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              forecastResponse.list[19].weather[0].icon +
              "@2x.png"
          );
          $("#forecastTemp3").text(
            "temperature: " +
              Math.floor(forecastResponse.list[19].main.temp) +
              "°F"
          );
          $("#forecastHumidity3").text(
            "humidity: " + forecastResponse.list[19].main.humidity + "%"
          );
          // day 4:
          $("#forecastDate4").text(moment().add(4, "days").format("l"));
          $("#forecastIcon4").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              forecastResponse.list[27].weather[0].icon +
              "@2x.png"
          );
          $("#forecastTemp4").text(
            "temperature: " +
              Math.floor(forecastResponse.list[27].main.temp) +
              "°F"
          );
          $("#forecastHumidity4").text(
            "humidity: " + forecastResponse.list[27].main.humidity + "%"
          );
          // day 5:
          $("#forecastDate5").text(moment().add(5, "days").format("l"));
          $("#forecastIcon5").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              forecastResponse.list[35].weather[0].icon +
              "@2x.png"
          );
          $("#forecastTemp5").text(
            "temperature: " +
              Math.floor(forecastResponse.list[35].main.temp) +
              "°F"
          );
          $("#forecastHumidity5").text(
            "humidity: " + forecastResponse.list[35].main.humidity + "%"
          );
        });
      }

      // call function
      showForecast();
    }
  }

  displayAllWeatherInfo();
});
