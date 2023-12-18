// API key: a5fc6a3bb1ef51f3168ed91a99397fb3

const search = $("#search-form") // variable for form input
const searchInput = $(".weather-search") // variable to access search term

// Add event listener to form submit
search.on("submit", function (event) {
    event.preventDefault()

    // Call geocoding API to get the coordinates

    var queryURLgeo = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput.val() + "&limit=1&appid=a5fc6a3bb1ef51f3168ed91a99397fb3"
    console.log(queryURLgeo)

    fetch(queryURLgeo)
    .then(function (response) {
        return response.json();
    })
    .then(function (geodata) {

        console.log(geodata)
        
        // get the latitude and longitude of the location searched for
        // Variables to link to these coordinates in the URL
        var lat = geodata[0].lat
        var long = geodata[0].lon

        // save to local storae so they can be used in different functions
        localStorage.setItem("lat", lat)
        localStorage.setItem("long", long)

        // console.log(lat)
        // console.log(long)
        // console.log(localStorage)
    })

    // GET CURRENT WEATHER
    // Build the API query URL based on the user input value
    var queryURLcurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + localStorage.getItem("lat") + "&lon=" + localStorage.getItem("long") + "&appid=a5fc6a3bb1ef51f3168ed91a99397fb3" + "&units=metric"
    console.log(queryURLcurrent)

    fetch(queryURLcurrent)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // CURRENT WEATHER
            // clear the currentweather text content from previous search
            $(".current-weather").text("")

            console.log(queryURLcurrent)
            console.log(data)

            var iconcode = data.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

            var date = $("<h2>").text(dayjs().format("dddd, D/M/YYYY, HH:mm"))
            var temp = $("<p>").text("Temperature: " + data.main.temp + " C")
            var wind = $("<p>").text("Wind speed: " + data.wind.speed + " km/h")
            var humidity = $("<p>").text("Humidity: " + data.main.humidity + " %")
            var icon = $("<img>").attr('src', iconurl);

            $(".current-weather").append(date, icon)
            $(".current-weather").append(temp)
            $(".current-weather").append(wind)
            $(".current-weather").append(humidity)
        });

    // GET 5-DAY FORECAST
    var queryURLforecast = "api.openweathermap.org/data/2.5/forecast?lat=" + localStorage.getItem("lat") + "&lon=" + localStorage.getItem("long") + "&appid=a5fc6a3bb1ef51f3168ed91a99397fb3"

    console.log(queryURLforecast)

    fetch(queryURLforecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (forecastdata) {
            console.log(forecastdata)
            // var date = $("<h2>").text(dayjs().format("dddd, D/M/YYYY, HH:mm"))
            // var temp = $("<p>").text("Temperature: " + data.main.temp + " C")
            // var wind = $("<p>").text("Wind speed: " + data.wind.speed + " km/h")
            // var humidity = $("<p>").text("Humidity: " + data.main.humidity + " %")
            // var icon = $("<img>").attr('src', iconurl);

            // $(".weather-forecast").append(date, icon)
            // $(".weather-forecast").append(temp)
            // $(".weather-forecast").append(wind)
            // $(".weather-forecast").append(humidity)
        })

// ---------------------------------------------------------
    // save search term to local storage and display on left
    localStorage.setItem("city", searchInput.val())
    var historyList = $("<li>").text(searchInput.val())
    $("#history").append(historyList)
    //    - Build the API query URL based on the history stored in local storage
//    - Call the API and render the result in the HTML
// 4. When user click on the search history, call weather API and show the result in the HTML
})
