# WeatherDashboard
## Project Description:
* This project makes use of several Application Programing Interfaces (APIs) to create a dynamic user-friendly application. The weather dashboard, by employing information provided by the OpenWeatherAPI, first presents the user with a search bar, with the instructions to input the name of a city. Upon clicking the search button, the user will then be able to see current weather data for the location that they chose. In the Current Weather Data section, the user will be given information: the city name (that they chose), the current date (via the Moment.js library), a weather icon indicating the current weather conditions, and written information for the weather conditions, temperature, humidity, wind speed, and UV index. Furthermore, the UV index also indicates through the use of color how severe it is (with green being the safest, and red indicating the most dangerous). 
* The user is also able to view a 5-day forecast for the city of their choice. This forecast displays the noon-time temperature and humidity information for the following five days. In addition, the application also makes use of the Pexels.com API, a site that allows people to pull images from the site. This Weather Dashboard application uses Pexels.com's API to grab images based on the user's input city name. If the user were to type in "Los Angeles", the image will be one from this city. In the case that Pexels API does not possess any images of a particular city, the application is coded to instead display a random image from the "images" folder. The random images are of various weather/climate phenomena. 
* Lastly, this application also saves the user's previous searches in a list, which also function as buttons for the user to check again. This function is made possible through employing the browser's local storage capability. Through this, the user can also view their most-recently searched city upon re-opening the application. The use also has the choice to clear their search history if they wish, simply by clicking the clear-all button.
## Resources:
* Bootstrap CSS (https://getbootstrap.com/)
* OpenWeather API (https://openweathermap.org/)
    * current weather data (https://openweathermap.org/current)
    * 5 day weather forecast (https://openweathermap.org/forecast5)
    * ultraviolet index (beta) (https://openweathermap.org/api/uvi)
* Pexels API (https://www.pexels.com/)
    * documentation (https://www.pexels.com/api/documentation/)
* Moment.js library (https://momentjs.com/)
## URLs:
* deployed application: https://craindavis.github.io/WeatherDashboard/
* GitHub repository: https://github.com/CrainDavis/WeatherDashboard
