# weather-dashboard
A weather dashboard created for the week 8 challenge to allow travellers to see the weather forecast in multiple cities.

## Description

This is a weather forecast dashboard created to bring together content learnt in the bootcamp so far (javascript, dayjs, JQuery, APIs) and specifically practice use of server APIs.

The OpenWeatherMap API is used to retrieve and display the current weather, as well as the 5-day forecast, for a location searched for by the user, and saves the last five searches to the local storage for easy retrieval.

Some points to improve when I revisit this project are:
* using the 'timezone' data from OpenWeatherMap together with day.js to display the local time for the location searched for
* displaying the 5-day forecast as separate cards
* displaying the city better in the 'current weather' card
* fixing the display of the 'history' list to cap the list at 5 items, and be contained within the column


## Installation

*Copy the following link: https://github.com/rosiegalezia/weather-dashboard.git

*Open Git Bash

*Change the current working directory to the desired location for the cloned directory using the cd command

*Use the command git clone followed by the url https://github.com/rosiegalezia/weather-dashboard.git and press enter to clone locally

## Usage

The deployed site is available at: https://rosiegalezia.github.io/weather-dashboard/

A screenshot of the site and the local storage can be seen below:

![Weather Dashboard](../weather-dashboard/Assets/Screenshot.png)


## Credits

Help was received from tutors Donnahue George and Mark Utsby.

## License

MIT License

Copyright (c) 2023 rosiegalezia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.