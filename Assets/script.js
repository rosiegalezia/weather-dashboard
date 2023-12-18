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
            // define variables to link to these coordinates in the URL
            var lat = geodata[0].lat
            var long = geodata[0].lon

            // save to local storage so they can be used in different functions
            localStorage.setItem("lat", lat)
            localStorage.setItem("long", long)

        })

    // GET CURRENT WEATHER
    // Build the API query URL based on the user input value
    var queryURLcurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + localStorage.getItem("lat") + "&lon=" + localStorage.getItem("long") + "&appid=a5fc6a3bb1ef51f3168ed91a99397fb3" + "&units=metric"
    console.log(queryURLcurrent)

    fetch(queryURLcurrent)
        .then(function (response) {
            return response.json();
        })
        .then(function (weatherdata) {
            // CURRENT WEATHER
            // clear the currentweather text content from previous search
            $(".current-weather").text("")

            console.log(queryURLcurrent)
            console.log(weatherdata)

            var iconcode = weatherdata.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

            var date = $("<h2>").text(dayjs().format("dddd, D/M/YYYY, HH:mm"))
            var description = $("<h3>").text(weatherdata.weather[0].description)
            var temp = $("<p>").text("Temperature: " + weatherdata.main.temp + " C")
            var feelslike = $("<p>").text("Feels like: " + weatherdata.main.feels_like + " C")
            var wind = $("<p>").text("Wind speed: " + weatherdata.wind.speed + " km/h")
            var humidity = $("<p>").text("Humidity: " + weatherdata.main.humidity + " %")
            var icon = $("<img>").attr('src', iconurl);

            $(".current-weather").append(date)
            $(".current-weather").append(description, icon)
            $(".current-weather").append(temp, feelslike)
            $(".current-weather").append(wind)
            $(".current-weather").append(humidity)
        });

    // GET 5-DAY FORECAST
    // var queryURLforecast = "api.openweathermap.org/data/2.5/forecast?lat=" + localStorage.getItem("lat") + "&lon=" + localStorage.getItem("long") + "&appid=a5fc6a3bb1ef51f3168ed91a99397fb3" + "&units=metric"
    // console.log(localStorage.getItem("lat"))
    // console.log(localStorage.getItem("long"))
    // console.log(queryURLforecast)

    // fetch(queryURLforecast)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (forecastdata) {
    //         console.log(forecastdata)
    //         // var date = $("<h2>").text(dayjs().format("dddd, D/M/YYYY, HH:mm"))
    //         var temp = $("<p>").text("Temperature: " + forecastdata.main.temp + " C")
    //         var wind = $("<p>").text("Wind speed: " + forecastdata.wind.speed + " km/h")
    //         var humidity = $("<p>").text("Humidity: " + forecastdata.main.humidity + " %")
    //         var icon = $("<img>").attr('src', iconurl);

    //         $(".weather-forecast").append(date, icon)
    //         $(".weather-forecast").append(temp)
    //         $(".weather-forecast").append(wind)
    //         $(".weather-forecast").append(humidity)
    //     })

    //       // if there's nothing in the form entered, don't print to the page
    //     if (!searchInput) {
    //     console.log('Please enter a city');
    //     return;
    //   }


    // ---------------------------------------------------------
    // save search term to local storage
    localStorage.setItem("city", searchInput.val())

    //  and display in the 'history' card (if it isn't already there)
    var historyListEl = $("#history")

    historyListEl.append('<li>' + searchInput.val() + '</li>')

    historyListEl.on("click", function (event) {
    // Build the API query URL based on the history stored in local storage
        console.log(event.target)
    
    })

})
