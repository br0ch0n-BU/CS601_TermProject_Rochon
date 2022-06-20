// calc.js
// Logic for the calculator. Uses https://mathjs.org/

const calcDisplay = document.getElementById("disp");
const calcKeypad = document.getElementById("keypad");

// Catch bad input exceptions
function doMath(equation) {
  try {
    return math.evaluate(equation);
  } catch (error) {
    console.error("Invalid calculator input: " + error);
    return "ERROR";
  }
}

// Listen for keypad events so as to use the calc buttons
calcKeypad.addEventListener(
  "click",
  function (e) {
    // Only care about button clicks, not other elements
    if (e.target.nodeName !== "BUTTON") return;
    // Process the special buttons
    switch (e.target.id) {
      case "timesButton":
        calcDisplay.value += "*";
        break;
      case "divideButton":
        calcDisplay.value += "/";
        break;
      case "clearButton":
        calcDisplay.value = "";
        break;
      case "equalsButton":
        calcDisplay.value = doMath(calcDisplay.value);
        break;
      // Otherwise treat the buttons as labeled
      default:
        calcDisplay.value += e.target.textContent;
    }
  },
  false
);

// Listen for keyboard events also so that we can use the Enter and Esc keys
// intuitively if typing input directly
calcDisplay.addEventListener(
  "keyup",
  function (e) {
    switch (e.key) {
      case "Escape":
        calcDisplay.value = "";
        break;
      case "Enter":
        calcDisplay.value = doMath(calcDisplay.value);
        break;
    }
  },
  false
);
