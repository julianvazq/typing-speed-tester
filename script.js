const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");


// Add leading zero to numbers 9 or below (purely for aesthetics):


// Run a standard minute/second/hundredths timer:


// Match the text entered with the provided text on the page:
function checkSpelling() {
    let textEntered = testArea.value;
    console.log(textEntered);
}

// Start the timer:
function start() {
    let textAreaLength = testArea.value.length;
    
}


// Reset everything:
function reset() {
    
}


// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", checkSpelling, false);
resetButton.addEventListener("click", reset, false);