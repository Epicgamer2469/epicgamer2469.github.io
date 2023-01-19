class Break {
    constructor(start, description, end) {
        this.start = start;
        this.description = description;
        this.end = end;

        this.start.setHours(0, 0, 0, 0);
        if(this.end) {
            this.end.setHours(23, 59, 59, 999);
        }

    }

    getEnd() {
        var pseudoEnd = new Date(this.start.setHours(23, 59, 59, 999));
        this.start.setHours(0, 0, 0, 0);
        return this.end ? this.end : pseudoEnd;
    }
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const breaks = [
    new Break(new Date(2023, 0, 16), "a School Holiday"),
    new Break(new Date(2023, 1, 16), "a Bad Weather Make-Up Day"),
    new Break(new Date(2023, 1, 20), "a Student Holiday"),
    new Break(new Date(2023, 2, 6), "Spring Break", new Date(2023, 2, 10)),
    new Break(new Date(2023, 3, 7), "a School Holiday"),
    new Break(new Date(2023, 3, 10), "a Bad Weather Make-Up Day"),
    new Break(new Date(2023, 3, 28), "a Student Holiday")
];
const lastDay = new Date(2023, 4, 24);

function changeVisibilityOfClass(className, visibility) {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = visibility;
    }
}

function getCurrentBreak(date) {
    for(var i = 0; i < breaks.length; i++) {
        var b = breaks[i];
        if(date >= b.start && date <= b.getEnd()) {
            return b;
        }
    }
    return null;
}

function getTimeUntilOffBreak(date) {
    var currentBreak = getCurrentBreak(date);
    var timeUntilOffBreak = currentBreak.getEnd().getTime() - date.getTime();
    return timeUntilOffBreak;
}

function getBreakDays() {
    var nextBreak = getNextBreak(today);
    var start = nextBreak.start;
    var end = nextBreak.getEnd();

    for(var i = 0; i < breaks.length; i++) {
        var b = breaks[i]; // Select the break in loop
        var nextDay = new Date(end); // Create a new date object with the end date of the current ending date
        nextDay.setDate(nextDay.getDate() + 1); // Add one day to the end date
        nextDay.setHours(0, 0, 0, 0); // Set the time to the start of day
        if(b.start.getTime() == nextDay.getTime()) { // check if the start of the next break is the next day
            end = b.getEnd();
        }
    }

    return [start, end];
}

function getDaysBetween(start, end) {
    var time = end.getTime() - start.getTime();
    return Math.ceil(time / (1000 * 60 * 60 * 24));
}

function getNextBreak(date) {
    var nextBreak = null;
    for (var i = 0; i < breaks.length; i++) {
        var b = breaks[i];
        if (date < b.start) {
            nextBreak = b;
            break;
        }
    }
    return nextBreak;
}

function getTimeUntilNextBreak(date) {
    var nextBreak = getNextBreak(date);
    var timeUntilNextBreak = nextBreak.start.getTime() - date.getTime();
    return timeUntilNextBreak;
}

function addWeekends() {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    
    while (date < lastDay) {
        if (date.getDay() == 6) {
            var start = new Date(date);
            start.setHours(0, 0, 0, 0);
            var end = new Date(date);
            end.setDate(end.getDate() + 1);
            end.setHours(23);
            end.setMinutes(59);
            //insert into breaks at a sorted position
            var i = 0;
            for (i = 0; i < breaks.length; i++) {
                if (start < breaks[i].start) {
                    break;
                }
            }
            breaks.splice(i, 0, new Break(start, "a Weekend", end));
        }
        date.setDate(date.getDate() + 1);
    }
}

function getNextBreak(date) {
    var nextBreak = null;
    for (var i = 0; i < breaks.length; i++) {
        var b = breaks[i];
        if (date < b.start) {
            nextBreak = b;
            break;
        }
    }
    return nextBreak;
}

function formatDate(date) {
    return days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();
}

function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
}