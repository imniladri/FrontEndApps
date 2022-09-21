// Loader Event *************************

$(window).on("load", () => {
    setTimeout(() => {
        $("#preloader").css({
            clipPath: "circle(0% at 50% 0%)",
        });
    }, 1500);
});

// All constant variable declaration *************************

const containerBox = document.querySelector(".container"),
    displayPart = document.querySelector(".container .display_part"),
    infoText = document.querySelector(".display_part .info_text"),
    inputField = document.querySelector(".display_part .input_field input"),
    searchBtn = document.querySelector(".display_part .input_field .searchBtn"),
    locationBtn = document.querySelector(
        ".display_part .input_field .locationBtn"
    ),
    weatherIcon = document.querySelector(".weather_part .weather_icon"),
    goBack = document.querySelector(".header a.back"),
    dateOutput = document.querySelector(".weather_part .date_time .date"),
    timeOutput = document.querySelector(".weather_part .date_time .time");

// Function for getting the current date and time *************************

function addzero(num) {
    return num < 10 ? `0${num}` : num;
}

let api;

// Check weather by clicking on search button *************************

searchBtn.addEventListener("click", () => {
    // For Date & Time Selection
    let today = new Date();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let date = today.getDate();
    let current_date = `${date}/${month}/${year}`;
    dateOutput.innerText = current_date;

    let hours = addzero(today.getHours());
    let minutes = addzero(today.getMinutes());
    let current_time = `${hours}:${minutes} (IST)`;
    timeOutput.innerText = current_time;

    // For Weather Details
    if (inputField.value != "") {
        // console.log("Hello");
        requestApi(inputField.value);
    }
});

// Check weather by clicking on location button *************************

locationBtn.addEventListener("click", () => {
    // For Date & Time Selection
    let today = new Date();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let date = today.getDate();
    let current_date = `${month}/${date}/${year}`;
    dateOutput.innerText = current_date;

    let hours = addzero(today.getHours());
    let minutes = addzero(today.getMinutes());
    let current_time = `${hours}:${minutes} (IST)`;
    timeOutput.innerText = current_time;

    // For Weather Details
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your Browser does not support Geolocation API");
    }
});

// Function for getting the weather details *************************

function onSuccess(position) {
    // console.log(position);
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=0546970edd2b1d3d3db59e3c555027e6`;
    fetchdata();
}

// Function for showing any error *************************

function onError(error) {
    // console.log(error);
    infoText.innerText = error.message;
    infoText.classList.add("error");
}

// Sending request to the api for weather data of the input location *************************

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0546970edd2b1d3d3db59e3c555027e6`;
    fetchdata();
}

// Fetching data from request *************************

function fetchdata() {
    infoText.innerText = "Getting Weather Details...";
    infoText.classList.add("pending");
    fetch(api)
        .then((response) => response.json())
        .then((result) => weatherDetails(result));
}

// Function for showing the weather details *************************

function weatherDetails(info) {
    infoText.classList.replace("pending", "error");
    if (info.cod == "404") {
        infoText.innerHTML = `<span>${inputField.value}</span> is not a valid city name`;
    } else {
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { feels_like, humidity, temp } = info.main;

        // Importing data from API for the UI

        containerBox.querySelector(
            ".weather_part .temperature h2.number"
        ).innerHTML = `${temp}<span class="unit">°C</span>`;

        containerBox.querySelector(
            ".weather_part .temperature p.weather"
        ).innerText = description;

        containerBox.querySelector(
            ".weather_part .temperature .location h4.city"
        ).innerText = `${city}, ${country}`;

        containerBox.querySelector(
            ".weather_part .condition .feels h4.number"
        ).innerHTML = `${feels_like}<span class="unit">°C</span>`;

        containerBox.querySelector(
            ".weather_part .condition .humidity h4.number"
        ).innerHTML = `${humidity}<span class="unit">%</span>`;

        // Weather Icon according to the weather condition

        if (id == 800) {
            weatherIcon.src = "./icons/clear.svg";
        } else if (id == 781 || id == 761) {
            weatherIcon.src = "./icons/tornado.svg";
        } else if (id == 741 || id == 701) {
            weatherIcon.src = "./icons/fog.svg";
        } else if (id >= 200 && id <= 232) {
            weatherIcon.src = "./icons/storm.svg";
        } else if (id >= 300 && id <= 321) {
            weatherIcon.src = "./icons/rain.svg";
        } else if (id >= 500 && id <= 531) {
            weatherIcon.src = "./icons/rain.svg";
        } else if (id >= 600 && id <= 622) {
            weatherIcon.src = "./icons/snow.svg";
        } else if (id >= 701 && id <= 781) {
            weatherIcon.src = "./icons/haze.svg";
        } else if (id >= 801 && id <= 804) {
            weatherIcon.src = "./icons/cloud.svg";
        }

        infoText.classList.remove("pending", "error");
        containerBox.classList.add("active");
    }
}

// Back To Homepage

goBack.addEventListener("click", () => {
    containerBox.classList.remove("active");
});
