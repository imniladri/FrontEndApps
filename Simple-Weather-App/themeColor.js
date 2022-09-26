// Color Shifter Cookie **********************************************************

let colorBlue = localStorage.getItem("colorBlue");
let colorViolet = localStorage.getItem("colorViolet");
let colorPink = localStorage.getItem("colorPink");
let colorOrange = localStorage.getItem("colorOrange");

// On reload check color in local Storage

// Blue Color
if (colorBlue === "enabled") {
    $(":root").css({
        "--themedark": "var(--bluethemedark)",
        "--themelight": "var(--bluethemelight)",
        "--themeshade1": "var(--bluethemeshade1)",
        "--themeshade2": "var(--bluethemeshade2)",
        "--themeshade3": "var(--bluethemeshade3)",
        "--themeshade4": "var(--bluethemeshade4)",
    });
    localStorage.setItem("colorBlue", "enabled");
}

// Violet Color
if (colorViolet === "enabled") {
    $(":root").css({
        "--themedark": "var(--violetthemedark)",
        "--themelight": "var(--violetthemelight)",
        "--themeshade1": "var(--violetthemeshade1)",
        "--themeshade2": "var(--violetthemeshade2)",
        "--themeshade3": "var(--violetthemeshade3)",
        "--themeshade4": "var(--violetthemeshade4)",
    });
    localStorage.setItem("colorViolet", "enabled");
}

// Pink Color
if (colorPink === "enabled") {
    $(":root").css({
        "--themedark": "var(--pinkthemedark)",
        "--themelight": "var(--pinkthemelight)",
        "--themeshade1": "var(--pinkthemeshade1)",
        "--themeshade2": "var(--pinkthemeshade2)",
        "--themeshade3": "var(--pinkthemeshade3)",
        "--themeshade4": "var(--pinkthemeshade4)",
    });
    localStorage.setItem("colorPink", "enabled");
}

// Orange Color
if (colorOrange === "enabled") {
    $(":root").css({
        "--themedark": "var(--orangethemedark)",
        "--themelight": "var(--orangethemelight)",
        "--themeshade1": "var(--orangethemeshade1)",
        "--themeshade2": "var(--orangethemeshade2)",
        "--themeshade3": "var(--orangethemeshade3)",
        "--themeshade4": "var(--orangethemeshade4)",
    });
    localStorage.setItem("colorOrange", "enabled");
}

// Change color when clicked color shifter

$(".theme_color i.bx").click(function () {
    $(".theme_color").toggleClass("active");
});

// Blue Color
$(".theme_color .color_blue").click(function () {
    let colorBlue = localStorage.getItem("colorBlue");

    if (colorBlue !== "enabled") {
        $(":root").css({
            "--themedark": "var(--bluethemedark)",
            "--themelight": "var(--bluethemelight)",
            "--themeshade1": "var(--bluethemeshade1)",
            "--themeshade2": "var(--bluethemeshade2)",
            "--themeshade3": "var(--bluethemeshade3)",
            "--themeshade4": "var(--bluethemeshade4)",
        });
        localStorage.setItem("colorBlue", "enabled");
        localStorage.setItem("colorViolet", null);
        localStorage.setItem("colorPink", null);
        localStorage.setItem("colorOrange", null);
    }
});

// Violet Color
$(".theme_color .color_violet").click(function () {
    let colorViolet = localStorage.getItem("colorViolet");

    if (colorViolet !== "enabled") {
        $(":root").css({
            "--themedark": "var(--violetthemedark)",
            "--themelight": "var(--violetthemelight)",
            "--themeshade1": "var(--violetthemeshade1)",
            "--themeshade2": "var(--violetthemeshade2)",
            "--themeshade3": "var(--violetthemeshade3)",
            "--themeshade4": "var(--violetthemeshade4)",
        });
        localStorage.setItem("colorBlue", null);
        localStorage.setItem("colorViolet", "enabled");
        localStorage.setItem("colorPink", null);
        localStorage.setItem("colorOrange", null);
    }
});

// Pink Color
$(".theme_color .color_pink").click(function () {
    let colorPink = localStorage.getItem("colorPink");

    if (colorPink !== "enabled") {
        $(":root").css({
            "--themedark": "var(--pinkthemedark)",
            "--themelight": "var(--pinkthemelight)",
            "--themeshade1": "var(--pinkthemeshade1)",
            "--themeshade2": "var(--pinkthemeshade2)",
            "--themeshade3": "var(--pinkthemeshade3)",
            "--themeshade4": "var(--pinkthemeshade4)",
        });
        localStorage.setItem("colorBlue", null);
        localStorage.setItem("colorViolet", null);
        localStorage.setItem("colorPink", "enabled");
        localStorage.setItem("colorOrange", null);
    }
});

// Orange Color
$(".theme_color .color_orange").click(function () {
    let colorOrange = localStorage.getItem("colorOrange");

    if (colorOrange !== "enabled") {
        $(":root").css({
            "--themedark": "var(--orangethemedark)",
            "--themelight": "var(--orangethemelight)",
            "--themeshade1": "var(--orangethemeshade1)",
            "--themeshade2": "var(--orangethemeshade2)",
            "--themeshade3": "var(--orangethemeshade3)",
            "--themeshade4": "var(--orangethemeshade4)",
        });
        localStorage.setItem("colorBlue", null);
        localStorage.setItem("colorViolet", null);
        localStorage.setItem("colorPink", null);
        localStorage.setItem("colorOrange", "enabled");
    }
});
