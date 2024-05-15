//Wait for the DOM to finish loading before running the game
//Get button elements and add listeners to them

document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons){
        button.addEventListener("click", function(){
            if(this.getAttribute("data-type") === "submit"){
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type")
                runGame(gameType);
            }
        });
    }

    document.getElementById("answer-box").addEventListener('keydown', function(event){
        if(event.key ==="Enter"){
            checkAnswer();
        }
    })

    runGame("addition");
});

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    document.getElementById("answer-box").value="";
    document.getElementById("answer-box").focus();

    //Create two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) +1;
    let num2 = Math.floor(Math.random() * 25) +1;

    if(gameType==="addition"){
        displayAdditionQuestion(num1, num2);
    } else if(gameType==="subtract"){
        displaySubtractQuestion(num1, num2);
    } else if(gameType==="multiply"){
        displayMultiplyQuestion(num1, num2);
    } else if(gameType==="division"){
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`unknown game type: ${gameType}`);
        throw `unknown game type: ${gameType}. Aborting`;
    }
}

/**
 * Checs the answer against the frst element n
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if(isCorrect){
        incrementScore();
        alert("Correct answer!");
    } else {
        incrementWrongAnswer();
        alert(`Incorrect answer. Correct Answer: ${calculatedAnswer[0]}`);
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operand and the operator directly from the DOM
 * returns the correct answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if(operator==="+"){
        return [operand1 + operand2, "addition"];
    } else if(operator==="-"){
        return [operand1 - operand2, "subtract"];
    } else if(operator==="x"){
        return [operand1 * operand2, "multiply"];
    } else if(operator==="/"){
        return [operand1 / operand2, "division"];
    } else{
        alert(`unimplemented operator ${operator}`);
        throw `unimplemented operator ${operator}. Aborting.`;
    }
}

/**
 * Gets current score from DOM and updates by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets current incorrect score from DOM and updates by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {

    operand1 = operand1 * operand2;

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "/";
}