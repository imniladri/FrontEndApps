// Loader Event *************************

$(window).on("load", () => {
    setTimeout(() => {
        $("#preloader").css({
            clipPath: "circle(0% at 50% 0%)",
        });
    }, 1500);
});

// Change Img Src for devices ****************

$(window).ready(function () {
    if ($(this).width() < 768) {
        $(".bannerContent .display_part .input_field img.device").attr(
            "src",
            "./img/device_mobile.svg"
        );
    } else {
        $(".bannerContent .display_part .input_field img.device").attr(
            "src",
            "./img/device_desktop.svg"
        );
    }
});

$(window).resize(function () {
    if ($(this).width() < 768) {
        $(".bannerContent .display_part .input_field img.device").attr(
            "src",
            "./img/device_mobile.svg"
        );
    } else {
        $(".bannerContent .display_part .input_field img.device").attr(
            "src",
            "./img/device_desktop.svg"
        );
    }
});

// All constant variable declaration *************************

const bannerBox = document.querySelector(".bannerContent"),
    displayPart = document.querySelector(".bannerContent .display_part"),
    infoText = document.querySelector(".display_part .info_text"),
    inputField = document.querySelector(".display_part .input_field input"),
    searchBtn = document.querySelector(".display_part .input_field .searchBtn"),
    locationBtn = document.querySelector(
        ".display_part .input_field .locationBtn"
    ),
    weatherIcon = document.querySelector(".weather_part .weather_icon"),
    goBack = document.querySelector(".header a.back"),
    dateOutput = document.querySelector(".weather_part .date_time .date h4"),
    timeOutput = document.querySelector(".weather_part .date_time .time h4");

// Api declaration for getting the current date and time *************************

let api;
let apiDataUpdate;

// Check weather details by clicking on search button *************************

searchBtn.addEventListener("click", () => {
    if (inputField.value != "") {
        requestApi(inputField.value);
    } else if (inputField.value == "") {
        infoText.innerText = "Please enter a city name.";
        infoText.classList.add("error") ||
            infoText.classList.replace("success", "error") ||
            infoText.classList.replace("pending", "error");
    }

    apiDataUpdate = setInterval(() => {
        if (inputField.value != "") {
            requestApi(inputField.value);
        }
    }, 1000);
});

// Check weather details by clicking on location button *************************

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        // alert("Your Browser does not support Geolocation API");
        infoText.innerText = "Your Browser does not support Geolocation API";
        infoText.classList.add("error");
    }

    apiDataUpdate = setInterval(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
    }, 1000);
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
    infoText.classList.replace("success", "pending") ||
        infoText.classList.replace("error", "pending");
    fetch(api)
        .then((response) => response.json())
        .then((result) => weatherDetails(result));
}

// Function for showing the weather details *************************

