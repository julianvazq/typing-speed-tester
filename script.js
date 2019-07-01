//Tpying calculations obtained from: http://indiatyping.com/index.php/typing-tips/typing-speed-calculation-formula

//Typing Speed Test
const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
let oriText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const errorDisplay = document.querySelector(".errors span");
const accDisplay = document.querySelector(".accuracy span");
const wpmDisplay = document.querySelector(".wpm span");
const leftArrow = document.querySelector(".text-selector .left");
const rightArrow = document.querySelector(".text-selector .right");

const texts = ["Following with his keen eyes the trail to the river, and then the river back towards the forest, Aragorn saw a shadow on the distant green, a dark swift-moving blur. He cast himself upon the ground and listened again intently. But Legolas stood beside him, shading his bright elven-eyes with his long slender hand, and he saw not a shadow, nor a blur, but the small figures of horsemen, many horsemen, and the glint of morning on the tips of their spears was like the twinkle of minute stars beyond the edge of mortal sight. Far behind them a dark smoke rose in thin curling threads.",
                "This is only a small selection of the assembled presents. Bilbo's residence had got rather cluttered up with things in the course of his long life. It was a tendency of hobbit-holes to get cluttered up: for which the custom of giving so many birthday- presents was largely responsible. Not, of course, that the birthday- presents were always new; there were one or two old mathoms of forgotten uses that had circulated all around the district; but Bilbo had usually given new presents, and kept those that he received. The old hole was now being cleared a little.",
                "And all the host laughed and wept, and in the midst of their merriment and tears the clear voice of the minstrel rose like silver and gold, and all men were hushed. And he sang to them, now in the Elven-tongue, now in the speech of the West, until their hearts, wounded with sweet words, overflowed, and their joy was like swords, and they passed in thought out to regions where pain and delight flow together and tears are the very wine of blessedness.",
                "Bilbo was very rich and very peculiar, and had been the wonder of the Shire for sixty years, ever since his remarkable disappearance and unexpected return. The riches he had brought back from his travels had now become a local legend, and it was popularly believed, whatever the old folk might say, that the Hill at Bag End was full of tunnels stuffed with treasure. And if that was not enough for fame, there was also his prolonged vigour to marvel at.",
                "When every guest had been welcomed and was finally inside the gate, there were songs, dances, music, games, and, of course, food and drink. There were three official meals: lunch, tea, and dinner (or supper). But lunch and tea were marked chiefly by the fact that at those times all the guests were sitting down and eating together. At other times there were merely lots of people eating and drinking — continuously from elevenses until six-thirty, when the fireworks started.",
                "Out of the wreck rose the Black Rider, tall and threatening, towering above her. With a cry of hatred that stung the very ears like venom he let fall his mace. Her shield was shivered in many pieces, and her arm was broken; she stumbled to her knees. He bent over her like a cloud, and his eyes glittered; he raised his mace to kill. But suddenly he too stumbled forward with a cry of bitter pain, and his stroke went wide, driving into the ground. "]
var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var errors = 0;
var correctChar = 0;
var typedEntry = 0;
var wpm = 0;
var pause = false;
var rand = Math.floor(Math.random()*texts.length);

function selectLeft() {
    if (rand == 0) {
        rand = texts.length-1;
    } else {
    rand--;
    }
    oriText.innerHTML = texts[rand];
}

function selectRight() {
    if (rand == texts.length-1) {
        rand = 0;
    } else {
    rand++;
    }
    oriText.innerHTML = texts[rand];
}



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
    let oriTextMatch = oriText.innerHTML.substring(0, textEntered.length);

    if (textEntered == oriText.innerHTML) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#2fe73f";
    } else {
        if (textEntered == oriTextMatch) {
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
leftArrow.addEventListener("click", selectLeft, false);
rightArrow.addEventListener("click", selectRight, false);
window.addEventListener('load', function (e) {
    oriText.innerHTML = texts[rand];
  })

