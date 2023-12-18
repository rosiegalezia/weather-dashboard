// API key: a5fc6a3bb1ef51f3168ed91a99397fb3

const search = $("#search-form") // variable for form input
const searchInput = $(".weather-search") // variable to access search term

// Add event listener to form submit
search.on("submit", function (event) {
    event.preventDefault()
    console.log(searchInput.val())
    console.log("hello")

    // Get the coordinates for the location
    // using geocoding API to get lat and long
    // var geocodeURL: http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=a5fc6a3bb1ef51f3168ed91a99397fb3
    // Variables to link to these coordinates in the URL

    // Build the API query URL based on the user input value
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.val() + ",uk&appid=a5fc6a3bb1ef51f3168ed91a99397fb3" + "&units=metric"
    console.log(queryURL)

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // clear the currentweather text content from previous search
            $(".current-weather").text("")

            console.log(queryURL)
            console.log(data)

            var iconcode = data.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

            var date = $("<p>").text(dayjs().format("dddd, D/M/YYYY, HH:mm"))
            var temp = $("<p>").text("Temperature: " + data.main.temp + " C")
            var wind = $("<p>").text("Wind speed: " + data.wind.speed + " km/h")
            var humidity = $("<p>").text("Humidity: " + data.main.humidity + " %")
            var icon = $("<img>").attr('src', iconurl);

            $(".current-weather").append(date)
            $(".current-weather").append(temp)
            $(".current-weather").append(wind)
            $(".current-weather").append(humidity)
            $(".current-weather").append(icon)
        });

    // 5-DAY FORECAST REQUIRES A DIFFERENT API
    // https://openweathermap.org/forecast5

    // save search term to local storage and display on left
    localStorage.setItem("city", searchInput.val())
    var historyList = $("<li>").text(searchInput.val())
    $("#history").append(historyList)
})
