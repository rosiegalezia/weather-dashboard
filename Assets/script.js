// API key: a5fc6a3bb1ef51f3168ed91a99397fb3

const search = $("#search-form") // variable for form input
const searchInput = $(".weather-search") // variable to access search term

// Add event listener to form submit
search.on("submit", function (event) {
    event.preventDefault()

    // GEOCODING API
    // Get the coordinates for the location

    var queryURLgeo = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput.val() + "&limit=1&appid=a5fc6a3bb1ef51f3168ed91a99397fb3"
    console.log(queryURLgeo)

    fetch(queryURLgeo)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        console.log(data)
        
        // get the latitude and longitude of the location searched for
        // Variables to link to these coordinates in the URL
        var lat = data[0].lat
        var long = data[0].lon

        console.log(lat)
        console.log(long)
    })

    // Build the API query URL based on the user input value
    var queryURLcurrent = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + long + "&appid=a5fc6a3bb1ef51f3168ed91a99397fb3" + "&units=metric"
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

    // 5-DAY FORECAST
    // var queryURLforecast = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=a5fc6a3bb1ef51f3168ed91a99397fb3"
    // https://openweathermap.org/forecast5

    // save search term to local storage and display on left
    localStorage.setItem("city", searchInput.val())
    var historyList = $("<li>").text(searchInput.val())
    $("#history").append(historyList)
    //    - Build the API query URL based on the history stored in local storage
//    - Call the API and render the result in the HTML
// 4. When user click on the search history, call weather API and show the result in the HTML
})
