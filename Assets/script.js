// API key: a5fc6a3bb1ef51f3168ed91a99397fb3

// Access user's search input
// const search = $(".weather-search").val()


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

    // Call the API and render the result in the HTML
    //        - Get the city name and show it in the main weather forecast card
    //        - Get the first weather forecast item and get the following values
    //            - date
    //            - temperature
    //            - wind speed
    //            - humidity
    //            - icon

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(queryURL)

            console.log(data)

            var date = $("<p>").text(dayjs().format("dddd, D/M/YYYY, HH:mm"))
            var temp = $("<p>").text("Temperature: " + data.main.temp + " C")
            var wind = $("<p>").text("Wind speed: " + data.wind.speed + " km/h")
            var humidity = $("<p>").text("Humidity: " + data.main.humidity + " %")
            // icon

            $(".current-weather").append(date) 
            $(".current-weather").append(temp)
            $(".current-weather").append(wind)
            $(".current-weather").append(humidity)
        });



})
