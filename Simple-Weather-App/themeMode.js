// Mode Shifter Cookie **********************************************************

let modeDark = localStorage.getItem("modeDark");

// On reload check dark theme mode in local Storage

if (modeDark === "enabled") {
    $(":root").css({
        "--bgblack": "#ffffff",
        "--bgwhite": "#222028",
        "--bgoffblack": "#f7fafc",
        "--bgoffwhite": "#26242e",
        "--bgdullwhite": "#2c2f35",
        "--bggrey": "#807c99",

        "--textblack": "#ffffff",
        "--textoffblack": "#f7fafc",

        "--blackbgshade": "rgba(0, 0, 0, 0.4)",
        "--blacktextshade": "rgba(0, 0, 0, 0.5)",
        "--redbgshade": "rgba(214, 1, 43, 0.2)",
        "--redtextshade": "rgba(232, 1, 47, 1)",
        "--yellowbgshade": "rgba(174, 145, 0, 0.2)",
        "--yellowtextshade": "rgba(241, 201, 0, 1)",
        "--greenbgshade": "rgba(1, 204, 123, 0.2)",
        "--greentextshade": "rgba(4, 236, 139, 1)",
    });
    $(".theme_mode").addClass("dark");
    $(".theme_color").addClass("dark");
    localStorage.setItem("modeDark", "enabled");
}

// Change dark theme mode when clicked mode shifter

$(".theme_mode").click(function () {
    let modeDark = localStorage.getItem("modeDark");

    if (modeDark !== "enabled") {
        $(":root").css({
            "--bgblack": "#ffffff",
            "--bgwhite": "#222028",
            "--bgoffblack": "#f7fafc",
            "--bgoffwhite": "#26242e",
            "--bgdullwhite": "#2c2f35",
            "--bggrey": "#807c99",

            "--textblack": "#ffffff",
            "--textoffblack": "#f7fafc",

            "--blackbgshade": "rgba(0, 0, 0, 0.4)",
            "--blacktextshade": "rgba(0, 0, 0, 0.5)",
            "--redbgshade": "rgba(214, 1, 43, 0.2)",
            "--redtextshade": "rgba(232, 1, 47, 1)",
            "--yellowbgshade": "rgba(174, 145, 0, 0.2)",
            "--yellowtextshade": "rgba(241, 201, 0, 1)",
            "--greenbgshade": "rgba(1, 204, 123, 0.2)",
            "--greentextshade": "rgba(4, 236, 139, 1)",
        });
        $(".theme_mode").addClass("dark");
        $(".theme_color").addClass("dark");
        localStorage.setItem("modeDark", "enabled");
        // localStorage.setItem("modeLight", null);
    } else {
        $(":root").css({
            "--bgblack": "#111a2b",
            "--bgwhite": "#ffffff",
            "--bgoffblack": "#3a3845",
            "--bgoffwhite": "#f7fafc",
            "--bgdullwhite": "#e5e9ff",
            "--bggrey": "#bfc9d1",

            "--textblack": "#111a2b",
            "--textoffblack": "#3a3845",

            "--blackbgshade": "rgba(0, 0, 0, 0.1)",
            "--blacktextshade": "rgba(0, 0, 0, 0.15)",
            "--redbgshade": "rgba(255, 0, 51, 0.2)",
            "--redtextshade": "rgba(175, 0, 35, 1)",
            "--yellowbgshade": "rgba(235, 196, 1, 0.2)",
            "--yellowtextshade": "rgba(138, 115, 0, 1)",
            "--greenbgshade": "rgba(4, 194, 127, 0.2)",
            "--greentextshade": "rgba(0, 164, 107, 1)",
        });
        $(".theme_mode").removeClass("dark");
        $(".theme_color").removeClass("dark");
        localStorage.setItem("modeDark", null);
        // localStorage.setItem("modeLight", "enabled");
    }
});