function weatherDetails(info) {
    if (info.cod == "404") {
        infoText.classList.replace("pending", "error");
        infoText.innerHTML = `<span>${inputField.value}</span> is not a valid city name.`;
    } else {
        infoText.classList.replace("pending", "success");
        infoText.innerText = "Weather Details Fetched Successfully!";

        // Get different timezone time and date from Api *************************
        const getDateTime = new Date(
            new Date().getTime() + info.timezone * 1000
        );

        // console.log(info);
        // console.log(getDateTime);

        // For UTC Date Selection
        let month = getDateTime.getUTCMonth() + 1;
        let year = getDateTime.getUTCFullYear();
        let date = getDateTime.getUTCDate();
        let current_date = `${date}/${month}/${year}`;
        dateOutput.innerText = current_date;

        // For UTC Time Selection
        let hours =
            getDateTime.getUTCHours() < 10
                ? `0${getDateTime.getUTCHours()}`
                : getDateTime.getUTCHours();
        let minutes =
            getDateTime.getUTCMinutes() < 10
                ? `0${getDateTime.getUTCMinutes()}`
                : getDateTime.getUTCMinutes();
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        let current_time = `${hours}:${minutes} ${ampm} (UTC)`;
        timeOutput.innerText = current_time;

        // For place and other weather details selection

        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { feels_like, humidity, temp } = info.main;
        const { speed, deg } = info.wind;

        // Importing data from API for the UI

        bannerBox.querySelector(
            ".weather_part .temperature h2.number"
        ).innerHTML = `${temp}<span class="unit">°C</span>`;

        bannerBox.querySelector(
            ".weather_part .temperature p.weather"
        ).innerText = description;

        bannerBox.querySelector(
            ".weather_part .temperature .location h4.city"
        ).innerText = `${city}, ${country}`;

        bannerBox.querySelector(
            ".weather_part .condition .feels h4.number"
        ).innerHTML = `${feels_like}<span class="unit">°C</span>`;

        bannerBox.querySelector(
            ".weather_part .condition .humidity h4.number"
        ).innerHTML = `${humidity}<span class="unit">%</span>`;

        bannerBox.querySelector(
            ".weather_part .wind .speed h4.number"
        ).innerHTML = `${speed}<span class="unit">m/s</span>`;

        bannerBox.querySelector(
            ".weather_part .wind .direction h4.number"
        ).innerHTML = `${windDirection(deg)}<span class="unit">°</span>`;

        if (feels_like < 26) {
            $(".bannerContent .weather_part .condition .feels img").attr({
                src: "./img/temp_low.svg",
            });
        } else {
            $(".bannerContent .weather_part .condition .feels img").attr({
                src: "./img/temp_high.svg",
            });
        }

        // Get wind direction from degree

        function windDirection(deg) {
            if (deg > 11.25 && deg < 56.25) return "North Easterly";
            if (deg > 56.25 && deg < 101.25) return "Easterly";
            if (deg > 101.25 && deg < 146.25) return "South Easterly";
            if (deg > 146.25 && deg < 191.25) return "Southerly";
            if (deg > 191.25 && deg < 236.25) return "South Westerly";
            if (deg > 236.25 && deg < 281.25) return "Westerly";
            if (deg > 281.25 && deg < 326.25) return "North Westerly";
            return "Northerly";
        }

        // Weather Icon according to the weather condition

        if (getDateTime.getUTCHours() >= 5 && getDateTime.getUTCHours() < 18) {
            if (id == 800) {
                weatherIcon.src = "./icons/clear_day.svg";
            } else if (id == 781 || id == 761) {
                weatherIcon.src = "./icons/tornado.svg";
            } else if (id == 741 || id == 701) {
                weatherIcon.src = "./icons/fog.svg";
            } else if (id >= 200 && id <= 232) {
                weatherIcon.src = "./icons/storm_day.svg";
            } else if (id >= 300 && id <= 321) {
                weatherIcon.src = "./icons/rain_day.svg";
            } else if (id >= 500 && id <= 531) {
                weatherIcon.src = "./icons/rain_day.svg";
            } else if (id >= 600 && id <= 622) {
                weatherIcon.src = "./icons/snow_day.svg";
            } else if (id >= 701 && id <= 781) {
                weatherIcon.src = "./icons/haze_day.svg";
            } else if (id >= 801 && id <= 804) {
                weatherIcon.src = "./icons/cloud_day.svg";
            }
        } else {
            if (id == 800) {
                weatherIcon.src = "./icons/clear_night.svg";
            } else if (id == 781 || id == 761) {
                weatherIcon.src = "./icons/tornado.svg";
            } else if (id == 741 || id == 701) {
                weatherIcon.src = "./icons/fog.svg";
            } else if (id >= 200 && id <= 232) {
                weatherIcon.src = "./icons/storm_night.svg";
            } else if (id >= 300 && id <= 321) {
                weatherIcon.src = "./icons/rain_night.svg";
            } else if (id >= 500 && id <= 531) {
                weatherIcon.src = "./icons/rain_night.svg";
            } else if (id >= 600 && id <= 622) {
                weatherIcon.src = "./icons/snow_night.svg";
            } else if (id >= 701 && id <= 781) {
                weatherIcon.src = "./icons/haze_night.svg";
            } else if (id >= 801 && id <= 804) {
                weatherIcon.src = "./icons/cloud_night.svg";
            }
        }

        // infoText.classList.remove("pending", "error", "success");
        bannerBox.classList.add("active");
    }
}

// Back To Homepage

goBack.addEventListener("click", () => {
    bannerBox.classList.remove("active");
    clearInterval(apiDataUpdate);
});
