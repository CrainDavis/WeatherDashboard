# WeatherDashboard

## Project Description:
* This project makes use of several Application Programing Interfaces (APIs) to create a dynamic user-friendly application. The weather dashboard, by employing information provided by the OpenWeatherAPI, first presents the user with a search bar, with the instructions to input the name of a city. Upon clicking the search button, the user will then be able to see current weather data for the location that they input. In the Current Weather Data section, the user will be given the following information: the city name (that they chose), the current date (via the Moment.js library), a weather icon indicating the current weather conditions, and written information for the weather conditions, temperature, humidity, wind speed, and UV index. Furthermore, the UV index also indicates through the use of color how severe it is (with green being the safest, and red indicating the most dangerous). 
* The user is also able to view a 5-day forecast for the city of their choice. This forecast displays the noon-time temperature and humidity information for the following five days. 
* In addition, the application is coded to display an image from the "images" folder. All images are originally from Pexels.com. This image displayed in the application is chosen based on the OpenWeather API's weather description (ie "clear sky", "broken clouds", "heavy snow", etc.) for the user's chosen city. Links to Pexels.com and credits to the photograph are displayed below the image.
* Lastly, this application also saves the user's previous searches in a list, which also function as buttons for the user to click and check again. This function is made possible through employing the browser's local storage capability. Through this local storage, the user can also view their most-recently searched city upon re-opening the application. The user also has the choice to clear their search history if they wish, simply by clicking the clear-all button.

## View Application:
![Application GIF](images/WeatherDash.gif)

## Resources:
* Bootstrap CSS (https://getbootstrap.com/)
* OpenWeather API (https://openweathermap.org/)
    * current weather data (https://openweathermap.org/current)
    * 5 day weather forecast (https://openweathermap.org/forecast5)
    * ultraviolet index (beta) (https://openweathermap.org/api/uvi)
* Pexels.com (https://www.pexels.com/)
    * see application for credits for each individual image
* Moment.js library (https://momentjs.com/)

## URLs:
* deployed application: https://craindavis.github.io/WeatherDashboard/
