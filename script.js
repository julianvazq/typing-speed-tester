//Tpying calculations obtained from: http://indiatyping.com/index.php/typing-tips/typing-speed-calculation-formula

//Typing Speed Test
const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const errorDisplay = document.querySelector(".errors span");
const accDisplay = document.querySelector(".accuracy span");
const wpmDisplay = document.querySelector(".wpm span");

var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var errors = 0;
var correctChar = 0;
var typedEntry = 0;
var wpm = 0;
var pause = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor(timer[3]/100/60);
    timer[1] = Math.floor(timer[3]/100 - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - timer[0] * 6000);
}

// Match the text entered with the provided text on the page:
function checkSpelling(e) {

    var key = e.keyCode; 

    if (!(key >= 48 && key <= 90) && !(key >= 96 && key <= 111) && !(key >= 186 && key <= 222) && key != 32 && key!= 8) {
        return;
    }

    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#2fe73f";
    } else {
        if (textEntered == originTextMatch) {
            pause = false;       //Unpause spell checking when error is errased and text matches again
            testWrapper.style.borderColor = "#7EB2E6";
           performanceChecks(textEntered);
        }
        else {
            if (!pause) {        //Pause spell checking after first character mistake
                pause = true;
                checkError();
            }
            testWrapper.style.borderColor = "#be1111";
        }
    }

    typedEntry++;
}

    function performanceChecks(textEntered) {

    // Gross WPM 
    if (timer[0] < 1) {
        grossWmp = ((typedEntry/5) / (timer[1] / 60));
    } else {
        grossWmp = (typedEntry/5) / timer[0];
    }

    // Net WMP
    netWmp = grossWmp - errors;
    wpmDisplay.innerHTML = Math.floor(netWmp);
    if (netWmp > 60) {
        wpmDisplay.style.color = "green";
    } else if (netWmp > 40 && netWmp < 60) {
        wpmDisplay.style.color = "rgb(202, 202, 0)";
    } else {
        wpmDisplay.style.color = "red";
    }

    // Accuracy 
    acc = (netWmp / grossWmp) * 100;
    accDisplay.innerHTML = acc.toFixed(2) + "%";
    if (acc > 90) {
        accDisplay.style.color = "green";
    } else if (acc > 70 && acc < 90) {
        accDisplay.style.color = "rgb(202, 202, 0)";
    } else {
        accDisplay.style.color = "red";
    }

}

// Count errors and change color accordingly
function checkError() {
    pause = true;
    errors++;
    errorDisplay.innerHTML = errors;

    if (errors > 0 && errors < 6) {
        errorDisplay.style.color = "green";
    } else if (errors > 5 && errors < 16) {
        errorDisplay.style.color = "rgb(202, 202, 0)";
    } else {
        errorDisplay.style.color = "red";
    }
}

// Start the timer:
function start() {
    let textAreaLength = testArea.value.length;
    if (textAreaLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;
    errors = 0;
    correctChar = 0;

    // Graphic reset
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    errorDisplay.innerHTML = "0";
    errorDisplay.style.color = "white";
    accDisplay.innerHTML = "X%";
    accDisplay.style.color = "white";
    wpmDisplay.innerHTML = "0";
    wpmDisplay.style.color = "white";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", checkSpelling, false);
resetButton.addEventListener("click", reset, false);

