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
})