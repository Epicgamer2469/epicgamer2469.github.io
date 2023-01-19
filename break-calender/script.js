var today = new Date();
addWeekends();
updateText();

setInterval(updateText, 1000);

function updateText() {
    today = new Date();
    document.getElementById("date").innerText = formatDate(today);
    document.getElementById("time").innerText = formatTime(today);
    var time;
    var currentBreak = getCurrentBreak(today);

    if (currentBreak) {
        time = getTimeUntilOffBreak(today);
        changeVisibilityOfClass("off-break", "none");
        changeVisibilityOfClass("on-break", "block");

        document.getElementById("date-back").innerText = `(${currentBreak.getEnd().toLocaleDateString()})`;
    } else {
        time = getTimeUntilNextBreak(today);
        changeVisibilityOfClass("off-break", "block");
        changeVisibilityOfClass("on-break", "none");

        var breakDays = getBreakDays();
        document.getElementById("length").innerText = getDaysBetween(breakDays[0], breakDays[1]);
        document.getElementById("break-dates").innerText = `(from ${breakDays[0].toLocaleDateString()} to ${breakDays[1].toLocaleDateString()})`;
    }

    document.getElementById("days-data").innerText = Math.floor(time / (1000 * 60 * 60 * 24));
    document.getElementById("hours-data").innerText = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("minutes-data").innerText = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
}

var darkMode = localStorage.getItem("darkMode") ? localStorage.getItem("darkMode") : "false";

setDarkMode(true);

function setDarkMode(override) {
    var root = document.querySelector(':root');
    var elements = document.getElementsByTagName("*");

    if (!override) {
        darkMode = darkMode == "true" ? "false" : "true";
        localStorage.setItem("darkMode", darkMode);
    } else {
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add('notransition'); // Disable transitions
        }
    }


    if (darkMode == "true") {
        root.style.setProperty('--bg-color', '#262626');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--button-color', 'rgb(118, 121, 167)');
        root.style.setProperty('--button-hover-color', '#ffffff');
        root.style.setProperty('--text-accent-color', "#408de6");
        root.style.setProperty('--hr-color', "#9d9ea5");
    } else {
        root.style.setProperty('--bg-color', '#ffffff');
        root.style.setProperty('--text-color', 'rgb(56, 56, 59)');
        root.style.setProperty('--button-color', 'rgb(39, 40, 65');
        root.style.setProperty('--button-hover-color', 'rgb(118, 121, 167)');
        root.style.setProperty('--text-accent-color', "#1e5a9e");
        root.style.setProperty('--hr-color', "rgb(220, 221, 226)");
    }

    if (override) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].offsetHeight; // Trigger a reflow, flushing the CSS changes
            elements[i].classList.remove('notransition'); // Re-enable transitions
        }
    }
}