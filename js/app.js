


const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const OptionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const questionLimit = 5;

let questionCounter = 0;
let currentQuestion;
let availableQuestion = [];
let availableOptions = [];
let correctAnswer = 0;
let attempt = 0;

function setAvailableQuestion(){
    const totalQuestion = questionLimit;
    for(let i=0; i<totalQuestion;i++){
        availableQuestion.push(quiz[i])
    }
}
function getNewQuestion(){
    //set question number 
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + questionLimit;
    //set random question
    const questionIndex = availableQuestion[Math.floor(Math.random() * availableQuestion.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //get the position of questionIndex from the avaliablequestion array
    const index1 = availableQuestion.indexOf(questionIndex);
    // does not repeat question
    availableQuestion.splice(index1,1);
    
    const optionLen = currentQuestion.options.length
    //push option into availabeOption Array
    for(let i=0; i<optionLen;i++){
        availableOptions.push(i)
    }
    OptionContainer.innerHTML = '';
    
    let animationDelay = 0.2;

    //create option in inner html
    for(let i=0;i<optionLen;i++){
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optonIndex);
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id= optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        option.className = "option";
        OptionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }
    
   
    questionCounter++
}

function getResult(element){
    const id = parseInt(element.id);
    console.log(typeof id)
    if(id === currentQuestion.answer){
        // get the answer by compairing the id of correct option
        element.classList.add("correct");
        // add the indicator to correct mark
        updateAnswerIndicator("correct");

        correctAnswer++;
    }
    else{
        // set the red color to the incorrect option
        element.classList.add("Wrong");
        updateAnswerIndicator("Wrong");
        const optionLen = OptionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(OptionContainer.children[i].id) === currentQuestion.answer){
                OptionContainer.children[i].classList.add("correct");
            }
        }

    }
    
    attempt++;
unclickableOptions();

}

function unclickableOptions(){
    const optionLen = OptionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        OptionContainer.children[i].classList.add("already-answerd");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = questionLimit;
    for (let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }

}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next(){
    if(questionCounter == questionLimit){
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    // hide quiz box
    quizBox.classList.add("hide");
    // show result box
    resultBox.classList.remove("hide");
    quizResult();
}    
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = questionLimit;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML =  correctAnswer;
    resultBox.querySelector(".total-wrong").innerHTML =   attempt - correctAnswer;
    const percentage =(correctAnswer/questionLimit)*100;
    resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed() +"%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswer + "/"+ questionLimit;
}
function resetQuiz(){
    questionCounter = 0;
    correctAnswer = 0;
    attempt = 0;
    availableQuestion = [];
}

function tryAgainQuiz(){
    // hide the result box
    resultBox.classList.add("hide");
    // show the quizbox
    quizBox.classList.remove("hide");
     resetQuiz();
     startQuiz();

}
 function goToHome(){
     // hide the result box
     resultBox.classList.add("hide");
     // show the home box 
     homeBox.classList.remove("hide");
     resetQuiz();
 }

function startQuiz() {
    // hide home box 
    homeBox.classList.add("hide");
    // show quixbox 
    quizBox.classList.remove("hide");
    //all question in setAvailableQuestion
    setAvailableQuestion();
    //we will call getNewQuestion(); function
    getNewQuestion();
    // to create indicator of answers
    answersIndicator();
}

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = questionLimit;
}