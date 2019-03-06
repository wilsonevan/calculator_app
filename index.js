
var buttons = document.getElementsByTagName('button');

var number1or2 = 1;
var num = "";
var num1 = "";
var num2 = "";
var mathAction = "";
var errorNum = 0;

initialize()

function initialize() {
  for ( i = 0; i < buttons.length; i++ ){
    buttons[i].addEventListener( 'click' , handleButton )
    
  }
}


function handleButton() {
  // Reset Necessary Elements
  document.getElementById("output").style.fontSize = "200%";

  // if num1
  // keep concatinating numbers
  if (number1or2 == 1 && isNaN(this.innerText) == false ) {
    
    num = num.concat(this.innerText); // 
    displayOutput(num) // update output
  }

  // if num2 
  // keep concatinating numbers
  if (number1or2 == 2 && isNaN(this.innerText) == false ) {
    num = num.concat(this.innerText); // 
    displayOutput(num) // update output
  }
  
  // if Math Action
  // stop concatinating, store math action
  if (this.className == "btn-action") {
    mathAction = this.innerText;
    number1or2 = 2;
    num1 = num; // stores num1 for later user in final calculation
    num = "";
  }

  // if Math Function
  // stop concatinating, perform float calculation
  if (this.className == "btn-function") {
    if (this.innerText == "%") {
      num = parseFloat(num)
      num = num/100;
      num = num.toString();
    } 
    else if (this.innerText == "+/-") {
      num = parseFloat(num)
      num = (0 - num);
      num = num.toString();
    }
    else if (this.innerText == ".") {
      num = num.concat(this.innerText);
    }
    else {
      // send error alert
    }
    displayOutput(num)
  }

  // if equal
  // calc output of 2 numbers w/ math action
  if (this.className == "btn-equal"){
    num2 = num;
    num = calculateOutput(num1, num2, mathAction)
  }

  // if clear
  // reset 
  if (this.innerText == "AC") {
    num1 = 0;
    num2 = 0;
    mathAction = ""
    displayOutput("");
  }

  // errors?
  

}

function calculateOutput(num1, num2, mathAction ) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  var outputNum = 0;

  switch(mathAction) {
    case "X":
      outputNum = num1 * num2;
      break;
    case "/":
      if (num2 == 0) { // Prevent dividing by zero
        errorNum = 1;
        break
      }
      outputNum = num1 / num2;
      break;
    case "+":
      outputNum = (num1 + num2);
      break;
    case "-":
      outputNum = num1 - num2;  
      break;
  }

  if (errorCheck()){
    displayOutput(outputNum);
  }

  return outputNum.toString();

}

function errorCheck() {

  var errorCheckPass

    // Check for Errors
    if (errorNum > 0 ){
      switch(errorNum) {
        case 1: 
          document.getElementById("output").style.fontSize = "120%";
          displayOutput("Can't divide by Zero");
          errorCheckPass = false;
      }
      // Reset Error Count
      errorNum = 0;
    } else {
      errorCheckPass = true;
    }

    return errorCheckPass
        
}


// This function sends a string to the output window of the calculator
function displayOutput(outputString){
  document.getElementById("output").innerText = outputString;
  // debugger
}