function displayWeatherInfo() {

    // Event handler for search button
    $("#searchBtn").on("click", function(event) {
      // prevent default form submission
      event.preventDefault();
      // store input text into a variable
      var searchedCity = $("#searchedCity").val();

      // if input has text in it, retrieve data
      if (searchedCity != "") {

        // insert an image via 
        function displayCityImage() {

          var pexelsAPIkey = "563492ad6f91700001000001e15517b4e1ce413ab4eae6a9eac1a519";

          // AJAX call for Pexels.com API
          $.ajax({
            url: "https://api.pexels.com/v1/search?query=" + searchedCity + "&per_page=15&page=1",
            method: "GET",
            // enter authorization key for Pexels.com's API
            beforeSend: function(xhr) {
              xhr.setRequestHeader ("Authorization", pexelsAPIkey)
            }
          }).then(function(imageResponse) {
              console.log(imageResponse);

              // prevent blank image from displaying if Pexels.com's API has no image in store
              if (imageResponse.total_results === 0) {
                $("#weatherImage").addClass("hide");
                $("#imageLink").addClass("hide");
                $("#imageSource").addClass("hide");
                // remove "hide" class from weather info sections
                $("#currentWeatherSection").removeClass("hide");
                $("#forecastWeatherSection").removeClass("hide");
                
                // otherwise, display image and source links normally
              } else if ((imageResponse.total_results != 0)) {
                // remove "hide" class from weather info sections (once user enters in a city name)
                $("#currentWeatherSection").removeClass("hide");
                $("#weatherImage").removeClass("hide");
                $("#forecastWeatherSection").removeClass("hide");
                $("#imageLink").removeClass("hide");
                $("#imageSource").removeClass("hide");
                
                function getRandomIndex() {
                  // empty out previous randomized number submissions
                  $("#weatherImage").empty();
                  $("#imageSource").empty();

                  // fill in image and text with a (new) random selection from the photos array
                  var randomIndex = imageResponse.photos[Math.floor(Math.random() * imageResponse.photos.length)];
                  $("#weatherImage").attr("src", randomIndex.src.landscape);
                  $("#imageSource").text("photo by: " + randomIndex.photographer);
                  $("#imageSource").attr("href", randomIndex.photographer_url);
                }
                getRandomIndex();
              }
            })
        }

        displayCityImage();
        
        function displayCurrentWeather() {
          // create variable to hold site URL with the user's search input
          var mainQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&units=imperial" + "&appid=289f73c10e5aeb27cc83c6167ef20a5d"
          
          // AJAX call for main weather info section (except for UV index)
          $.ajax({
            url: mainQueryURL,
            method: "GET"
          }).then(function(mainResponse) {
            // print object in console
            console.log("weather info via city name:");
            console.log(mainResponse);

            // variable for weather icons
            var iconURL = "https://openweathermap.org/img/wn/" + mainResponse.weather[0].icon + "@2x.png";

            // fill in HTML city, date, icon
            $("#cityName").css("background-color", "#081e34").text(mainResponse.name);
            $("#currentDate").text(" (" + moment().format("l") + ") ");
            $("#currentIcon").attr("src", iconURL);
            // fill in HTML current weather info
            $("#currentWeather").text(mainResponse.weather[0].description);
            $("#currentTemp").text(Math.floor(mainResponse.main.temp) + "°F");
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
              console.log("UV index info:");
              console.log(uvResponse);

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
            })
          });
        }

        // call function
        displayCurrentWeather();

        function showForecast() {
          // 5-day forecast weather info
          var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&units=imperial" + "&appid=289f73c10e5aeb27cc83c6167ef20a5d"
          
          // AJAX call for 5-day forecast info
          $.ajax({
            url: forecastURL,
            method: "GET"
          }).then(function(forecastResponse) {
            console.log("5-day forecast info:");
            console.log(forecastResponse);

            // fill in HTML with info from 12PM each day
            // day 1:
            $("#forecastDate1").text(moment().add(1, 'days').format("l"));
            $("#forecastIcon1").attr("src", "https://openweathermap.org/img/wn/" + forecastResponse.list[3].weather[0].icon + "@2x.png")
            $("#forecastTemp1").text("temperature: " + Math.floor(forecastResponse.list[3].main.temp) + "°F");
            $("#forecastHumidity1").text("humidity: " + forecastResponse.list[3].main.humidity + "%");

            // day 2:
            $("#forecastDate2").text(moment().add(2, 'days').format("l"));
            $("#forecastIcon2").attr("src", "https://openweathermap.org/img/wn/" + forecastResponse.list[11].weather[0].icon + "@2x.png")
            $("#forecastTemp2").text("temperature: " + Math.floor(forecastResponse.list[11].main.temp) + "°F");
            $("#forecastHumidity2").text("humidity: " + forecastResponse.list[11].main.humidity + "%");

            // day 3:
            $("#forecastDate3").text(moment().add(3, 'days').format("l"));
            $("#forecastIcon3").attr("src", "https://openweathermap.org/img/wn/" + forecastResponse.list[19].weather[0].icon + "@2x.png")
            $("#forecastTemp3").text("temperature: " + Math.floor(forecastResponse.list[19].main.temp) + "°F");
            $("#forecastHumidity3").text("humidity: " + forecastResponse.list[19].main.humidity + "%");

            // day 4:
            $("#forecastDate4").text(moment().add(4, 'days').format("l"));
            $("#forecastIcon4").attr("src", "https://openweathermap.org/img/wn/" + forecastResponse.list[27].weather[0].icon + "@2x.png")
            $("#forecastTemp4").text("temperature: " + Math.floor(forecastResponse.list[27].main.temp) + "°F");
            $("#forecastHumidity4").text("humidity: " + forecastResponse.list[27].main.humidity + "%");

            // day 5:
            $("#forecastDate5").text(moment().add(5, 'days').format("l"));
            $("#forecastIcon5").attr("src", "https://openweathermap.org/img/wn/" + forecastResponse.list[35].weather[0].icon + "@2x.png")
            $("#forecastTemp5").text("temperature: " + Math.floor(forecastResponse.list[35].main.temp) + "°F");
            $("#forecastHumidity5").text("humidity: " + forecastResponse.list[35].main.humidity + "%");
          })
        }

        // call function
        showForecast();

      // if search field is left blank, alert the user to input a city name 
      } else {
        alert("You must enter a city name!");
      }
    })
  }

  // call function
  displayWeatherInfo();