function displayWeatherInfo() {

    // Event handler for search button
    $("#searchBtn").on("click", function(event) {
      // prevent default form submission
      event.preventDefault();
      // store input text into a variable
      var searchedCity = $("#searchedCity").val();

      // if input has text in it, retrieve data
      if (searchedCity != "") {
        function displayCurrentWeather() {
          // create variable to hold site URL with the user's search input
          var mainQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&units=imperial" + "&appid=289f73c10e5aeb27cc83c6167ef20a5d"
          
          // AJAX call for main weather info section (except for UV index)
          $.ajax({
            url: mainQueryURL,
            method: "GET"
          }).then(function(mainResponse) {
            // print object in console
            console.log("Current Weather: " + mainResponse);

            var iconURL = "https://openweathermap.org/img/wn/" + mainResponse.weather[0].icon + "@2x.png";

            // fill in HTML city, date, icon
            $("#cityName").css("background-color", "#081e34").text(mainResponse.name);
            $("#currentDate").text(" (" + moment().format("l") + ") ");
            $("#currentIcon").attr("src", iconURL);
            // fill in HTML weather info
            $("#currentWeather").text(mainResponse.weather[0].description);
            $("#currentTemp").text(mainResponse.main.temp + "°F");
            $("#currentHumidity").text(mainResponse.main.humidity + "%");
            $("#currentWind").text(mainResponse.wind.speed + " mph");
          
            // create latitude & longitude variables to retrieve UV index info
            var currentLat = mainResponse.coord.lat;
            var currentLon = mainResponse.coord.lon;

            // UV index url using latitude & longitude info
            var UVindexURL = "https://api.openweathermap.org/data/2.5/uvi?" + "&appid=289f73c10e5aeb27cc83c6167ef20a5d" + "&lat=" + currentLat + "&lon=" + currentLon;

            // AJAX call for UV index
            $.ajax({
              url: UVindexURL,
              method: "GET"
            }).then(function(uvResponse) {
              console.log("UV Index: " + uvResponse);

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
            })
          });
        }

        displayCurrentWeather();

        function showForecast() {
          // 5-day forecast weather info
          var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&units=imperial" + "&appid=289f73c10e5aeb27cc83c6167ef20a5d"
          
          // AJAX call for 5-day forecast info
          $.ajax({
            url: forecastURL,
            method: "GET"
          }).then(function(forecastResponse) {
            console.log("5-Day Forecast Info: " + forecastResponse);

            // fill in HTML with info from 12PM each day
            // day 1:
            $("#forecastDate1").text(moment().add(1, 'days').format("l"));
            $("#forecastIcon1").attr("src", "https://openweathermap.org/img/wn/" + forecastResponse.list[3].weather[0].icon + "@2x.png")
            $("#forecastTemp1").text("temperature: " + forecastResponse.list[3].main.temp + "°F");
            $("#forecastHumidity1").text("humidity: " + forecastResponse.list[3].main.humidity + "%");

            // day 2:
            $("#forecastDate2").text(moment().add(2, 'days').format("l"));
            $("#forecastIcon2").attr("src", "https://openweathermap.org/img/wn/" + forecastResponse.list[11].weather[0].icon + "@2x.png")
            $("#forecastTemp2").text("temperature: " + forecastResponse.list[11].main.temp + "°F");
            $("#forecastHumidity2").text("humidity: " + forecastResponse.list[11].main.humidity + "%");

            // day 3:
            $("#forecastDate3").text(moment().add(3, 'days').format("l"));
            $("#forecastIcon3").attr("src", "https://openweathermap.org/img/wn/" + forecastResponse.list[19].weather[0].icon + "@2x.png")
            $("#forecastTemp3").text("temperature: " + forecastResponse.list[19].main.temp + "°F");
            $("#forecastHumidity3").text("humidity: " + forecastResponse.list[19].main.humidity + "%");

            // day 4:
            $("#forecastDate4").text(moment().add(4, 'days').format("l"));
            $("#forecastIcon4").attr("src", "https://openweathermap.org/img/wn/" + forecastResponse.list[27].weather[0].icon + "@2x.png")
            $("#forecastTemp4").text("temperature: " + forecastResponse.list[27].main.temp + "°F");
            $("#forecastHumidity4").text("humidity: " + forecastResponse.list[27].main.humidity + "%");

            // day 5:
            $("#forecastDate5").text(moment().add(5, 'days').format("l"));
            $("#forecastIcon5").attr("src", "https://openweathermap.org/img/wn/" + forecastResponse.list[35].weather[0].icon + "@2x.png")
            $("#forecastTemp5").text("temperature: " + forecastResponse.list[35].main.temp + "°F");
            $("#forecastHumidity5").text("humidity: " + forecastResponse.list[35].main.humidity + "%");
          })
        }

        showForecast();

      // otherwise, alert the user to input a city name 
      } else {
        alert("You must enter a city name!");
      }
    })
  }

  displayWeatherInfo();