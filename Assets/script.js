// API key: a5fc6a3bb1ef51f3168ed91a99397fb3
var historyListEl = $("#history") // variable for history section
const search = $("#search-form") // variable for form input
const searchInput = $(".weather-search") // variable to access search term

// create array for previous searches

var previousSearches

// if local storage contains previous city searches, retrieve them
if (localStorage.getItem("city")) {
    previousSearches = [localStorage.getItem("city")]
} else {
    // else create empty array
    previousSearches = []
}

async function getCoordinates(userInput) {
    // Call geocoding API to get the coordinates

    var queryURLgeo = "https://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&limit=1&appid=a5fc6a3bb1ef51f3168ed91a99397fb3"
    console.log(queryURLgeo)

    fetch(queryURLgeo)
        .then(function (response) {
            return response.json();
        })
        .then(function (geodata) {

            console.log(geodata)

            // get the latitude and longitude of the location searched for
            // define variables to link to these coordinates in the URL
            var lat = geodata[0].lat
            var long = geodata[0].lon

            // save to local storage so they can be used in different functions
            localStorage.setItem("lat", lat)
            localStorage.setItem("long", long)

        })
}

function currentWeather() {
    // GET CURRENT WEATHER
    // Build the API query URL based on the user input value
    var queryURLcurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + localStorage.getItem("lat") + "&lon=" + localStorage.getItem("long") + "&appid=a5fc6a3bb1ef51f3168ed91a99397fb3" + "&units=metric"
    console.log(queryURLcurrent)

    fetch(queryURLcurrent)
        .then(function (response) {
            return response.json();
        })
        .then(function (weatherdata) {
            $("#today").html("")
            // CURRENT WEATHER
            // clear the currentweather text content from previous search
            $(".current-weather").text("")

            console.log(queryURLcurrent)
            console.log(weatherdata)

            var iconcode = weatherdata.weather[0].icon;
            var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";

            var todayCard = $("<div>")

            var date = $("<h2>").text(dayjs().format("dddd, D/M/YYYY"))
            var description = $("<h3>").text(weatherdata.weather[0].description)
            var temp = $("<p>").text("Temperature: " + weatherdata.main.temp + "°C")
            var feelslike = $("<p>").text("Feels like: " + weatherdata.main.feels_like + "°C")
            var wind = $("<p>").text("Wind speed: " + weatherdata.wind.speed + "km/h")
            var humidity = $("<p>").text("Humidity: " + weatherdata.main.humidity + "%")
            var icon = $("<img>").attr('src', iconurl);

            todayCard.append(searchInput.val(), date)
            todayCard.append(location)
            todayCard.append(description, icon)
            todayCard.append(temp, feelslike)
            todayCard.append(wind)
            todayCard.append(humidity)

            $(".current-weather").append(todayCard)
        });
}

function weatherForecast() {
    // GET 5-DAY FORECAST
    var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + localStorage.getItem("lat") + "&lon=" + localStorage.getItem("long") + "&appid=a5fc6a3bb1ef51f3168ed91a99397fb3" + "&units=metric"
    console.log(localStorage.getItem("lat"))
    console.log(localStorage.getItem("long"))
    console.log(queryURLforecast)

    fetch(queryURLforecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (forecastdata) {

            $("#forecast").html("")
            
            console.log(forecastdata)

            // get every 8th item in array to get one reading per day
            for (i = 0; i < forecastdata.list.length; i+=8){

                var dayCard = $("<div>").addClass("five-day-card")

            var iconcode = forecastdata.list[i].weather[0].icon;
            var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";

            var day = $("<h4>").text(dayjs(forecastdata.list[i].dt_txt).format("dddd"))
            var date = $("<h5>").text(dayjs(forecastdata.list[i].dt_txt).format("D/M/YYYY"))
            var description = $("<h4>").text(forecastdata.list[i].weather[0].description)
            var temp = $("<p>").text("Temperature: " + forecastdata.list[i].main.temp + "°C")
            var feelslike = $("<p>").text("Feels like: " + forecastdata.list[i].main.feels_like + "°C")
            var wind = $("<p>").text("Wind speed: " + forecastdata.list[i].wind.speed + "km/h")
            var humidity = $("<p>").text("Humidity: " + forecastdata.list[i].main.humidity + "%")
            var icon = $("<img>").attr('src', iconurl);

            dayCard.append(day)
            dayCard.append(date)
            dayCard.append(icon)
            dayCard.append(description)
            dayCard.append(temp, feelslike)
            dayCard.append(wind)
            dayCard.append(humidity)

            $(".weather-forecast").append(dayCard)
            }
        })
}

// Add event listener to form submit
search.on("submit", async function (event) {
    event.preventDefault()

    // call and display API calls ONCE coordinates are retrieved
    await getCoordinates(searchInput.val())
        currentWeather()
        weatherForecast()

    // don't push duplicate searches to the array
    if (!previousSearches.includes(searchInput.val())) {
        // save search term to local storage
        previousSearches.unshift(searchInput.val())
        // localStorage.setItem("city", searchInput.val())
        localStorage.setItem("city", previousSearches)
    }
    
    // clear the history before adding the previous searches to it
    historyListEl.text("")

    // cap the history at five previous searches
    for (i = 0; i < previousSearches.length; i++) {
        // if this is item 0-4 in the previousSearch variable add it to the history section, 
        if (0<i<4) {
            historyListEl.append("<li>" + previousSearches[i] + "</li>")
        }
        // else do nothing
    }

})

// event listener for history list items

historyListEl.on("click", function (event) {
    // Build the API query URL based on the history stored in local storage
    console.log(event.target.textContent) 
})

$(".clear-button").on("click", function(){
    localStorage.clear()
    historyListEl.html("")
})