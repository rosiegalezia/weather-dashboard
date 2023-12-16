// API key: a5fc6a3bb1ef51f3168ed91a99397fb3


// Access user's search input
// const search = $(".weather-search").val()

const search = $(".weather-search")
const searchInput = $(".weather-search input")



search.on("submit", function (event) {
    event.preventDefault()
    const cityName = searchInput.val()

    // Get the coordinates for the location
    // using geocoding API to get lat and long
    // var geocodeURL: http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=a5fc6a3bb1ef51f3168ed91a99397fb3
    // Variables to link to these coordinates in the URL

    // // queryURL: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}.
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",uk&appid=a5fc6a3bb1ef51f3168ed91a99397fb3" + "&units=metric"
    console.log(queryURL)


    // We then created an Fetch call
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(queryURL)

            console.log(data)

            city.text("City name: " + data.name)
            wind.text("Wind: " + data.wind.speed)
            humidity.text("Humidity: " + data.main.humidity)
            temp.text("Temperature: " + data.main.temp + " C")
        });
        $(".current-weather").append(data)
})

// When a user searches for a city they are presented with current and future conditions for that city
// that city is added to the search history

// When a user views the current weather conditions for that city they are presented with:
// The city name
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// The wind speed

// When a user view future weather conditions get a 5-day forecast that displays:
// The date
// An icon representation of weather conditions
// The temperature
// The humidity

// When a user clicks on a city in the search history
// they are again presented with current and future conditions for that city