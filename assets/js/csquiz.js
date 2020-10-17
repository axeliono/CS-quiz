var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start");
var questionEl = document.getElementById("question-item");
var questionCounter = 0
var playerScore = 0;
//question objects

var questionObjectArray = [{
    name: "question insert 1",
    answers: ["A. right","B. wrong","C. wrong","D. wrong"], 
    key: 0

},
{
    name: "question insert 2",
    answers: ["A. wrong","B. right", "C. wrong","D. wrong"],
    key: 1
},
{
    name: "question insert 3",
    answers: ["A. wrong", "B. wrong", "C. right", "D. wrong"],
    key: 2
},
{
    name: "question insert 4",
    answers: ["A. wrong", "B. wrong", "C. wrong", "D. right"],
    key: 3
},
{
    name: "question insert 5",
    answers: ["True","False"],
    key: 0
}]


var startQuiz = function() {
    document.getElementById("start").style.visibility = "hidden";
    
    countdown();
    runQuestions();
}

var countdown = function() {
    var timeRemaining = 75;
    playerScore = 0;
    questionCounter = 0;
    
    var timeInterval = setInterval(function() {

        if(timeRemaining > 0) {
            timerEl.textContent = timeRemaining + " seconds remaining";
            timeRemaining--;
            
        }
        else {
            clearInterval(timeInterval);
            //put function to send info for highscore
        }

        
}, 1000);


    
    
}


 var runQuestions = function() {
     let questionHolder = document.getElementById("question-item");
     let questionShown = document.createElement("div");
     let answerHolder = document.getElementById("answer-choices-shown");
     let answersShown = document.createElement("ul");

     answerHolder.appendChild(answersShown);
     currentQuestion = questionObjectArray[questionCounter];

     //grab question info and place object.name into div element
     currentQName = currentQuestion.name;
     questionShown.innerHTML = "<h3> " + currentQName + "</h3>";
     questionHolder.appendChild(questionShown);

     //add the answer choices from the array of objects
     for(i = 0; i <currentQuestion.answers.length; i++) {
       //create list-item (answer choice)
        let answerChoice = document.createElement("li");
        answerChoice.textContent = currentQuestion.answers[i];

        //add property of being the correct answer
        if(i === currentQuestion.key) {
            answerChoice.setAttribute("correct-answer", "true");
            console.log(answerChoice);
        }
        //create event listener for each answer choice 
        answerChoice.addEventListener("click", nextQuestion);

        //append list item to ul
        answersShown.appendChild(answerChoice);
        
     }


 }

 var nextQuestion = function (event) {
     questionCounter++;
     if(event.target.getAttribute("correct-answer") === "true") {
         playerScore += 5;
     }
     runQuestions();

 }

 var endGame = function() {
     //clear screen
    document.getElementById("question-item").children.clear();
    document.getElementById("answer-choices-shown").children.clear();
 }

startBtn.addEventListener("click", startQuiz);

